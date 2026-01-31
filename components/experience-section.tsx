"use client";

import { Briefcase, MapPin, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";

type ExperienceType = "full-time" | "part-time" | "internship" | "freelance" | "volunteer";

interface Experience {
  id: string;
  role: string;
  company: string;
  url?: string;
  location: string;
  period: string;
  type: ExperienceType;
  description: string;
  achievements: string[];
  competencies: string[];
}

/**
 * YOUR EXPERIENCES - Edit this array with your work history!
 * Most recent experience should be first.
 */
const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "RPA Developer - Contract Staff",
    company: "Housing & Development Board (HDB)",
    url: "#",
    location: "Toa Payoh, SG",
    period: "Feb 2022 - Apr 2022",
    type: "full-time",
    description:
      "Supported the Parking department in various technical projects and tasks, gaining exposure to IT operations in a corporate setting using Kryon Studios.",
    achievements: [
      "Transforming manual administrative workflows into efficient background processes and reducing task completion time by approximately 75%",
      "Tenure extended to Contract Staff due to high-impact project delivery",
    ],
    competencies: ["Kryon Studio", "RPA", "Creative Thinking", "Teamwork Communication"],
  },
  {
    id: "exp-2",
    role: "RPA Developer",
    company: "Housing & Development Board (HDB)",
    url: "/src/experience/hdb_testimonial.pdf",
    location: "Toa Payoh, SG",
    period: "Jul 2021 - Jan 2022",
    type: "internship",
    description:
      "Engineered an end-to-end automation bot to process Goods Receipts (GRs) and built a reconciliation bot to cross-reference Singapore-wide parking data, slashing the manual verification process from hours to minutes while eliminating human error.",
    achievements: [
      "Integrating Outlook for automated communication and saving the department an estimated 10+ man-hours weekly",
      "Awarded Distinction for the Student Internship Programme",
      "Receieved an 'A' for Major Project in TP",
    ],
    competencies: ["Kryon Studio", "RPA", "Creative Thinking", "Teamwork Communication"],
  },
];

function getTypeBadgeColor(type: ExperienceType): string {
  switch (type) {
    case "internship":
      return "bg-primary/20 text-primary";
    case "full-time":
      return "bg-syntax-string/20 text-syntax-string";
    case "part-time":
      return "bg-syntax-keyword/20 text-syntax-keyword";
    case "freelance":
      return "bg-green-500/20 text-green-400";
    case "volunteer":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function ExperienceSection() {
  return (
    <section className="min-h-[calc(100vh-10rem)] px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-border flex-1 max-w-16" />
            <span className="text-syntax-comment font-mono text-xs sm:text-sm">{"// 03"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            <span className="text-syntax-keyword">{"git"}</span>{" "}
            <span className="text-syntax-function">log</span>
            <span className="text-muted-foreground">{" --oneline experience"}</span>
          </h2>
          <p className="text-muted-foreground mt-2 font-mono text-xs sm:text-sm">
            <span className="text-syntax-comment">{"// "}</span>
            My professional journey so far
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative pl-0 sm:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 sm:left-8 top-6 w-4 h-4 -translate-x-1/2 rounded-full bg-card border-2 border-primary hidden sm:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Commit Hash (like git) */}
                <div className="hidden sm:block absolute left-0 top-5 font-mono text-xs text-muted-foreground -translate-x-full pr-6">
                  {`#${String(index + 1).padStart(3, "0")}`}
                </div>

                {/* Experience Card */}
                <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
                  {/* Card Header */}
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/50 border-b border-border">
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
                    </div>
                    <span className="ml-2 sm:ml-4 text-muted-foreground text-xs sm:text-sm font-mono truncate">
                      {exp.company.toLowerCase().replace(/\s+/g, "-")}.tsx
                    </span>
                    <span className={`ml-auto px-2 py-0.5 rounded text-xs font-mono ${getTypeBadgeColor(exp.type)}`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6">
                    {/* Role and Company */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          <span className="text-syntax-function">{exp.role}</span>
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {exp.url && exp.url !== "#" ? (
                            <Link
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono text-sm flex items-center gap-1"
                            >
                              {exp.company}
                              <ExternalLink size={12} />
                            </Link>
                          ) : (
                            <span className="text-primary font-mono text-sm">{exp.company}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm sm:text-base mb-4">
                      <span className="text-syntax-comment">{"// "}</span>
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-xs sm:text-sm font-mono text-muted-foreground mb-2">
                        <span className="text-syntax-keyword">const</span>{" "}
                        <span className="text-syntax-variable">achievements</span>
                        <span> = [</span>
                      </h4>
                      <ul className="space-y-1.5 pl-4">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-foreground font-mono">
                            <span className="text-syntax-string">{`"${achievement}"`}</span>
                            {i < exp.achievements.length - 1 && (
                              <span className="text-muted-foreground">,</span>
                            )}
                          </li>
                        ))}
                      </ul>
                      <span className="text-muted-foreground font-mono text-xs sm:text-sm">];</span>
                    </div>

                    {/* Competencies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.competencies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* End of Timeline */}
          <div className="relative pl-0 sm:pl-20 mt-8">
            <div className="absolute left-0 sm:left-8 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-border hidden sm:block" />
            <p className="text-muted-foreground font-mono text-xs sm:text-sm">
              <span className="text-syntax-comment">{"// "}</span>
              More experiences coming soon...
            </p>
          </div>
        </div>

        {/* Section Closing */}
        <div className="mt-8 sm:mt-12 text-muted-foreground font-mono">
          <span>{"// End of experience log"}</span>
        </div>
      </div>
    </section>
  );
}