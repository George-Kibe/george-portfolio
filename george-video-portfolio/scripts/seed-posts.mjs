// Starter blog posts, in Markdown (converted to HTML by seed.mjs). Written as
// drafts of George's own approach; edit or replace them from /admin/blog.

export const POSTS = [
  {
    title: 'My Video Editing Workflow, From Raw Footage to Final Export',
    slug: 'my-video-editing-workflow',
    tags: ['Workflow', 'Editing'],
    publishedAt: '2026-09-24',
    excerpt: 'Six stages, in the same order every time. Here is how a project moves from a drive full of clips to a finished video.',
    content: `A good edit is mostly a good process. These are the six stages every project goes through, whether it is a 30-second reel or a 30-minute documentary.

## 1. Brief

Before touching the footage I want to know who the video is for, where it will be posted and what it should make people do. Two or three reference videos are worth more than a page of adjectives.

## 2. Organise

I back up the footage, then ingest, label and sync it. Multicam angles get lined up, audio is matched to picture and the best takes go into a selects bin. This hour of housekeeping saves days later.

## 3. Rough cut

The rough cut is about story, not polish: structure, pacing and the moments that carry the message. Feedback at this stage is cheap, so this is the time to move whole sections around.

## 4. Fine cut

Once the structure is agreed, I tighten every cut, add B-roll, titles and motion graphics, and work through notes until the picture is locked.

## 5. Colour and sound

With picture locked, I correct and grade the colour, then clean up, mix and layer the audio. This is the stage that makes a video feel finished rather than just edited.

## 6. Deliver

Finally, exports for every place the video will live, with the right aspect ratios, captions and thumbnails.

The order matters. Grading a scene that later gets cut, or mixing audio before the timing is final, is wasted work. Each stage rests on the one before it.`,
  },
  {
    title: 'Colour Grading Basics: Correct First, Then Grade',
    slug: 'colour-grading-basics',
    tags: ['Colour grading', 'DaVinci Resolve'],
    publishedAt: '2026-09-10',
    excerpt: 'Correction makes footage accurate; grading gives it a mood. Mixing the two up is the most common reason a grade looks off.',
    content: `Colour work happens in two passes, and keeping them separate is what makes a grade hold together.

## Correction: make it accurate

Correction is about getting each shot to a neutral, consistent starting point:

- **Exposure**, so highlights aren't clipped and shadows still hold detail
- **White balance**, so whites look white under every light source
- **Matching**, so two angles of the same scene look like they were filmed at the same moment

In DaVinci Resolve I watch the scopes rather than trusting my eyes alone. A waveform and a vectorscope don't get tired after eight hours.

## Grading: give it a feeling

Once every shot is neutral and matched, the creative grade goes on top. Warm and golden for a wedding, cool and contrasty for a tech commercial, muted for a serious documentary. Because the shots are already consistent, one look can be applied across a whole scene.

## Protect skin tones

Whatever the look, faces should still look like people. Resolve's vectorscope has a skin-tone line; keeping skin close to it keeps a stylised grade believable.

## Check on more than one screen

Most viewers will watch on a phone. I review the final grade on a calibrated monitor and on a phone before export, because a grade that looks moody on a big screen can look murky in a feed.`,
  },
  {
    title: 'Editing Reels That Hold Attention Past the First Three Seconds',
    slug: 'editing-reels-that-hold-attention',
    tags: ['Social media', 'Reels'],
    publishedAt: '2026-08-27',
    excerpt: 'On Reels, TikTok and Shorts, the first few seconds decide whether anyone sees the rest. A few editing habits make the difference.',
    content: `Short-form video is judged in a moment. These are the habits I use to keep people watching.

## Open on the payoff

Start with the most interesting moment, not the introduction. A finished result, a surprising line or a strong visual beats "Hi everyone, today we're going to…".

## Cut on movement and sound

Every cut is a chance to lose someone. Cutting on a motion or on a beat of the music hides the cut and keeps energy up.

## Captions are not optional

Most people scroll with the sound off. Bold, well-timed captions that sit inside the safe area keep the message landing without audio.

## Design for vertical

Frame for 9:16 from the start. Text and faces should sit away from the edges, where the platform's buttons and captions cover the picture.

## Keep it as short as the idea

If a reel can say its thing in 15 seconds, it shouldn't take 40. Trimming dead air between sentences alone often cuts a third of the runtime.

## End with a reason to act

Finish on a clear next step: follow, comment, visit the link. Better still, make the last second flow back into the first so the loop feels natural.`,
  },
  {
    title: 'Sound Design: The Half of Video Nobody Notices Until It Is Wrong',
    slug: 'sound-design-matters',
    tags: ['Sound design', 'Audio'],
    publishedAt: '2026-08-13',
    excerpt: 'Viewers forgive soft footage; they click away from bad audio. Here is how I make sound carry a video.',
    content: `People will watch slightly soft footage. They will not sit through hiss, echo or a voice they can't make out. Sound is half of the experience, even when nobody notices it.

## Clean dialogue first

Dialogue is the backbone. I remove background noise, reduce room echo, even out levels between speakers and make sure every word is intelligible on phone speakers, not just studio monitors.

## Music that follows the edit

Music should support the story's rhythm rather than fight it. I cut to the beat where it helps, fade music down under speech and let it swell where the picture has room to breathe.

## Layers you feel more than hear

Room tone, ambience and small effects such as a door, footsteps or a whoosh on a title make a scene feel real. Remove them and the video suddenly feels empty, even if nobody could say why.

## Mix for where it will play

A cinema mix and a phone mix are different things. For social media I keep dialogue forward and the overall level consistent with what people are used to on the platform, so nobody has to reach for the volume.

## Use licensed music

Unlicensed tracks get videos muted or taken down. I source music and effects from licensed libraries, so the finished video can be posted anywhere without surprises.`,
  },
  {
    title: 'Motion Graphics That Serve the Story',
    slug: 'motion-graphics-that-serve-the-story',
    tags: ['Motion graphics', 'After Effects'],
    publishedAt: '2026-07-30',
    excerpt: 'Titles, lower thirds and animated text should make a video clearer, not busier. A few rules keep them in their place.',
    content: `Motion graphics can make a video look expensive, or make it look like a template. The difference is whether they serve the story.

## Every graphic needs a job

A lower third tells you who is speaking. A number on screen makes a statistic stick. A map shows where we are. If a graphic doesn't have a job like that, it is decoration, and decoration competes with the message.

## Match the brand

Fonts, colours and the style of animation should match the brand's identity. A consistent set of titles and lower thirds also makes a series of videos feel like one channel rather than a collection.

## Move with purpose

Animations should be quick and confident. Most text needs a fraction of a second to arrive and should then stay still long enough to read comfortably, roughly the time it takes to read it twice.

## Respect the safe areas

On social platforms, interface elements cover the edges of the frame. Keeping text inside the safe areas means nothing important ends up under a like button.

## Build once, reuse

In After Effects I build reusable templates for recurring elements such as titles, lower thirds and end cards. Clients get consistency, and later videos in a series get faster to deliver.`,
  },
  {
    title: 'How to Brief a Video Editor (and Get the Edit You Imagined)',
    slug: 'how-to-brief-a-video-editor',
    tags: ['Working together', 'Briefing'],
    publishedAt: '2026-07-16',
    excerpt: 'Most revision rounds trace back to an unclear brief. Five things to share before the edit starts.',
    content: `The best way to get the edit you have in your head is to share the right things up front. Most revision rounds trace back to an unclear brief, not a bad editor.

## 1. The goal

What should viewers do or feel afterwards? Buy, sign up, share, remember a name? One clear goal shapes every cut.

## 2. The audience and the platform

A YouTube video for existing customers and a 20-second ad for strangers are edited completely differently. Tell your editor where it will be posted and who will watch it.

## 3. References

Two or three videos you like, with a note on what you like about each (the pacing, the colour, the titles), are the fastest way to align on style.

## 4. The must-haves

Logos, specific shots, product claims, legal lines, a call to action, brand fonts and colours. Listing them avoids the "we forgot to include…" round.

## 5. Practicalities

The deadline, the lengths and formats you need, how many revision rounds you expect, and who gives final approval. One decision-maker keeps feedback consistent.

## Organise the footage if you can

Clear folder names and a short note on which takes are best save time, and time saved is money saved.

With those in hand, the first cut is much closer to the final one.`,
  },
]
