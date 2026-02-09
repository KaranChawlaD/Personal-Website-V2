"use client";

import { useState, useEffect } from "react";
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
  User,
  Briefcase,
  Code,
  MessageCircle,
  Instagram,
} from "lucide-react";

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

export function PersonalWebsiteClient({
  skills,
  projects,
  experience,
}: PersonalWebsiteClientProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Default to dark mode
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return (
          <section className="space-y-8" aria-label="About Karan Chawla">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-secondary dark:bg-secondary flex items-center justify-center animate-bounce-in animate-float relative overflow-hidden">
                <Image
                  src="/profile.png"
                  alt="Karan Chawla - Engineering Science student at University of Toronto, passionate about robotics and software engineering"
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <h1 className="text-4xl font-bold text-text dark:text-text mb-2">
                  Karan Chawla
                </h1>
                <p className="text-xl text-primary dark:text-primary">
                  Engineering Science @ UofT
                </p>
              </div>
            </div>

            <AnimatedCard
              className="bg-white/50 dark:bg-secondary/20 border-secondary dark:border-secondary backdrop-blur-sm"
              delay={400}
              animation="slide-in-left"
            >
              <article className="p-6">
                <h2 className="text-2xl font-semibold text-text dark:text-text mb-4">
                  About Me
                </h2>
                <p className="text-text/80 dark:text-text/80 leading-relaxed mb-6">
                  I&apos;m Karan Chawla, a first-year Engineering Science
                  student at the University of Toronto interested in robotics,
                  computing, and how technology can be used to solve real-world
                  problems. I&apos;ve been involved in robotics competitions,
                  hackathons, and side projects that mix hardware and software,
                  and I enjoy learning through collaboration and
                  experimentation. Outside of classes, I like building
                  communities around STEM and exploring new challenges that push
                  me to think in creative and practical ways. Feel free to take
                  time to explore some of my experiences and projects in the
                  tech industry, and contact me with any opportunities or
                  questions!
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-text dark:text-text mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-secondary dark:bg-accent text-primary dark:text-background animate-scale-in hover:scale-110 transition-transform cursor-default"
                        style={{ animationDelay: `${600 + index * 100}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedCard>
          </section>
        );

      case "experience":
        return (
          <section className="space-y-6" aria-label="Work Experience">
            <h2 className="text-3xl font-bold text-text dark:text-text text-center mb-8 animate-fade-in">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <AnimatedCard
                  key={index}
                  className="bg-white/50 dark:bg-secondary/20 border-secondary dark:border-secondary backdrop-blur-sm"
                  delay={index * 200}
                  animation="slide-in-right"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-text dark:text-text">
                          {exp.title}
                        </h3>
                        <p className="text-primary dark:text-primary font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary dark:border-primary text-primary dark:text-primary"
                      >
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-text/80 dark:text-text/80">
                      {exp.description}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </section>
        );

      case "projects":
        return (
          <section className="space-y-6" aria-label="Projects Portfolio">
            <h2 className="text-3xl font-bold text-text dark:text-text text-center mb-8 animate-fade-in">
              Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <AnimatedCard
                  key={index}
                  className="bg-white/50 dark:bg-secondary/20 border-secondary dark:border-secondary backdrop-blur-sm"
                  delay={index * 150}
                  animation="bounce-in"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text dark:text-text mb-3">
                      {project.title}
                    </h3>
                    <p className="text-text/80 dark:text-text/80 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-accent dark:bg-accent text-primary dark:text-background text-xs hover:scale-110 transition-transform"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} project`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary dark:border-primary text-primary dark:text-primary hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-background bg-transparent transition-all duration-300"
                        >
                          View Project
                        </Button>
                      </a>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        aria-label={`${project.title} project link unavailable`}
                        className="border-primary/50 dark:border-primary/50 text-primary/60 dark:text-primary/60 bg-transparent cursor-not-allowed"
                      >
                        Private
                      </Button>
                    )}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </section>
        );

      case "contact":
        return (
          <section className="space-y-6" aria-label="Contact Information">
            <h2 className="text-3xl font-bold text-text dark:text-text text-center mb-8 animate-fade-in">
              Get In Touch
            </h2>
            <div className="max-w-2xl mx-auto">
              <AnimatedCard
                className="bg-white/50 dark:bg-secondary/20 border-secondary dark:border-secondary backdrop-blur-sm"
                animation="scale-in"
              >
                <div className="p-8">
                  <p
                    className="text-text/80 dark:text-text/80 text-center mb-8 animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    I&apos;m always interested in new opportunities and
                    collaborations. Feel free to reach out if you&apos;d like to
                    work together!
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        icon: Mail,
                        text: "karan.chawlad@gmail.com",
                        href: "mailto:karan.chawlad@gmail.com",
                      },

                      {
                        icon: MapPin,
                        text: "Toronto, Canada",
                        href: "https://www.utoronto.ca/",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 text-text dark:text-text animate-slide-in-left"
                        style={{ animationDelay: `${400 + index * 100}ms` }}
                      >
                        <item.icon className="w-5 h-5 text-primary dark:text-primary" />
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline decoration-primary"
                          aria-label={item.text}
                        >
                          <span>{item.text}</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4 mt-8">
                    {[
                      { Icon: Github, href: "https://github.com/karanchawlad" },
                      {
                        Icon: Linkedin,
                        href: "https://linkedin.com/in/karan-chawla-dora",
                      },
                      {
                        Icon: Instagram,
                        href: "https://www.instagram.com/_karan.chawla",
                      },
                      {
                        Icon: Twitter,
                        href: "https://x.com/KaranChawlaD"
                      }
                    ].map(({ Icon, href }, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="border-primary dark:border-primary text-primary dark:text-primary hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-background bg-transparent transition-all duration-300 hover:scale-110 animate-bounce-in"
                        style={{ animationDelay: `${700 + index * 100}ms` }}
                        asChild
                      >
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-500 bg-background">
      {/* Navigation */}
      <header>
        <nav className="sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-500 bg-background/95 border-secondary">
          <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between items-center py-2 sm:py-4">
              <div className="flex-1" />

              <div className="flex space-x-0.5 sm:space-x-1 bg-white/50 dark:bg-secondary/20 rounded-full p-0.5 sm:p-1 backdrop-blur-sm overflow-x-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveSection(item.id)}
                      aria-label={`Navigate to ${item.label} section`}
                      aria-current={activeSection === item.id ? "page" : undefined}
                      className={`rounded-full transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 whitespace-nowrap ${
                        activeSection === item.id
                          ? isDark
                            ? "bg-primary text-background hover:bg-primary/90"
                            : "bg-primary text-white hover:bg-primary/90"
                          : isDark
                          ? "text-text hover:bg-secondary"
                          : "text-text hover:bg-secondary"
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mr-2" />
                      <span className="hidden xs:inline sm:inline">
                        {item.label}
                      </span>
                    </Button>
                  );
                })}
              </div>

              <div className="flex-1 flex justify-end items-center">
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8" role="main">
        <div key={activeSection} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* WebRing - fixed bottom-right so it doesn't crowd the navbar, even on mobile */}
      <div
        className="fixed bottom-4 right-4 z-40"
        style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
      >
        <div className="flex items-center gap-2 rounded-full border border-primary bg-primary text-background px-3 py-1.5 shadow-md">
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
            className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6"
            aria-label="SKULE WebRing - University of Toronto Engineering WebRing"
          >
            <Image
              src="https://WebRing.skule.ca/img/icon.svg"
              alt="SKULE WebRing - University of Toronto Engineering WebRing"
              width={24}
              height={24}
              className="w-full h-full"
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
