import { PersonalWebsiteClient } from "./personal-website-client";

// Static data - moved to server component for better performance
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
    "HTML/CSS",
    "CAD",
    "WPILib",
    "Matplotlib",
    "SQL",
    "Express.js",
    "FastAPI",
    "Git",
    "MATLAB",
    "pandas",
    "NumPy"
  ];

const projects = [
    {
      title: "Echo — Agentic Voice AI to Get Help",
      description:
        "End-to-end full-stack app to automate outbound phone communications using autonomous voice agents. Integrated Twilio + VAPI for real-time audio streaming, transcription, and LLM-based decision-making during active calls.",
      tech: ["React", "Express.js", "VAPI", "Twilio"],
      link: "https://github.com/KaranChawlaD/Echo",
    },
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
      title: "State Estimation Developer (C++/Python)",
      company: "SAE AutoDrive- Toronto Autonomous Vehicle Team",
      period: "Sep. 2025– Present",
      description:
        "Developing a lane localization and state rollback algorithm in C++. Implementing ROS-based code to create sensor queues and simulation analysis. Collaborating via Git and Agile methodologies to integrate estimation modules into the vehicle's real-time control stack.",
    },
    {
      title: "Frontend Developer",
      company: "UofTHacks",
      period: "Oct. 2025– Present",
      description:
        "Architecting high-traffic frontend interfaces using React and Next.js to support 3,000+ concurrent users during the 2026 registration cycle. Engineered an automated support chatbot on Hacker Dashboard.",
    },
    {
      title: "FIRST Robotics Competition — Robotics Team Captain & Software Lead",
      company: "FIRST Robotics Competition",
      period: "2021 - 2025",
      description:
        "I led a community highschool robotics team, where I guided a group of students through the process of designing, building, and programming competition robots. My focus was on software, where I worked on both autonomous and teleoperated systems, experimenting with techniques like computer vision and control theory. Beyond the technical side, this role taught me how to lead a large team, mentor younger students, and balance strategy with collaboration. Helped expand the organization to create robotics teams for elementary students. Qualified for World Championships 2023 and Finalists at Provincial Championship twice.",
    },
    {
      title: "Bruce Lab — Software Lab Assistant",
      company: "University of Ottawa",
      period: "2024",
      description:
        "During my time at Bruce Lab, I worked on applying control systems and creating a GUI with the purpose of advancing fuel cell research in hydrogen production for Fuel Cell Electric Vehicles. I combined programming with hands-on hardware work, building tools that made experiments more efficient and reliable. The experience gave me a chance to bridge theory with application while working closely with researchers in an academic environment.",
    },
    {
      title: "Canadian Robotics & AI Ethics Design Lab — Research Assistant",
      company: "University of Ottawa",
      period: "2024",
      description:
        "At CRAIEDL, I supported research on robotics and AI focused on the negative effects of Lethal Autonomous Weapon Systems by modeling DJI's robotic systems in simulation and experimenting with computer vision. I enjoyed the opportunity to work in a setting where technical problem-solving connected directly with bigger questions about ethics and responsibility in emerging technologies. The experience gave me a new perspective on how engineering choices can shape the way technology is used in society.",
    },
  ];

export default function PersonalWebsite() {
  return (
    <PersonalWebsiteClient
      skills={skills}
      projects={projects}
      experience={experience}
    />
  );
}
