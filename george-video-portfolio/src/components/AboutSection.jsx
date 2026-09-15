// app/sections/About.tsx

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

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-blue-950/5 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
                About Me</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Passionate About{" "}
                <span className="text-blue-500">Visual Storytelling</span>
              </h1>
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
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full origin-left bg-linear-to-r from-blue-500 to-blue-600 rounded-full animate-grow-x"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${index * 60 + 150}ms`,
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
                className="group p-6 rounded-2xl bg-linear-to-br from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 transition-all duration-200 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
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
                {/* An award badge is not a section heading — it was competing
                    with the service headings for the same level. */}
                <p className="text-white font-semibold mb-1">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}