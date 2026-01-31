"use client";

import React from "react";
import { useState } from "react";
import { Github, Linkedin, Mail, Instagram, Send, Twitter } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com/yeoyusongsean", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/yeo-yu-song-sean", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/y.yusongs_", label: "Instagram" },
  { icon: Mail, href: "mailto:yeoyusongsean2002@gmail.com", label: "Email" },
];

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /**
   * FORM SUBMISSION HANDLER - Uses Formspree
   * 
   * Make sure you have NEXT_PUBLIC_FORMSPREE_ID in your .env file
   * Example: NEXT_PUBLIC_FORMSPREE_ID=xyzabcde
   */
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    
    if (!formspreeId) {
      setError("Formspree ID not configured. Please add NEXT_PUBLIC_FORMSPREE_ID to your environment variables.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: JSON.stringify(formState),
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-[calc(100vh-10rem)] px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-border flex-1 max-w-16" />
            <span className="text-syntax-comment font-mono text-xs sm:text-sm">{"// 04"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            <span className="text-syntax-keyword">{"async"}</span>{" "}
            <span className="text-syntax-function">getInTouch</span>
            <span className="text-muted-foreground">{"() {"}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* ===== LEFT SIDE - MESSAGE & SOCIAL LINKS ===== */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs sm:text-sm">
                <span className="text-primary">~</span>
                <span>/contact</span>
              </div>
              {/* EDIT THIS: Your contact message */}
              <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>
                  <span className="text-syntax-keyword">{">"}</span>{" "}
                  {"I'm always excited to connect with fellow developers, mentors, and "}
                  {"anyone interested in technology. Whether you want to "}
                  {"collaborate, or just want to say hi - my inbox is always open!"}
                </p>
                <p>
                  <span className="text-syntax-keyword">{">"}</span>{" "}
                  {"I'm particularly interested in INTERNSHIP opportunities, open source "}
                  {"collaboration, and learning from experienced developers. #FOMOnster"}
                </p>
              </div>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-card rounded-lg border border-border p-3 sm:p-4 hover:border-primary/50 transition-colors group"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors font-mono text-xs sm:text-sm">
                    {social.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Terminal Command */}
            <div className="bg-card rounded-lg border border-border p-3 sm:p-4 font-mono text-xs sm:text-sm">
              <div className="text-muted-foreground mb-2">
                <span className="text-syntax-comment">{"// Quick reach"}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-primary">$</span>
                <span className="text-syntax-function">echo</span>
                <span className="text-syntax-string">{'"ฅ^>⩊<^ฅ"'}</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-syntax-function">mail</span>
                {/* EDIT THIS: Your email address */}
                <span className="text-syntax-variable break-all">yeoyusongsean2002@gmail.com</span>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDE - CONTACT FORM ===== */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              </div>
              <span className="ml-2 sm:ml-4 text-muted-foreground text-xs sm:text-sm font-mono">
                message.ts
              </span>
            </div>

            {submitted ? (
              <div className="p-6 sm:p-8 text-center">
                <div className="text-primary text-2xl sm:text-4xl mb-4 font-mono">{"// Success!"}</div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  Message Sent
                </h3>
                <p className="text-muted-foreground font-mono text-xs sm:text-sm">
                  <span className="text-syntax-comment">{"// "}</span>
                  {"Thanks for reaching out. I'll get back to you soon!"}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-primary hover:text-primary/80 font-mono text-xs sm:text-sm underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 text-destructive text-xs sm:text-sm font-mono">
                    <span className="text-syntax-comment">{"// Error: "}</span>
                    {error}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-mono mb-2 text-muted-foreground"
                  >
                    <span className="text-syntax-keyword">const</span>{" "}
                    <span className="text-syntax-variable">name</span>{" "}
                    <span className="text-muted-foreground">=</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                    className="w-full bg-secondary border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-mono text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder='"Your Name"'
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-mono mb-2 text-muted-foreground"
                  >
                    <span className="text-syntax-keyword">const</span>{" "}
                    <span className="text-syntax-variable">email</span>{" "}
                    <span className="text-muted-foreground">=</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                    className="w-full bg-secondary border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-mono text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder='"you@example.com"'
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-mono mb-2 text-muted-foreground"
                  >
                    <span className="text-syntax-keyword">const</span>{" "}
                    <span className="text-syntax-variable">message</span>{" "}
                    <span className="text-muted-foreground">=</span>
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-foreground font-mono text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="`Your message here...`"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">{"~"}</span>
                      <span>sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="sm:w-4 sm:h-4" />
                      <span>await sendMessage()</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Section Closing */}
        <div className="mt-8 sm:mt-12 text-muted-foreground font-mono">
          <span>{"}"}</span>
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center">
          <div className="h-px bg-border mb-6 sm:mb-8" />
          <p className="text-muted-foreground font-mono text-xs sm:text-sm">
            <span className="text-syntax-comment">{"// "}</span>
            Architected through{" "}
            <span className="text-primary">Vercel v0</span>
            {"; Polished with "}
            <span className="text-syntax-string">Passion</span>
          </p>
          <p className="text-muted-foreground font-mono text-xs mt-2">
            {"// "} 2026 Yeo Yu Song, Sean. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
