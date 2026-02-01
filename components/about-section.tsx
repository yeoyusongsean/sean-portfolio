"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Terminal, BookOpen, Code2, Lightbulb, HeartHandshake, DrumIcon, Cpu, Trophy } from "lucide-react";

/** 
 * AUTO ROTATION SPEED
 * Change this value to adjust how fast photos rotate (in milliseconds)
 */
const AUTO_ROTATE_INTERVAL = 3000;

/**
 * PROFILE IMAGES - Add your photos here!
 * Place your images in the /public folder, then add paths here.
 * Example: If you put photo.jpg in /public/images/, use "/images/photo.jpg"
 * 
 * Tips:
 * - Use square images (e.g., 400x400) for best results
 * - Compress images for faster loading (use tinypng.com)
 * - Add alt text for accessibility
 */
const profileImages = [
  {
    src: "/src/profilepic/main_pic.jpg?height=400&width=400",
    alt: "Professional Pic",
  },
  {
    src: "/src/profilepic/cute_pic.jpg?height=400&width=400",
    alt: "Felt cute, might delete later..",
  },
  {
    src: "/src/profilepic/temp_pic.jpg?height=400&width=400",
    alt: "Placeholder Picture",
  },
  {
    src: "/src/profilepic/glamshot.jpg?height=400&width=400",
    alt: "Glamour",
  },
];


// Quick Stats
const stats = [
  { value: "~4", label: "Projects", color: "text-primary" },
  { value: "5+", label: "Languages", color: "text-syntax-string" },
  { value: "80%", label: "Happiness", color: "text-syntax-keyword" },
];

// Highlights
const highlights = [
  {
    icon: HeartHandshake,
    title: "Volunterring Experience",
    items: ["SMU Ember - Project EngAGEment", "TP Global Connect Student Group (GCSG)"],
  },
  {
    icon: Cpu,
    title: "Competitions",
    items: ["AfterClass UI Hackathon 2025"],
  },
  {
    icon: Trophy,
    title: "Awards",
    items: ["Tan Joo Kee Study Award 2024", "Tan Agnes Jiannee Scholarship 2020-2021"],
  },
  {
    icon: DrumIcon,
    title: "CCAs & Activities",
    items: ["SMU Ember 🔥", "SMU Business Intelligence & Analytics (BIA) 👾", "SMU Samba Masala 🥁"],
  },
];

function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    if (profileImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profileImages.length);
    }, AUTO_ROTATE_INTERVAL);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Image Container with IDE-style frame */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-syntax-string/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          </div>
          <span className="text-muted-foreground font-mono text-xs ml-2">profile.png</span>
        </div>

        {/* Image Display */}
        <div className="relative aspect-square bg-secondary/30">
          {profileImages.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Dot Indicators - visual only, shows progress */}
        {profileImages.length > 1 && (
          <div className="flex justify-center gap-2 py-3 bg-secondary/30 border-t border-border">
            {profileImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 w-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="min-h-[calc(100vh-10rem)] px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-border flex-1 max-w-16" />
            <span className="text-syntax-comment font-mono text-xs sm:text-sm">{"// 01"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            <span className="text-syntax-keyword">{"function"}</span>{" "}
            <span className="text-syntax-function">aboutMe</span>
            <span className="text-muted-foreground">{"() {"}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column: Photo + Stats */}
          <div className="space-y-4 sm:space-y-6">
            {/* Photo Carousel */}
            <PhotoCarousel />

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card rounded-lg border border-border p-3 sm:p-4 text-center">
                  <div className={`text-xl sm:text-2xl font-bold font-mono ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio List + Highlights */}
          <div className="space-y-4 sm:space-y-6">
            {/* Bio List - Terminal Style */}
            <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
              {/* Terminal Header with Path */}
              <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs sm:text-sm">
                <span className="text-syntax-function">C:\Users\sean\background&gt;</span>
                <span className="text-muted-foreground">ls -l</span>
              </div>
              
              {/* Bio */}
              <div className="font-mono text-xs sm:text-sm space-y-2">
                <p>
                  <span className="text-syntax-keyword">{">"}</span>{" "}
                  {"My foundation in technology was built at Temasek Polytechnic,"}
                  {" where I studied in Financial Business Informatics which specializes both Programming and FinTech."}
                </p>
                <p>
                  <span className="text-syntax-keyword">{">"}</span>{" "}
                  {"Currently, I am leveraging that background to tackle more advanced challenges "}
                  {" in software development and digital transformation at SMU."}
                </p>
                <p>
                  <span className="text-syntax-keyword">{">"}</span>{" "}
                  {"When I'm not coding, you'll find me socializing with my closest friends, "}
                  {"gaming, and/or experimenting a bit of coding.. heehee~"}
                </p>
              </div>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-card rounded-lg border border-border p-4 sm:p-5 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-syntax-comment font-mono text-xs">{`0${index + 1}`}</span>
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-mono text-xs sm:text-sm">
                    {item.title}
                  </h3>
                  {/* List of items with pointer style */}
                  <ul className="space-y-1">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-primary shrink-0">{">"}</span>
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Closing */}
        <div className="mt-8 sm:mt-12 text-muted-foreground font-mono">
          <span>{"}"}</span>
        </div>
      </div>
    </section>
  );
}
