// EmailJS settings shared by the contact form and the quote builder.
//
// These are public by design (EmailJS runs in the browser), but they belong in
// the environment so a key can be rotated without a code change. Set
// NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY per environment; the fallbacks are the values
// that used to be hardcoded in ContactForm, kept here (and only here) so the
// forms keep working until the variables are set.
export const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_zejea4b",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_d1kc1do",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "qO3BsJQp9qAyPG6LX",
};
