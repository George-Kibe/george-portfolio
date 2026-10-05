"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Clock, Calendar, X, Film } from "lucide-react";
import CloudImage from "./CloudImage";
import { embedUrl, youtubeThumbnail } from "@/lib/video";

// Cards for video projects. Clicking one with a YouTube/Vimeo link plays it in
// a native <dialog> (focus trap, Escape to close, inert background for free);
// the iframe only exists while the dialog is open, so nothing loads up front.

function Thumbnail({ project, priority }) {
  const src = project.thumbnail || youtubeThumbnail(project.videoUrl);
  if (!src) {
    return (
      <div className="flex size-full items-center justify-center bg-linear-to-br from-blue-600/30 to-blue-900/40">
        <Film className="size-12 text-white/70" aria-hidden="true" />
      </div>
    );
  }
  return (
    <CloudImage
      src={src}
      alt=""
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="transition-transform duration-300 group-hover:scale-105"
    />
  );
}

export default function ProjectGrid({ projects, priorityFirst = false }) {
  const dialogRef = useRef(null);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (playing && !dialog.open) dialog.showModal();
    if (!playing && dialog.open) dialog.close();
  }, [playing]);

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((project, index) => {
          const playable = Boolean(embedUrl(project.videoUrl));
          const meta = [project.client, project.category].filter(Boolean).join(" · ");
          return (
            <li
              key={project._id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-200 hover:border-accent-text/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Thumbnail project={project} priority={priorityFirst && index === 0} />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                {playable && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-accent/90 text-white shadow-2xl shadow-blue-500/40 transition-transform duration-300 group-hover:scale-110"
                  >
                    <Play className="ml-1 size-6 fill-white" />
                  </span>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {playable ? (
                    <button
                      type="button"
                      onClick={() => setPlaying(project)}
                      className="text-left after:absolute after:inset-0 hover:text-accent-text focus-visible:outline-none cursor-pointer"
                    >
                      {project.title}
                      <span className="sr-only"> (play video)</span>
                    </button>
                  ) : (
                    project.title
                  )}
                </h3>
                {meta && <p className="mt-1 text-sm font-medium text-accent-text">{meta}</p>}
                {project.description && <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted">{project.description}</p>}
                {(project.duration || project.year) && (
                  <div className="mt-auto flex items-center gap-4 pt-4 text-sm text-muted">
                    {project.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" aria-hidden="true" />
                        {project.duration}
                      </span>
                    )}
                    {project.year && (
                      <span className="flex items-center gap-1">
                        <Calendar className="size-4" aria-hidden="true" />
                        {project.year}
                      </span>
                    )}
                  </div>
                )}
              </div>
              {/* Keyboard focus ring for the whole card (the title button covers it). */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-accent-text group-has-[button:focus-visible]:ring-2" />
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={playing ? `${playing.title} video` : "Video"}
        onClose={() => setPlaying(null)}
        onClick={(e) => e.target === dialogRef.current && setPlaying(null)}
        className="m-auto w-[min(92vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {playing && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setPlaying(null)}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
            <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                src={embedUrl(playing.videoUrl)}
                title={playing.title}
                className="size-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="mt-3 text-center font-semibold text-white">{playing.title}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
