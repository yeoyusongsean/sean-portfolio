"use client";

/**
 * =============================================================================
 * PROJECTS SECTION - SHOWCASE YOUR WORK
 * =============================================================================
 * 
 * This section displays your projects in two ways:
 * 1. Featured Projects: Large cards with media carousel (images/videos)
 * 2. Other Projects: Smaller grid cards for additional projects
 * 
 * HOW TO CUSTOMIZE:
 * 
 * 1. EDIT FEATURED PROJECTS:
 *    - Find the `featuredProjects` array below
 *    - Each project needs:
 *      - title: Project name
 *      - description: What the project does
 *      - tech: Array of technologies used
 *      - github: Link to GitHub repo
 *      - live: Link to live demo (or null if none)
 *      - media: Array of images/videos (see MediaItem type)
 * 
 *    MEDIA ITEMS:
 *    - For images: { type: "image", src: "/path/to/image.jpg", alt: "Description" }
 *    - For videos: { type: "video", src: "/path/to/video.mp4", poster: "/thumbnail.jpg" }
 *    
 *    TIP: Place your images in the /public folder, then reference them as "/image.jpg"
 * 
 * 2. EDIT OTHER PROJECTS:
 *    - Find the `otherProjects` array below
 *    - Smaller cards with just title, description, tech, and github link
 * 
 * =============================================================================
 */

import { useState } from "react";
import { Github, ExternalLink, Folder, ChevronLeft, ChevronRight, Link2, FileText, Globe, Play, X } from "lucide-react";
import Link from "next/link";
import { MediaCarousel, type MediaItem } from "./media-carousel";

/**
 * Link types supported for projects:
 * - "github": GitHub repository (shows GitHub icon)
 * - "website": External website (shows Globe icon)
 * - "demo": Live demo/app (shows Play icon)
 * - "docs": Documentation (shows FileText icon)
 * - "other": Any other platform (shows Link2/chip icon)
 */
type LinkType = "github" | "website" | "demo" | "docs" | "other";

interface ProjectLink {
  type: LinkType;
  url: string;
  label?: string;  // Optional custom label (e.g., "Figma", "Notion", "Devpost")
}

/**
 * Returns the appropriate icon based on link type
 */
function getLinkIcon(type: LinkType) {
  switch (type) {
    case "github":
      return Github;
    case "website":
      return Globe;
    case "demo":
      return Play;
    case "docs":
      return FileText;
    case "other":
    default:
      return Link2;
  }
}

/**
 * Returns the default label for a link type
 */
function getDefaultLabel(type: LinkType): string {
  switch (type) {
    case "github":
      return "View Code";
    case "website":
      return "Website";
    case "demo":
      return "Live Demo";
    case "docs":
      return "Docs";
    case "other":
    default:
      return "Link";
  }
}

type FeaturedProject = {
  title: string;
  description: string;
  tech: string[];
  links: ProjectLink[];  // Array of links with different types
  media: MediaItem[];
};

/**
 * FEATURED PROJECTS - Your best work with media carousel
 * Add images/videos to showcase each project visually.
 * 
 * LINKS ARRAY - Supports multiple link types:
 * - { type: "github", url: "https://github.com/..." }           // GitHub icon
 * - { type: "website", url: "https://..." }                     // Globe icon
 * - { type: "demo", url: "https://..." }                        // Play icon
 * - { type: "docs", url: "https://..." }                        // FileText icon
 * - { type: "other", url: "https://...", label: "Figma" }       // Link2 icon + custom label
 * - { type: "other", url: "https://...", label: "Devpost" }     // For hackathon projects
 * - { type: "other", url: "https://...", label: "Notion" }      // For Notion pages
 * 
 * To add your own media:
 * 1. Put images in /public folder (e.g., /public/projects/my-app.png)
 * 2. Reference them as "/projects/my-app.png" in the src field
 * 3. For videos, use MP4 format for best compatibility
 */
const featuredProjects: FeaturedProject[] = [
  {
    title: "HUSTLE",
    description:
      "A high-fidelity interactive protoype featuring a dedicated mobile marketplace app to consolidate and promote small homebased businesses. Built to learn UI designs on Figma.",
    tech: ["Figma", "Maze"],
    links: [
      { type: "demo", url: "https://www.figma.com/proto/yzAeZvLcuVfYhWrszyMnk9/Hustle-Fidelity?node-id=1171-10682&p=f&t=UkKYF77uhkGBBMPQ-1&scaling=scale-down&content-scaling=fixed&page-id=1029%3A10016&starting-point-node-id=1171%3A10682&show-proto-sidebar=1", },
      { type: "demo", url: "https://youtu.be/BnnhDKt-TBo?si=GloNiLxhlTVvb2oT", label:"Youtube Demo" },
    ],
    media: [
      { type: "image", src: "/src/projects/hustle/slide_2.png", alt: "Problem Statement" },
      { type: "image", src: "/src/projects/hustle/slide_3.png", alt: "Solution" },
      { type: "image", src: "/src/projects/hustle/slide_4.png", alt: "Persona Pt.1" },
      { type: "image", src: "/src/projects/hustle/slide_5.png", alt: "Persona Pt.2" },
      { type: "image", src: "/src/projects/hustle/slide_6.png", alt: "Persona Pt.3" },
    ],
  },
  {
    title: "HousebibiGoWhere",
    description:
      "A project built during IS216 to acquire technical skills of frontend & backend web application development. Demonstrates a fully responsive web and mobile application using Vue.js and Tailwind CSS.",
    tech: ["Vue.js", "JavaScript", "HTML/CSS", "GitHub", "Firebase"],
    links: [
      { type: "github", url: "https://github.com/jeniffer-joyce/HousebibiGoWhere" },
      { type: "other", url: "https://craftconnect-3b52c.web.app", label: "Live Website" },
      { type: "demo", url: "https://youtu.be/OZwoBpurGP0", label:"Youtube Demo" },
    ],
    media: [
      { type: "image", src: "/src/projects/housebibiGoWhere/slide_1.png", alt: "Framework" },
      { type: "image", src: "/src/projects/housebibiGoWhere/analytic_dashboard.png", alt: "Analytic Dashboard Preview" },
      { type: "image", src: "/src/projects/housebibiGoWhere/edit_products.png", alt: "Edit Products Preview" },
      { type: "image", src: "/src/projects/housebibiGoWhere/shipment.png", alt: "Shipment Preview" },
      { type: "image", src: "/src/projects/housebibiGoWhere/inventory.png", alt: "Inventory Preview" },
      { type: "image", src: "/src/projects/housebibiGoWhere/reviews.png", alt: "Reviews Preview" },
      { type: "image", src: "/src/projects/housebibiGoWhere/shopping_cart.png", alt: "Shopping Cart Preview" },
      { type: "image", src: "/src/projects/housebibiGoWhere/products.png", alt: "Products Preview" },
    ],
  },
];

/**
 * OTHER PROJECTS - Smaller project cards with optional media and multiple links
 * Good for hackathon projects, learning exercises, etc.
 * 
 * FIELDS:
 * - title: Project name
 * - description: Short description (shown on card, truncated if too long)
 * - fullDescription: Optional longer description (shown in modal popup)
 * - tech: Array of technologies used
 * - links: Optional array of links (supports multiple platforms)
 * - media: Optional array of images/videos with fullscreen support
 * 
 * MEDIA ITEMS (same format as featured projects):
 * - { type: "image", src: "/src/projects/image.png", alt: "Description" }
 * - { type: "video", src: "/src/projects/video.mp4", poster: "/thumbnail.png" }
 */
type OtherProject = {
  title: string;
  description: string;
  fullDescription?: string;  // Optional - longer description shown in popup modal
  tech: string[];
  links?: ProjectLink[];     // Optional - array of links (multiple supported)
  media?: MediaItem[];       // Optional - array of images/videos with fullscreen support
};

const otherProjects: OtherProject[] = [
  {
    title: "Workflow Optimization (Goods Receipts)",
    description: "Engineered an end-to-end automation bot to process Goods Receipts (GRs) with Kryon Studio.",
    fullDescription: "Engineered an end-to-end automation bot to process Goods Receipts (GRs), integrating Outlook for automated communication and saving the department an estimated 10+ man-hours weekly. The solution automates data extraction from SAP, validates entries against business rules, and sends consolidated reports to key appointment holders.",
    tech: ["RPA", "Kryon Studios"],
    // Add links and media as needed:
    // links: [
    //   { type: "docs", url: "/src/documents/project.pdf" },
    //   { type: "docs", url: "/src/documents/project.pdf" }
    // ],
    // media: [
    //   { type: "image", src: "/src/projects/workflow/screenshot1.png", alt: "Workflow Dashboard" },
    //   { type: "image", src: "/src/projects/workflow/screenshot2.png", alt: "Report Output" },
    //   { type: "video", src: "/src/projects/workflow/demo.mp4", poster: "/src/projects/workflow/thumbnail.png" },
    // ],
  },
  {
    title: "Data Reconciliation (Parking.SG)",
    description: "Developed an automation solution for reconciling parking transaction data, reducing manual verification time by 80% and improving accuracy of financial reporting.",
    fullDescription: "Developed an automation solution for reconciling parking transaction data across multiple systems. The bot compares records from Parking.SG with internal databases, flags discrepancies, and generates detailed exception reports. Reduced manual verification time by 80% and improved accuracy of financial reporting.",
    tech: ["RPA", "Kryon Studios"],
  },
];

export function ProjectsSection() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = featuredProjects[currentProjectIndex];
  const [selectedProject, setSelectedProject] = useState<OtherProject | null>(null);

  const goToPrevProject = () => {
    setCurrentProjectIndex((prev) => 
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
  };

  const goToNextProject = () => {
    setCurrentProjectIndex((prev) => 
      prev === featuredProjects.length - 1 ? 0 : prev + 1
    );
  };

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
            <span className="text-syntax-keyword">{"export"}</span>{" "}
            <span className="text-syntax-function">projects</span>
            <span className="text-muted-foreground">{"[]"}</span>
          </h2>
        </div>

        {/* ===== FEATURED PROJECT SHOWCASE ===== */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-mono text-foreground">
              <span className="text-syntax-comment">{"// "}</span>
              Featured Projects
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevProject}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-mono text-xs sm:text-sm text-muted-foreground px-2">
                {currentProjectIndex + 1} / {featuredProjects.length}
              </span>
              <button
                type="button"
                onClick={goToNextProject}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              </div>
              <span className="ml-2 sm:ml-4 text-muted-foreground text-xs sm:text-sm font-mono truncate">
                {currentProject.title.toLowerCase().replace(/\s+/g, "-")}.tsx
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Media Carousel - Fullscreen disabled for featured projects */}
              <div className="border-b lg:border-b-0 lg:border-r border-border">
                <MediaCarousel items={currentProject.media} enableFullscreen={false} />
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-6 flex flex-col">
                <div className="flex-1">
                  <p className="text-primary font-mono text-xs sm:text-sm mb-2">
                    Featured Project {currentProjectIndex + 1}
                  </p>
                  <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                    {currentProject.title}
                  </h4>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    {currentProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {currentProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-syntax-string font-mono text-xs sm:text-sm px-2 sm:px-3 py-1 bg-secondary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  {currentProject.links.map((link, idx) => {
                    const IconComponent = getLinkIcon(link.type);
                    const label = link.label || getDefaultLabel(link.type);
                    return (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs sm:text-sm"
                      >
                        <IconComponent size={16} className="sm:w-[18px] sm:h-[18px]" />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Project Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredProjects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setCurrentProjectIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentProjectIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to ${project.title}`}
              />
            ))}
          </div>
        </div>

        {/* ===== OTHER PROJECTS GRID ===== */}
        <div>
          <h3 className="text-base sm:text-lg font-mono text-foreground text-center mb-6 sm:mb-8">
            <span className="text-syntax-comment">{"// "}</span>
            Other Noteworthy Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {otherProjects.map((project) => (
              <button
                type="button"
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="bg-card rounded-lg border border-border p-4 sm:p-5 hover:border-primary/50 transition-all hover:-translate-y-1 group text-left cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <Folder className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  {project.links && project.links.length > 0 && (
                    <div className="flex items-center gap-2">
                      {project.links.slice(0, 2).map((link, idx) => {
                        const IconComponent = getLinkIcon(link.type);
                        return (
                          <span
                            key={idx}
                            className="text-muted-foreground"
                            title={link.label || getDefaultLabel(link.type)}
                          >
                            <IconComponent size={18} className="sm:w-5 sm:h-5" />
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-syntax-comment font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Closing */}
        <div className="mt-8 sm:mt-12 text-muted-foreground font-mono text-center">
          <span className="text-syntax-comment">{"// More projects coming soon..."}</span>
        </div>
      </div>

      {/* ===== PROJECT DETAIL MODAL ===== */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border bg-secondary/50">
              <div className="flex items-center gap-2 sm:gap-3">
                <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto p-4 sm:p-5 max-h-[60vh]">
              {/* Project Media Carousel (if available) */}
              {selectedProject.media && selectedProject.media.length > 0 && (
                <div className="mb-4 sm:mb-5 rounded-lg overflow-hidden border border-border">
                  <MediaCarousel items={selectedProject.media} />
                </div>
              )}

              {/* Full Description */}
              <div className="mb-4 sm:mb-5">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {selectedProject.fullDescription || selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-4 sm:mb-5">
                <p className="text-syntax-comment font-mono text-xs mb-2">{"// technologies"}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-syntax-string font-mono text-xs sm:text-sm px-2 sm:px-3 py-1 bg-secondary rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links (multiple supported) */}
              {selectedProject.links && selectedProject.links.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-syntax-comment font-mono text-xs mb-2">{"// links"}</p>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.links.map((link, idx) => {
                      const IconComponent = getLinkIcon(link.type);
                      return (
                        <Link
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
                        >
                          <IconComponent size={16} />
                          {link.label || getDefaultLabel(link.type)}
                          <ExternalLink size={14} className="text-muted-foreground" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
