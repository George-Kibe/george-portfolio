// app/sections/About.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Palette, Music, Zap, Award, Users } from "lucide-react";

const skills = [
  { name: "Adobe Premiere Pro", level: 95 },
  { name: "DaVinci Resolve", level: 90 },
  { name: "After Effects", level: 85 },
  { name: "Final Cut Pro", level: 88 },
];

const services = [
  {
    icon: Camera,
    title: "Video Editing",
    description: "Professional cutting, sequencing, and pacing to tell your story effectively.",
  },
  {
    icon: Palette,
    title: "Color Grading",
    description: "Cinematic color correction and grading to set the perfect mood.",
  },
  {
    icon: Music,
    title: "Sound Design",
    description: "Audio mixing, sound effects, and music synchronization.",
  },
  {
    icon: Zap,
    title: "Motion Graphics",
    description: "Dynamic titles, lower thirds, and visual effects.",
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
                About Me
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Passionate About{" "}
                <span className="text-blue-500">Visual Storytelling</span>
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                With over 5 years of experience in video editing, I specialize in transforming raw footage into compelling narratives. My work spans commercial projects, documentaries, music videos, and corporate content.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                I believe every frame matters. My approach combines technical precision with creative intuition, ensuring each project not only meets but exceeds expectations.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Services Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section */}
        <div className="mt-24 pt-16 border-t border-blue-500/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, label: "Best Editor 2023", event: "Film Festival" },
              { icon: Users, label: "Top Rated", event: "Freelance Platform" },
              { icon: Zap, label: "Rising Talent", event: "Creative Awards" },
              { icon: Camera, label: "Excellence", event: "Video Awards" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/5 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/40 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">{item.label}</h4>
                <p className="text-gray-500 text-sm">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}