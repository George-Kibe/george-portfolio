// app/sections/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import { Play, ArrowDown, Film, Scissors, Sparkles } from "lucide-react";

export default function Hero() {
  const videoRef = useRef(null);
  // const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate video background with gradient animation
    const interval = setInterval(() => {
      // Animation logic handled by CSS
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>Professional Video Editor</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-white mb-2">Crafting</span>
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Visual Stories
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed">
            Transforming raw footage into cinematic masterpieces. Specializing in commercial, narrative, and creative video editing that captivates audiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="projects"
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-5 h-5 fill-white" />
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-blue-500/30 hover:border-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:bg-blue-500/10"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-3xl mx-auto">
            {[
              { value: "50+", label: "Projects Completed" },
              { value: "5+", label: "Years Experience" },
              { value: "30+", label: "Happy Clients" },
              { value: "15+", label: "Awards Won" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-gray-500 hover:text-blue-400 transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-1/4 left-10 hidden lg:block animate-float">
        <Film className="w-12 h-12 text-blue-500/20" />
      </div>
      <div className="absolute bottom-1/4 right-10 hidden lg:block animate-float delay-1000">
        <Scissors className="w-12 h-12 text-blue-500/20" />
      </div>
    </section>
  );
}