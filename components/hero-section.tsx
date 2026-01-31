"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

// CODE LINES - Aesthetic
const codeLines = [
  { type: "comment", content: "// Welcome to my portfolio" },
  { type: "blank", content: "" },
  { type: "keyword", content: "class", rest: " Developer {" },
  { type: "property", content: "name", value: '"Yeo Yu Song, Sean | 楊淯淞"' },
  { type: "property", content: "role", value: '"Aspiring Year 2 IT Undergraduate"' },
  { type: "property", content: "university", value: '"Singapore Management University (SMU)"' },
  { type: "property", content: "degree", value: '"BSc (Information Systems)"' },
  { type: "property", content: "track", value: '"Product Developement"' },
  { type: "property", content: "location", value: '"Singapore, SG"' },
  { type: "blank", content: "" },
  { type: "method", content: "passions", items: '["coding", "problem-solving", "learning", "adaptable"]' },
  { type: "method", content: "spokenLanguages", items: '["English (Native)", "Chinese (Native)", "Hokkien (Fluent)"]' },
  // ------------------------------------
  { type: "closing", content: "}" },
];

type HeroSectionProps = {
  onNavigate?: (tab: "home" | "about" | "skills" | "experience" | "projects" | "contact") => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typing animation effect
  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(lineTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(lineTimer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <section className="min-h-[calc(100vh-10rem)] flex flex-col justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* ===== LEFT SIDE - ANIMATED CODE EDITOR ===== */}
          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-xl order-2 lg:order-1">
            {/* Editor Header (macOS style) */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              </div>
              <span className="ml-2 sm:ml-4 text-muted-foreground text-xs sm:text-sm font-mono">developer.ts</span>
            </div>
            
            {/* Editor Content - The animated code */}
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-300 ${
                    index < visibleLines ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {line.type === "comment" && (
                    <span className="text-syntax-comment">{line.content}</span>
                  )}
                  {line.type === "blank" && <span>&nbsp;</span>}
                  {line.type === "keyword" && (
                    <>
                      <span className="text-syntax-keyword">{line.content}</span>
                      <span className="text-syntax-function">{line.rest}</span>
                    </>
                  )}
                  {line.type === "property" && (
                    <>
                      <span className="text-syntax-variable">{line.content}</span>
                      <span className="text-muted-foreground">{" = "}</span>
                      <span className="text-syntax-string">{line.value}</span>
                      <span className="text-muted-foreground">;</span>
                    </>
                  )}
                  {line.type === "method" && (
                    <>
                      <span className="text-syntax-function">{line.content}</span>
                      <span className="text-muted-foreground">{" = "}</span>
                      <span className="text-syntax-string">{line.items}</span>
                      <span className="text-muted-foreground">;</span>
                    </>
                  )}
                  {line.type === "closing" && (
                    <span className="text-syntax-function">{line.content}</span>
                  )}
                </div>
              ))}
              {/* Blinking cursor */}
              <span
                className={`inline-block w-2 h-4 sm:h-5 bg-primary ml-1 ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* ===== RIGHT SIDE - INTRODUCTION ===== */}
          <div className="space-y-5 sm:space-y-6 order-1 lg:order-2">
            <div>
              <p className="text-syntax-comment font-mono mb-2 text-sm">{"// Hello, World!"}</p>
              
              {/* EDIT THIS: Your main headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
                This is my personal {" "}
                <span className="text-primary">portfolio</span>
              </h1>
              
              {/* Introduction Paragraph */}
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                An aspiring IT undergraduate passionate about bridging the gap between complex 
                technical solutions and real-world business needs. Currently exploring web development, 
                algorithms somewhere, somehow, all at once 🐏.
              </p>
            </div>

            {/* Terminal-style CTA button */}
            <div className="bg-card rounded-lg border border-border p-3 sm:p-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <span className="text-primary">~</span>
                <span>portfolio</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.("projects")}
                className="flex items-center gap-2 text-left hover:text-primary transition-colors group"
              >
                <span className="text-primary">$</span>
                <span className="text-syntax-function">npm run</span>
                <span className="text-syntax-string">explore-projects</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <Link
                href="https://github.com/yeoyusongsean"  // GitHub URL
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
                <span className="font-mono text-xs sm:text-sm">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/yeo-yu-song-sean/"  // LinkedIn URL
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
                <span className="font-mono text-xs sm:text-sm">LinkedIn</span>
              </Link>
              <Link
                href="mailto:yeoyusongsean2002@gmail.com"  // Email Address
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
                <span className="font-mono text-xs sm:text-sm">Email</span>
              </Link>
            </div>

            {/* Quick Navigation */}
            <div className="flex flex-wrap gap-2 pt-2 sm:pt-4">
              {["about", "skills", "experience", "projects", "contact"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onNavigate?.(tab as "about" | "skills" | "experience" | "projects" | "contact")}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors font-mono text-xs sm:text-sm"
                >
                  <span className="text-syntax-comment">{"// "}</span>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
