// Client-side abuse protection for the contact form.
//
// The EmailJS public key, service id and template id are necessarily shipped to
// the browser, so anyone can read them and post directly to EmailJS. Nothing
// here can stop a determined attacker — only EmailJS's own domain allowlist and
// quota can. What this does stop is the common case: bots walking the form, and
// humans double-submitting or hammering the button, both of which burn the
// account's monthly send quota.
//
// State lives in localStorage so it survives a reload. If storage is
// unavailable the guard fails open: a broken guard must not block a real
// visitor from making contact.

export const MIN_INTERVAL_MS = 30_000; // one message per 30s
export const MAX_PER_WINDOW = 5;
export const WINDOW_MS = 60 * 60 * 1000; // per hour

const readHistory = (key) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
};

const writeHistory = (key, history) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(history));
  } catch {
    // Storage blocked; the guard degrades to allowing submissions.
  }
};

export const createSubmissionGuard = (formId) => {
  const key = `submission-guard:${formId}`;

  const recent = () => {
    const now = Date.now();
    return readHistory(key).filter((at) => now - at < WINDOW_MS);
  };

  return {
    check() {
      const now = Date.now();
      const history = recent();
      const last = history[history.length - 1];

      if (last !== undefined && now - last < MIN_INTERVAL_MS) {
        return {
          allowed: false,
          reason: "too-fast",
          retryInSeconds: Math.ceil((MIN_INTERVAL_MS - (now - last)) / 1000),
        };
      }
      if (history.length >= MAX_PER_WINDOW) {
        return { allowed: false, reason: "rate-limited" };
      }
      return { allowed: true };
    },

    record() {
      writeHistory(key, [...recent(), Date.now()]);
    },

    // Hidden field that real users never see and never fill in.
    isBot(fields) {
      return Boolean(fields?.website);
    },
  };
};
