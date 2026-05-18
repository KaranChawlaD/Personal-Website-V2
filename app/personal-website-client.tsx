"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedCard } from "@/components/animated-card";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  // FileText,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface PersonalWebsiteClientProps {
  skills: string[];
  projects: Project[];
  experience: Experience[];
}

const SECTION_IDS = ["about", "experience", "projects", "contact"] as const;

export function PersonalWebsiteClient({
  // skills,
  projects,
  experience,
}: PersonalWebsiteClientProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof SECTION_IDS)[number]>("about");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = headerRef.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${el.getBoundingClientRect().height}px`
      );
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener("orientationchange", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", sync);
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, [mounted]);

  const updateActiveFromScroll = useCallback(() => {
    let headerOffset = typeof window !== "undefined" && window.innerWidth < 640 ? 124 : 80;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--site-header-height")
      .trim();
    if (raw) {
      const parsed = parseFloat(raw);
      if (Number.isFinite(parsed)) headerOffset = Math.round(parsed);
    }
    const doc = document.documentElement;
    const scrollBottom = window.scrollY + window.innerHeight;
    const scrollThreshold = 16;
    const pageScrolls =
      doc.scrollHeight > window.innerHeight + scrollThreshold;
    const atDocumentBottom =
      scrollBottom >= doc.scrollHeight - scrollThreshold;

    // Short last section: its top may never cross the header line before max
    // scroll, so "projects" would stay active. Pin to contact at page bottom.
    if (pageScrolls && atDocumentBottom) {
      setActiveSection("contact");
      return;
    }

    let current: (typeof SECTION_IDS)[number] = "about";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= headerOffset) {
        current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [mounted, updateActiveFromScroll]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (id: (typeof SECTION_IDS)[number]) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) {
    return null;
  }

  const navItems: { id: (typeof SECTION_IDS)[number]; label: string }[] = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const sectionScrollMt =
    "scroll-mt-[calc(var(--site-header-height,7.25rem)+0.375rem)]";

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background">
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-border/45 bg-background/55 shadow-surface-header backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40"
      >
        <nav
          className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2.5 px-4 py-3 sm:flex sm:items-center sm:gap-3 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="col-start-1 row-start-1 justify-self-start truncate text-left font-heading text-base font-semibold tracking-tight text-foreground/95 transition-opacity hover:opacity-80 sm:order-1 sm:max-w-none"
          >
            Karan Chawla
          </button>

          <div className="col-start-2 row-start-1 justify-self-end sm:order-3 sm:justify-self-auto">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>

          <div className="col-span-2 row-start-2 min-w-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:order-2 sm:col-span-1 sm:row-start-1 sm:flex-1 sm:pb-0">
            <div className="flex w-max min-w-full justify-center gap-1.5 sm:mx-auto sm:w-auto sm:min-w-0 sm:justify-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-300 sm:py-1.5",
                    activeSection === item.id
                      ? "border-primary/45 bg-primary/78 text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_-8px_rgba(110,129,55,0.38),0_14px_32px_-14px_rgba(110,129,55,0.22)] backdrop-blur-md dark:border-primary/40 dark:bg-primary/72 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_20px_-10px_rgba(143,161,73,0.35)]"
                      : "border-transparent bg-transparent text-muted-foreground/95 hover:border-primary/25 hover:bg-primary/12 hover:text-foreground dark:hover:border-primary/28 dark:hover:bg-primary/18"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main
        role="main"
        className="pt-[var(--site-header-height,7.25rem)]"
      >
        {/* About — hero + bio + skills */}
        <section
          id="about"
          className={`flex flex-col justify-start sm:justify-center ${sectionScrollMt} border-b border-border/30 px-4 pt-4 pb-14 min-h-[calc(100svh-var(--site-header-height,7.25rem))] sm:px-6 sm:pt-20 sm:pb-20 lg:px-8`}
          aria-label="About Karan Chawla"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] md:items-center md:gap-12 lg:gap-16">
              <div className="space-y-6">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Engineering · Robotics · Software
                </p>
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Karan Chawla
                </h1>
                <p className="max-w-xl text-lg font-medium leading-snug text-foreground/90 sm:text-xl">
                  Building autonomous robots at the intersection of hardware and software engineering.
                </p>
                <p className="text-base font-bold text-muted-foreground sm:text-lg">
                  Engineering Science @{" "}
                  <a className="text-foreground font-bold hover:underline" href="https://www.utoronto.ca/" target="_blank" rel="noopener noreferrer">University of Toronto</a>
                </p>
                <p className="max-w-prose text-base leading-relaxed text-foreground/85">
                  I&apos;m Karan Chawla, interested in robotics, computing, and
                  how technology solves real-world problems. I&apos;ve worked on
                  competition robots, hackathons, and projects that blend
                  hardware and software. I care about building communities
                  around STEM and learning through collaboration.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2 sm:justify-start">
                  {/* <Button asChild size="lg" className="rounded-full px-6">
                    <a
                      href="/Karan_Chawla_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="size-4" />
                      Resume
                    </a>
                  </Button> */}
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="rounded-full border-border/55 bg-background/55 px-6 shadow-[0_1px_2px_oklch(0.35_0.03_264_/6%)] backdrop-blur-sm dark:shadow-[0_1px_2px_oklch(0_0_0_/35%)]"
                    onClick={() => scrollToSection("contact")}
                  >
                    Get in touch
                  </Button>
                </div>
              </div>

              <div className="relative mx-auto hidden w-full max-w-[280px] md:mx-0 md:block md:max-w-none">
                <div
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/30 blur-2xl dark:from-primary/25 dark:to-secondary/20"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-surface-card ring-1 ring-foreground/[0.06] dark:ring-white/[0.07]">
                  <Image
                    src="/profile.png"
                    alt="Karan Chawla"
                    width={400}
                    height={400}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* <div className="mt-16 border-t border-border/40 pt-12">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Skills & tools
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-0.5 font-normal text-foreground/90 transition-colors hover:border-primary/30 hover:bg-muted"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div> */}
          </div>
        </section>

        {/* Experience — timeline */}
        <section
          id="experience"
          className={`${sectionScrollMt} px-4 py-16 sm:px-6 sm:py-20 lg:px-8`}
          aria-label="Work experience"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Experience
              </h2>
              <p className="mt-3 text-muted-foreground">
                Roles across autonomous systems, events, research, and robotics
                leadership.
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-border/50 via-border/85 to-border/40 md:left-[11px]"
                aria-hidden
              />
              <ul className="relative space-y-10 md:space-y-12">
                {experience.map((exp, index) => (
                  <li key={`${exp.title}-${index}`} className="relative pl-10 md:pl-14">
                    <span
                      className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-background bg-primary shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_40%,transparent),0_2px_6px_oklch(0.35_0.04_264_/18%)] md:left-1 md:size-[18px]"
                      aria-hidden
                    />
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">
                          {exp.title}
                        </h3>
                        <p className="text-primary">{exp.company}</p>
                      </div>
                      <span className="shrink-0 text-sm tabular-nums text-muted-foreground sm:text-right">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {exp.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className={`${sectionScrollMt} border-t border-border/30 bg-muted/35 px-4 py-16 dark:bg-muted/12 sm:px-6 sm:py-20 lg:px-8`}
          aria-label="Projects"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Projects
              </h2>
              <p className="mt-3 text-muted-foreground">
                Selected work from hackathons, competitions, and product-style
                builds.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <AnimatedCard
                  key={project.title}
                  className="border-border/40 bg-card/75 backdrop-blur-sm dark:bg-card/45"
                  delay={index * 80}
                  animation="fade-in"
                >
                  <article className="flex h-full flex-col p-6 sm:p-7">
                    <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/35 bg-muted/45 px-2 py-0.5 text-xs text-foreground/85"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6">
                      {project.link ? (
                        <Button variant="ghost" size="sm" className="-ml-3 gap-1 px-3 text-primary" asChild>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title}`}
                          >
                            View project
                            <ArrowUpRight className="size-4" />
                          </a>
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Private
                        </span>
                      )}
                    </div>
                  </article>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className={`${sectionScrollMt} px-4 py-16 sm:px-6 sm:py-24 lg:px-8`}
          aria-label="Contact"
        >
          <div className="mx-auto max-w-6xl">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s talk
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Open to collaborations, internships, and conversations about
                robotics and software. Send a note anytime.
              </p>
              <div className="mt-8 space-y-3 text-sm sm:text-base">
                <a
                  href="mailto:karan.chawlad@gmail.com"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-5 shrink-0 text-primary" />
                  karan.chawlad@gmail.com
                </a>
                <a
                  href="https://www.utoronto.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <MapPin className="size-5 shrink-0 text-primary" />
                  Toronto, Canada
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { Icon: Github, href: "https://github.com/karanchawlad", label: "GitHub" },
                  {
                    Icon: Linkedin,
                    href: "https://linkedin.com/in/karan-chawla-dora",
                    label: "LinkedIn",
                  },
                  {
                    Icon: Instagram,
                    href: "https://www.instagram.com/_karan.chawla",
                    label: "Instagram",
                  },
                  { Icon: Twitter, href: "https://x.com/KaranChawlaD", label: "X" },
                ].map(({ Icon, href, label }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="icon"
                    className="size-11 rounded-full border-border/50 shadow-[0_1px_2px_oklch(0.35_0.03_264_/5%)] dark:shadow-[0_1px_3px_oklch(0_0_0_/40%)]"
                    asChild
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon className="size-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/30 px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} Karan Chawla</p>
      </footer>

      {/* SKULE WebRing */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex items-center gap-2 rounded-full border border-primary/35 bg-primary/18 px-3 py-1.5 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.12),0_4px_14px_-6px_rgba(110,129,55,0.32),0_18px_38px_-16px_rgba(51,65,85,0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-primary/14 dark:border-primary/32 dark:bg-primary/22 dark:shadow-[0_1px_0_rgba(255,255,255,0.08),0_8px_28px_-8px_rgba(0,0,0,0.48),0_0_36px_-12px_rgba(143,161,73,0.28)]">
          <a
            href="https://WebRing.skule.ca/#https://www.karan-chawla.com/?nav=prev"
            className="text-sm leading-none text-foreground/90 transition-colors hover:text-primary hover:underline"
            aria-label="Previous site in SKULE WebRing"
            rel="noopener noreferrer"
          >
            ←
          </a>
          <a
            href="https://WebRing.skule.ca/#https://www.karan-chawla.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-5 items-center justify-center rounded-full border border-transparent transition-colors hover:border-primary/35 hover:bg-primary/15 md:size-6"
            aria-label="SKULE WebRing"
          >
            <Image
              src="https://WebRing.skule.ca/img/icon.svg"
              alt=""
              width={24}
              height={24}
              className="size-full"
              loading="lazy"
              unoptimized
            />
          </a>
          <a
            href="https://WebRing.skule.ca/#https://www.karan-chawla.com/?nav=next"
            className="text-sm leading-none text-foreground/90 transition-colors hover:text-primary hover:underline"
            aria-label="Next site in SKULE WebRing"
            rel="noopener noreferrer"
          >
            →
          </a>
        </div>
      </div>
    </div>
  );
}
