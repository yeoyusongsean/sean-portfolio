"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";

interface ListItem {
  name: string;
  description?: string;
  status?: "completed" | "in-progress" | "planned";
}

interface TagsCategory {
  name: string;
  displayType: "tags";
  skills: string[];  // Simple array of skill names
}

interface ListCategory {
  name: string;
  displayType: "list";
  items: ListItem[];
}

type SkillCategory = TagsCategory | ListCategory ;

const skillCategories: SkillCategory[] = [
  // ===== LANGUAGES =====
  {
    name: "languages",
    displayType: "tags",
    skills: [
      "JavaScript",
      "PHP",
      "Python",
      "HTML",
      "CSS",
      "Java",
      "SQL",
    ],
  },

  // ===== FRAMEWORKS =====
  {
    name: "frameworks",
    displayType: "tags",
    skills: [
      "React",
      "Vue.js",
      "Node.js",
      "Tailwind CSS",
      "Bootstrap v5.3",
      "Flask",
    ],
  },

  // ===== TOOLS  =====
  {
    name: "tools",
    displayType: "tags",
    skills: [
      "GitHub",
      "VS Code",
      "MySQL",
      "Figma",
      "Docker",
      "Postman",
      "WAMP",
      "Microsoft Excel",
      "Tableau",
      "Canva",
    ],
  },

  // ===== COURSEWORK/LEARNING =====
  {
    name: "coursework",
    displayType: "list",
    items: [
      {
        name: "Data Structures & Algorithms",
        description: "Big O Notation, Time & Space Complexities through Python",
        status: "completed",
      },
      {
        name: "Web Application & Development I/II",
        description: "HTML, CSS, JavaScript, Vue, REST APIs",
        status: "completed",
      },
      {
        name: "Data Management",
        description: "MySQL, Relational databases, Normalization, Indexing",
        status: "completed",
      },
      
      {
        name: "Computational Thinking & Programming",
        description: "TCP/IP, HTTP, Networking protocols, Security",
        status: "completed",
      },
      {
        name: "Object-Oriented Programming",
        description: "Classes, inheritance, polymorphism, design patterns with Java",
        status: "in-progress",
      },
      {
        name: "Enterprise Solution Applications & Solutions",
        description: "IT-Business alignment, Microservices, Docker, OutSystem Services",
        status: "in-progress",
      }
    ],
  },
];

// Returns the status icon based on coursework status
function getStatusIcon(status?: "completed" | "in-progress" | "planned") {
  switch (status) {
    case "completed":
      return <CheckCircle2 size={14} className="text-primary" />;
    case "in-progress":
      return <Clock size={14} className="text-syntax-string" />;
    case "planned":
      return <BookOpen size={14} className="text-muted-foreground" />;
    default:
      return null;
  }
}

function getStatusText(status?: "completed" | "in-progress" | "planned") {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In Progress";
    case "planned":
      return "Planned";
    default:
      return "";
  }
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);

  const currentCategory = skillCategories.find((c) => c.name === activeCategory);

  return (
    <section className="min-h-[calc(100vh-10rem)] px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-border flex-1 max-w-16" />
            <span className="text-syntax-comment font-mono text-xs sm:text-sm">{"// 02"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            <span className="text-syntax-keyword">{"const"}</span>{" "}
            <span className="text-syntax-variable">skills</span>
            <span className="text-muted-foreground">{" = {"}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* ===== CATEGORY SELECTOR (styled like JSON file) ===== */}
          <div className="bg-card rounded-lg border border-border overflow-hidden h-fit">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              </div>
              <span className="ml-2 sm:ml-4 text-muted-foreground text-xs sm:text-sm font-mono">
                categories.json
              </span>
            </div>
            <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm">
              <div className="text-muted-foreground mb-2">{"{"}</div>
              {skillCategories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(category.name)}
                  className={`block w-full text-left py-2 px-3 sm:px-4 rounded transition-colors ${
                    activeCategory === category.name
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-syntax-string">{`"${category.name}"`}</span>
                  <span className="text-muted-foreground">
                    : {category.displayType === "list" ? "[...]" : "{...}"}
                  </span>
                  {activeCategory === category.name && (
                    <span className="text-primary ml-2">{"<-"}</span>
                  )}
                </button>
              ))}
              <div className="text-muted-foreground mt-2">{"}"}</div>
            </div>
          </div>

          {/* ===== SKILLS DISPLAY ===== */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              </div>
              <span className="ml-2 sm:ml-4 text-muted-foreground text-xs sm:text-sm font-mono">
                {activeCategory}.ts
              </span>
            </div>

            <div className="p-4 sm:p-6">
              {/* Tags display for skills */}
              {currentCategory?.displayType === "tags" && (
                <div>
                  <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-4">
                    <span className="text-syntax-comment">{"// "}</span>
                    {currentCategory.name}.map(skill {`=>`} {"<Tag />)"}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {(currentCategory as TagsCategory).skills.map((skill, index) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/70 hover:bg-secondary border border-border hover:border-primary/50 rounded-md font-mono text-xs sm:text-sm text-foreground transition-colors cursor-default"
                      >
                        <span className="text-syntax-comment text-xs">{String(index + 1).padStart(2, "0")}</span>
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* List display for coursework/learning items */}
              {currentCategory?.displayType === "list" && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="font-mono text-xs sm:text-sm text-muted-foreground mb-4">
                    <span className="text-syntax-comment">{"// "}</span>
                    Relevant coursework and learning
                  </div>
                  {(currentCategory as ListCategory).items.map((item, index) => (
                    <div
                      key={item.name}
                      className="p-3 sm:p-4 bg-secondary/50 rounded-lg border border-border/50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-syntax-comment font-mono text-xs">
                              {String(index + 1).padStart(2, "0")}.
                            </span>
                            <h4 className="font-mono text-sm sm:text-base text-foreground font-medium">
                              {item.name}
                            </h4>
                          </div>
                          {item.description && (
                            <p className="text-muted-foreground text-xs sm:text-sm ml-6 sm:ml-7">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.status && (
                          <div className="flex items-center gap-1.5 text-xs font-mono whitespace-nowrap">
                            {getStatusIcon(item.status)}
                            <span
                              className={
                                item.status === "completed"
                                  ? "text-primary"
                                  : item.status === "in-progress"
                                    ? "text-syntax-string"
                                    : "text-muted-foreground"
                              }
                            >
                              {getStatusText(item.status)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
