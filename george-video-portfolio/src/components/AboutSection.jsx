import { Camera, Palette, Music, Zap } from "lucide-react";
import Process from "./Process";
import Toolbox from "./Toolbox";
import ProjectCta from "./ProjectCta";
import { SERVICES } from "@/lib/site";

const ICONS = { "Video Editing": Camera, "Color Grading": Palette, "Sound Design": Music, "Motion Graphics": Zap };

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-background pt-32 pb-20 md:pb-28">
      <div className="absolute inset-0 bg-linear-to-b from-background via-glow to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Passionate About <span className="text-accent-text">Visual Storytelling</span>
            </h1>
            <div className="mt-6 flex max-w-prose flex-col gap-4 text-lg leading-relaxed text-muted">
              <p>
                With over 5 years of experience in video editing, I specialise in turning raw footage into compelling
                narratives. My work spans commercials, documentaries, music videos and corporate content.
              </p>
              <p>
                I believe every frame matters. My approach combines technical precision with creative intuition, so
                each project tells its story clearly and looks and sounds finished on whatever screen it plays.
              </p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, index) => {
              const Icon = ICONS[service.name] ?? Camera;
              return (
                <li
                  key={service.name}
                  className="group rounded-2xl border border-line bg-card p-6 transition-colors duration-200 hover:border-accent-text/50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="size-6 text-accent-text" aria-hidden="true" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-foreground">{service.name}</h2>
                  <p className="text-base leading-relaxed text-muted">{service.description}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <Process />
        <Toolbox />
        <ProjectCta className="mt-24 md:mt-32" />
      </div>
    </section>
  );
}
