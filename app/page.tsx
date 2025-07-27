"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedCard } from "@/components/animated-card";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  User,
  Briefcase,
  Code,
  MessageCircle,
} from "lucide-react";

export default function PersonalWebsite() {
  const [activeSection, setActiveSection] = useState("about");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
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

  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Java",
    "Python",
    "C++",
    "Arduino",
    "Tailwind CSS",
    "Flask",
    "HTML/CSS/JS",
    "CAD",
    "WPILib",
    "Matplotlib",
  ];

  const projects = [
    {
      title: "LipsLipsRevolution",
      description:
        "2x prize-winning project at HacktheNorth 2024. A hackathon-wide lip-syncing challenge.",
      tech: ["Next.js", "MongoDB", "Symponic API"],
      link: "https://devpost.com/software/lipslips-revolution",
    },
    {
      title: "ConvoAI",
      description:
        "ConvoAI is an AI natural language processing tool that listens in on interviews to give you an edge over your competitors.",
      tech: ["Flask", "HTML/CSS/JS", "OpenAI API"],
      link: "https://dorahacks.io/buidl/13383",
    },
    {
      title: "FRC Code 2022-2025",
      description:
        "2x Provincial Finalists as Software Lead. Code organization for team 8729's FRC Robots.",
      tech: ["Java", "Control Theory", "WPILib"],
      link: "https://github.com/Spark-Youth-Robotics-Club-8729",
    },
  ];

  const experience = [
    {
      title: "Team Captain (Prev. Software Lead)",
      company: "FIRST Robotics Competition",
      period: "2021 - 2025",
      description:
        "Lead a team of 90+ high school students to compete at a provincial level. Expanded the organization to create robotics teams for elementary students. Qualified for World Championships 2023 and Finalists at Provincial Championship twice.",
    },
    {
      title: "Robotics Research Lab Assistant",
      company: "University of Ottawa",
      period: "2024",
      description:
        "Assisted Bruce Lab and the Canadian Robotics and Artificial Intelligence Ethics Design Lab (CRAiEDL). Developed a user interface to conduct nickel electrodeposition for Fuel Cell Electric Vehicles (FCEV). Characterized DJI's Robomaster S1 to simulate the negative effects of a lethal autonomous weapon system.",
    },
    {
      title: "YIPI Student",
      company: "Youth in Police Initiative",
      period: "2023 - 2024",
      description:
        "Represented the Ottawa Police’s Youth Team. Volunteered at a local Boys and Girls Club 4 hours/week.  Participated in Ottawa Police workshops and lectures. Worked in the community to support and represent the Ottawa Police’s commitment.",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-secondary dark:bg-secondary flex items-center justify-center animate-bounce-in animate-float">
                <img
                  src="/profile.png?height=128&width=128"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
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
                  Incoming Engineering Science @ UofT
                </p>
              </div>
            </div>

            <AnimatedCard
              className="bg-white/50 dark:bg-secondary/20 border-secondary dark:border-secondary backdrop-blur-sm"
              delay={400}
              animation="slide-in-left"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-text dark:text-text mb-4">
                  About Me
                </h2>
                <p className="text-text/80 dark:text-text/80 leading-relaxed mb-6">
                  Hey! I&apos;m Karan, an incoming Engineering Science student at the University of Toronto.
                  I&apos;m highly passionate about robots as an FRC Alumni! In my free time,
                  you&apos;ll find me at the gym getting a workout or working on various robots.
                  Feel free to take time to explore some of my experiences and projects in the tech industry,
                  and contact me with any opportunities or questions!
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
              </div>
            </AnimatedCard>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-6">
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
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
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
                    <a href={project.link} target="blank">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary dark:border-primary text-primary dark:text-primary hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-background bg-transparent transition-all duration-300"
                      >
                        View Project
                      </Button>
                    </a>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
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
                    collaborations. Feel free to reach out if you&apos;d like to work
                    together!
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: Mail, text: "karan.chawlad@gmail.com" },

                      { icon: MapPin, text: "Toronto, Canada" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 text-text dark:text-text animate-slide-in-left"
                        style={{ animationDelay: `${400 + index * 100}ms` }}
                      >
                        <item.icon className="w-5 h-5 text-primary dark:text-primary" />
                        <span>{item.text}</span>
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
          </div>
        );

      default:
        return null;
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-background" : "bg-background"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-500 ${
          isDark
            ? "bg-background/95 border-secondary"
            : "bg-background/95 border-secondary"
        }`}
      >
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

            <div className="flex-1 flex justify-end">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div key={activeSection} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
