Use the apple-design skill for this task.

Audit this site against Apple's design principles. Do NOT change any code yet.

Go through it in this order and give me a numbered list of findings:

1. TYPE SCALE. What sizes am I actually using? Flag anything that
   isn't on a consistent scale. Tell me the exact px values I have
   and the exact px values you'd replace them with.
2. SPACING. Is there a base unit (4px or 8px)? List every value that
   breaks it and where.
3. HIERARCHY. On each screen, what is the single thing the eye should
   land on first? Tell me whether it actually wins, and why not.
4. CONTRAST. Give me the measured ratio for every text-on-background
   pair. Flag anything under 4.5:1 for body and 3:1 for large text.
5. MOTION. List every transition and its duration and easing. Flag
   anything over 300ms or using a linear curve.
6. DENSITY. Where am I cramming, and where am I wasting space?

For every finding give me: the file and line, what's wrong in one
sentence, and the exact replacement value. Rank the whole list by how
much each fix changes how expensive the site feels.
Do not touch anything I didn't ask about
Keep my existing colors and brand. Apply the structural rules only: scale, spacing, hierarchy, contrast, motion.