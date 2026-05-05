"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedCard } from "@/components/animated-card";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  FileText,
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
  skills,
  projects,
  experience,
}: PersonalWebsiteClientProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof SECTION_IDS)[number]>("about");

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

  const updateActiveFromScroll = useCallback(() => {
    const headerOffset = 100;
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
    return () =>
      window.removeEventListener("scroll", updateActiveFromScroll);
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

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300 bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
        <nav
          className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="font-heading shrink-0 text-left text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            Karan Chawla
          </button>

          <div className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-end gap-1 sm:justify-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </nav>
      </header>

      <main role="main">
        {/* About — hero + bio + skills */}
        <section
          id="about"
          className="scroll-mt-24 border-b border-border/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
          aria-label="About Karan Chawla"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] lg:items-center lg:gap-16">
              <div className="space-y-6">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Engineering · Robotics · Software
                </p>
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Karan Chawla
                </h1>
                <p className="max-w-xl text-lg font-medium leading-snug text-foreground/90 sm:text-xl">
                  Building autonomous robotic systems at the intersection of hardware and code.
                </p>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Engineering Science @{" "}
                  <span className="text-foreground">University of Toronto</span>
                </p>
                <p className="max-w-prose text-base leading-relaxed text-foreground/85">
                  I&apos;m Karan Chawla, interested in robotics, computing, and
                  how technology solves real-world problems. I&apos;ve worked on
                  competition robots, hackathons, and projects that blend
                  hardware and software. I care about building communities
                  around STEM and learning through collaboration.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
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
                    className="rounded-full border-border/80 bg-background/50 px-6 backdrop-blur-sm"
                    onClick={() => scrollToSection("contact")}
                  >
                    Get in touch
                  </Button>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
                <div
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/30 blur-2xl dark:from-primary/25 dark:to-secondary/20"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <Image
                    src="/profile.png"
                    alt="Karan Chawla"
                    width={400}
                    height={400}
                    className="aspect-square w-full object-cover"
                    priority
                    fetchPriority="high"
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
          className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
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
                className="absolute bottom-0 left-[7px] top-2 w-px bg-border md:left-[11px]"
                aria-hidden
              />
              <ul className="relative space-y-10 md:space-y-12">
                {experience.map((exp, index) => (
                  <li key={`${exp.title}-${index}`} className="relative pl-10 md:pl-14">
                    <span
                      className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-background bg-primary shadow-sm md:left-1 md:size-[18px]"
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
          className="scroll-mt-24 border-t border-border/40 bg-muted/30 px-4 py-16 dark:bg-muted/10 sm:px-6 sm:py-20 lg:px-8"
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
                  className="border-border/60 bg-card/80 backdrop-blur-sm dark:bg-card/40"
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
                          className="rounded-md border border-border/50 bg-muted/40 px-2 py-0.5 text-xs text-foreground/80"
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
          className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
          aria-label="Contact"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
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
              </div>

              <AnimatedCard
                className="border-border/60 bg-card/80 backdrop-blur-sm dark:bg-card/40"
                animation="fade-in"
              >
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-medium text-muted-foreground">
                    Elsewhere
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
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
                        className="size-11 rounded-full border-border/80"
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
              </AnimatedCard>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} Karan Chawla</p>
      </footer>

      {/* SKULE WebRing */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex items-center gap-2 rounded-full border border-primary bg-primary px-3 py-1.5 text-primary-foreground shadow-md">
          <a
            href="https://WebRing.skule.ca/#https://www.karan-chawla.com/?nav=prev"
            className="text-sm leading-none hover:underline"
            aria-label="Previous site in SKULE WebRing"
            rel="noopener noreferrer"
          >
            ←
          </a>
          <a
            href="https://WebRing.skule.ca/#https://www.karan-chawla.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-5 items-center justify-center md:size-6"
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
            className="text-sm leading-none hover:underline"
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
