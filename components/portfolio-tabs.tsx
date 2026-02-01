"use client";

/**
 * =============================================================================
 * PORTFOLIO TABS - MAIN NAVIGATION COMPONENT
 * =============================================================================
 * 
 * This is the main layout component that handles tab-based navigation between
 * different sections of your portfolio. It's styled like an IDE with file tabs.
 * 
 * HOW TO CUSTOMIZE:
 * - To add/remove tabs, edit the `tabs` array below
 * - To change tab icons, import different icons from lucide-react
 * - To change the file names shown in tabs, edit the `file` property
 * - Keyboard shortcuts: Alt+1 through Alt+5 to switch tabs
 * 
 * STRUCTURE:
 * - Header: Window controls, theme toggle, mobile menu
 * - Tab Bar: File-style tabs (desktop) or hamburger menu (mobile)
 * - Content Area: Renders the active section component
 * - Status Bar: IDE-style status information
 * 
 * =============================================================================
 */

import { useState, useEffect, useCallback } from "react";
import { Home, User, Code2, Briefcase, FolderGit2, Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { ProjectsSection } from "./projects-section";
import { ContactSection } from "./contact-section";

type TabId = "home" | "about" | "skills" | "experiences" | "projects" | "contact";

/**
 * TAB CONFIGURATION
 * Add or remove tabs here. Each tab needs:
 * - id: Unique identifier (used for navigation)
 * - label: Display name in mobile menu
 * - icon: Lucide icon component
 * - file: Fake filename shown in tab (for the coding aesthetic)
 */
const tabs = [
  { id: "home" as TabId, label: "home", icon: Home, file: "index.tsx" },
  { id: "about" as TabId, label: "about", icon: User, file: "about.tsx" },
  { id: "skills" as TabId, label: "skills", icon: Code2, file: "skills.tsx" },
  { id: "experiences" as TabId, label: "experiences", icon: Briefcase, file: "experiences.tsx" },
  { id: "projects" as TabId, label: "projects", icon: FolderGit2, file: "projects.tsx" },
  { id: "contact" as TabId, label: "contact", icon: Mail, file: "contact.tsx" },
];

export function PortfolioTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = useCallback((tabId: TabId) => {
    if (tabId === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsTransitioning(false);
      setMobileMenuOpen(false);
    }, 150);
  }, [activeTab]);

  // Keyboard navigation - Alt+1 through Alt+5
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        const index = parseInt(e.key, 10) - 1;
        if (index >= 0 && index < tabs.length) {
          handleTabChange(tabs[index].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTabChange]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ===== IDE HEADER BAR ===== */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        {/* Top Bar with Window Controls */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-secondary/50 border-b border-border">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* macOS-style window buttons */}
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
            </div>
            {/* Project name - customize this! */}
            <span className="font-mono text-xs sm:text-sm text-muted-foreground hidden xs:block">
              portfolio.dev
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ===== DESKTOP TAB BAR ===== */}
        <div className="hidden md:flex items-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`group flex items-center gap-2 px-3 lg:px-4 py-3 border-r border-border font-mono text-sm transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-background text-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? "text-primary" : ""} />
              <span>{tab.file}</span>
              <span className="text-xs text-muted-foreground/50 ml-1 hidden lg:inline">
                Alt+{index + 1}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* ===== MOBILE MENU ===== */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop - click to close menu */}
            <div 
              className="fixed inset-0 z-40 bg-background/50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu content */}
            <div className="md:hidden bg-card border-t border-border animate-in slide-in-from-top-2 duration-200 relative z-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-border font-mono text-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="flex-1 text-left">{tab.label}</span>
                  <span className="text-xs text-muted-foreground">{tab.file}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </header>

      {/* ===== BREADCRUMB / FILE PATH ===== */}
      <div className="px-3 sm:px-4 py-2 bg-secondary/30 border-b border-border font-mono text-xs text-muted-foreground overflow-x-auto">
        <span className="text-syntax-comment">{"// "}</span>
        <span>portfolio</span>
        <span className="mx-1">/</span>
        <span>pages</span>
        <span className="mx-1">/</span>
        <span className="text-foreground">{currentTab?.file}</span>
      </div>

      {/* ===== CONTENT AREA ===== */}
      <main className="flex-1 overflow-y-auto">
        <div
          className={`transition-all duration-150 ${
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {activeTab === "home" && <HeroSection onNavigate={handleTabChange} />}
          {activeTab === "about" && <AboutSection />}
          {activeTab === "skills" && <SkillsSection />}
          {activeTab === "experiences" && <ExperienceSection />}
          {activeTab === "projects" && <ProjectsSection />}
          {activeTab === "contact" && <ContactSection />}
        </div>
      </main>

      {/* ===== STATUS BAR ===== */}
      <footer className="sticky bottom-0 bg-card border-t border-border px-3 sm:px-4 py-1.5 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="hidden xs:inline">Ready</span>
          </span>
          <span className="hidden sm:inline">
            {currentTab?.label}.render()
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline">TypeScript React</span>
          <span className="hidden xs:inline">UTF-8</span>
          <span className="text-primary">Ln 1, Col 1</span>
        </div>
      </footer>
    </div>
  );
}
