"use client";

/**
 * =============================================================================
 * THEME TOGGLE COMPONENT
 * =============================================================================
 * 
 * This component provides a dropdown menu to switch between Light, Dark, and
 * System (auto-detect) themes. It uses next-themes under the hood.
 * 
 * HOW TO CUSTOMIZE:
 * - To change the default theme, edit the `defaultTheme` prop in layout.tsx
 * - To add more theme options, add them to the `themes` array below
 * 
 * =============================================================================
 */

import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[100px] h-9 rounded-lg bg-secondary border border-border animate-pulse" />
    );
  }

  const currentTheme = themes.find((t) => t.id === theme) || themes[2];
  const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground hover:border-primary/50 transition-colors font-mono text-xs"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <CurrentIcon size={14} className="text-primary" />
        <span className="hidden sm:inline">{currentTheme.label}</span>
        <ChevronDown 
          size={12} 
          className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-36 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
          role="listbox"
        >
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left font-mono text-xs transition-colors ${
                theme === t.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              role="option"
              aria-selected={theme === t.id}
            >
              <t.icon size={14} />
              <span>{t.label}</span>
              {theme === t.id && (
                <span className="ml-auto text-primary">*</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
