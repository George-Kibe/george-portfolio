// app/sections/Projects.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Play, ExternalLink, Clock, Calendar } from "lucide-react";

const categories = ["All", "Commercial", "Music Video", "Documentary", "Corporate"];

const projects = [
  {
    id: 1,
    title: "Neon Dreams",
    category: "Music Video",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    duration: "3:45",
    year: "2024",
    description: "A vibrant music video featuring dynamic editing and color grading.",
  },
  {
    id: 2,
    title: "Tech Forward",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop",
    duration: "1:30",
    year: "2024",
    description: "High-energy commercial for a leading tech brand launch.",
  },
  {
    id: 3,
    title: "Urban Stories",
    category: "Documentary",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
    duration: "15:00",
    year: "2023",
    description: "Documentary exploring urban culture and community narratives.",
  },
  {
    id: 4,
    title: "Brand Evolution",
    category: "Corporate",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    duration: "2:00",
    year: "2023",
    description: "Corporate brand story highlighting company transformation.",
  },
  {
    id: 5,
    title: "Midnight Jazz",
    category: "Music Video",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
    duration: "4:20",
    year: "2023",
    description: "Atmospheric jazz performance with moody cinematography.",
  },
  {
    id: 6,
    title: "Product Launch",
    category: "Commercial",
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
    duration: "0:45",
    year: "2024",
    description: "Fast-paced product reveal with motion graphics.",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
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

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
            Portfolio
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Featured <span className="text-blue-500">Projects</span>
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of my recent work across various genres and styles.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-blue-500/5 text-gray-400 hover:bg-blue-500/10 hover:text-white border border-blue-500/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <button className="w-16 h-16 rounded-full bg-blue-600/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-500 transition-colors shadow-2xl shadow-blue-500/50">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-medium text-white">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 border border-blue-500/30 hover:border-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:bg-blue-500/10 inline-flex items-center gap-2 group">
            View All Projects
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}