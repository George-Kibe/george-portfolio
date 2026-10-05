import { Clapperboard, Palette, Sparkles, AudioLines, MonitorPlay } from "lucide-react";

// Grouped from the software and services the site already lists. Add a tool
// here only if it's something actually used.
const TOOLBOX = [
  { name: "Editing", icon: Clapperboard, tools: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "Multicam editing"] },
  { name: "Colour", icon: Palette, tools: ["DaVinci Resolve", "Colour correction", "Cinematic grading"] },
  { name: "Motion graphics", icon: Sparkles, tools: ["After Effects", "Titles & lower thirds", "Visual effects"] },
  { name: "Sound", icon: AudioLines, tools: ["Audio mixing", "Sound effects", "Music synchronisation"] },
  { name: "Delivery", icon: MonitorPlay, tools: ["YouTube", "Reels, TikTok & Shorts", "Captions & subtitles", "Web & event screens"] },
];

export default function Toolbox() {
  return (
    <section aria-labelledby="toolbox-heading" className="mt-24 md:mt-32">
      <h2 id="toolbox-heading" className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
        My <span className="text-accent-text">Toolbox</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted text-lg leading-relaxed">
        What I reach for at each stage, from the first assembly to the file you post.
      </p>
      <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
        {TOOLBOX.map(({ name, icon: Icon, tools }) => (
          <li key={name} className="flex gap-4 border-t border-line py-6">
            <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-text">
              <Icon className="size-6" />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-tight text-foreground">{name}</h3>
              <ul aria-label={name} className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li key={tool} className="rounded-full bg-foreground/5 px-3 py-1 text-sm font-medium text-foreground/85">{tool}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
