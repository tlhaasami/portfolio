"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code,
  Cpu,
  Mail,
  ArrowUpRight,
  Award,
  Trophy,
  Briefcase,
  User,
  Sparkles,
  Layers,
  CheckCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

// Mock Data
const stats = [
  { value: "550+", label: "LeetCode Solved" },
  { value: "30+", label: "Projects Completed" },
  { value: "Lab Dem", label: "FAST-NUCES" },
];

const experienceList = [
  {
    role: "Lab Demonstrator",
    company: "FAST-NUCES",
    period: "2024 - Present",
    description: "Assisted professors in teaching Data Structures, OOP, and Programming Fundamentals. Managed lab sessions and graded assignments for over 100 students."
  },
  {
    role: "Software Developer Freelancer",
    company: "Upwork / Fiverr",
    period: "2022 - 2024",
    description: "Developed clean, scalable cross-platform mobile apps using Flutter and Dart. Collaborated with global clients to translate requirements into user-friendly products."
  },
];

const techStack = {
  languages: ["C++", "Dart", "JavaScript", "TypeScript", "HTML5", "CSS3", "SQL"],
  frameworks: ["Flutter", "React", "Next.js", "Tailwind CSS", "Node.js", "Express"],
  tools: ["Git", "GitHub", "VS Code", "Android Studio", "Firebase", "Postman", "Figma"]
};

const projects = [
  {
    title: "E-Commerce App",
    category: "Flutter",
    description: "A complete mobile shopping solution built with Flutter, Firebase authentication, Stripe payments, and clean state management.",
    tech: ["Flutter", "Dart", "Firebase", "Stripe"],
    link: "#"
  },
  {
    title: "Pathfinding Visualizer",
    category: "C++",
    description: "An interactive application visualising search algorithms like Dijkstra, A*, and BFS. Built with SFML for graphics.",
    tech: ["C++", "SFML", "Algorithms"],
    link: "#"
  },
  {
    title: "Developer Portfolio Portal",
    category: "React/Next.js",
    description: "A premium interactive Next.js portfolio website leveraging glassmorphism, Framer Motion transitions, and fully responsive layouts.",
    tech: ["Next.js", "Tailwind v4", "Framer Motion"],
    link: "#"
  },
  {
    title: "Task Management System",
    category: "Flutter",
    description: "Task organizer featuring offline sync, local notifications, categorization, and sleek custom dark themes.",
    tech: ["Flutter", "Hive DB", "Provider"],
    link: "#"
  }
];

const credentials = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    type: "certificate",
    date: "2025"
  },
  {
    title: "1st Place - National Coding Speed Run",
    issuer: "FAST SOFTEC",
    type: "achievement",
    date: "2024"
  },
  {
    title: "Next.js & React Frontend Specialist",
    issuer: "Vercel Academy",
    type: "certificate",
    date: "2024"
  },
  {
    title: "Global Competitive Programming Round 3",
    issuer: "LeetCode Monthly Contest",
    type: "achievement",
    date: "2024"
  },
  {
    title: "Full-Stack Web Engineering Credentials",
    issuer: "Google Developer Group",
    type: "certificate",
    date: "2023"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | "certificate" | "achievement">("all");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredCredentials = credentials.filter(
    (c) => activeTab === "all" || c.type === activeTab
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans overflow-x-hidden">
      
      {/* 1. Home / Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Dynamic Glow Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/3 dark:bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse [animation-delay:3s]" />
        
        {/* Geometric Matrix Lines background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20 pointer-events-none" />

        <div className="z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-widest font-mono mb-8 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" /> Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-none text-zinc-900 dark:text-white"
          >
            TALHA SAMI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 font-mono mb-10 max-w-2xl"
          >
            Software Engineer <span className="text-zinc-300 dark:text-zinc-700">|</span> Flutter Developer <span className="text-zinc-300 dark:text-zinc-700">|</span> UI/UX Enthusiast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-sm dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-zinc-950/10 dark:shadow-zinc-100/5 cursor-pointer"
            >
              Explore Projects
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-zinc-255/15 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 font-bold text-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-all text-center cursor-pointer shadow-sm"
            >
              Let's Connect
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. About Me Section */}
      <section id="about" className="py-32 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <span className="text-amber-500 font-mono text-sm block mb-2 tracking-widest">// 01. ABOUT ME</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">Crafting code with impact</h2>
            </div>
            
            <div className="md:col-span-8 space-y-6 text-zinc-650 dark:text-zinc-400 text-lg leading-relaxed font-normal">
              <p>
                I am a passionate software engineer focused on building clean mobile and web applications. My philosophy is that code should not only solve complex backend problems but also look premium and function flawlessly for the end user.
              </p>
              <p>
                My expertise spans modern mobile engineering in Flutter and C++ system simulations to web-based visual dashboards. I'm committed to code performance, clean state management, and robust developer testing.
              </p>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-900/30 text-center hover:border-zinc-300 dark:hover:border-zinc-850 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/60 transition-all shadow-sm">
                    <div className="text-xl md:text-3xl font-black text-zinc-900 dark:text-white font-mono mb-1">{stat.value}</div>
                    <div className="text-xs text-zinc-550 dark:text-zinc-500 tracking-wider font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Experience Section */}
      <section id="experience" className="py-32 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-amber-500 font-mono text-sm block mb-2 tracking-widest">// 02. EXPERIENCE</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Milestones & Journey</h2>
          </div>

          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 space-y-12">
            {experienceList.map((exp, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10 group">
                {/* Status Dot */}
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 group-hover:bg-amber-500 group-hover:scale-125 transition-all duration-300" />
                
                <span className="text-xs text-zinc-500 font-mono block mb-2">{exp.period}</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300">
                  {exp.role}
                </h3>
                <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">{exp.company}</h4>
                <p className="text-zinc-650 dark:text-zinc-500 text-base max-w-3xl leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tech Stack Section (Separate Full-Width Section) */}
      <section id="tech-stack" className="py-32 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 scroll-mt-28">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-amber-500 font-mono text-sm block mb-2 tracking-widest">// 03. TECH STACK</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Skill Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Languages */}
            <div className="p-6 rounded-3xl border border-zinc-200 bg-white hover:border-zinc-350 dark:border-zinc-900 dark:bg-zinc-900/20 dark:hover:border-zinc-850 dark:hover:bg-zinc-900/40 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-violet-500 dark:text-violet-400" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.languages.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100/50 text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="p-6 rounded-3xl border border-zinc-200 bg-white hover:border-zinc-350 dark:border-zinc-900 dark:bg-zinc-900/20 dark:hover:border-zinc-850 dark:hover:bg-zinc-900/40 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono">Frameworks</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.frameworks.map((frame, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100/50 text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                    {frame}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="p-6 rounded-3xl border border-zinc-200 bg-white hover:border-zinc-350 dark:border-zinc-900 dark:bg-zinc-900/20 dark:hover:border-zinc-850 dark:hover:bg-zinc-900/40 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-amber-550 dark:text-amber-400" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono">Tools & Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100/50 text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Projects Section */}
      <section id="projects" className="py-32 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-amber-500 font-mono text-sm block mb-2 tracking-widest">// 04. PROJECTS</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Selected Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl border border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold font-mono bg-zinc-100/50 text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
                      {proj.category}
                    </span>
                    <a href={proj.link} className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <h3 className="text-xl font-extrabold mb-3 text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-zinc-555 dark:text-zinc-500 text-sm leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 font-semibold px-2 py-0.5 rounded border border-zinc-150 dark:border-zinc-900">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Certifications Section */}
      <section id="certifications" className="py-32 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-amber-500 font-mono text-sm block mb-2 tracking-widest">// 05. CERTIFICATIONS</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Credentials & Trophies</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border border-zinc-200 bg-zinc-100/50 dark:border-zinc-900 dark:bg-zinc-900/30 p-1.5 rounded-full select-none max-w-fit font-mono text-xs shadow-sm">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${activeTab === "all" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
              >
                ALL
              </button>
              <button
                onClick={() => setActiveTab("certificate")}
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${activeTab === "certificate" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
              >
                CERTIFICATES
              </button>
              <button
                onClick={() => setActiveTab("achievement")}
                className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${activeTab === "achievement" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
              >
                ACHIEVEMENTS
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCredentials.map((cred, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={cred.title}
                  className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-850 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      {cred.type === "achievement" ? (
                        <Trophy className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Award className="w-5 h-5 text-violet-505 dark:text-violet-400" />
                      )}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500">
                        {cred.type}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-zinc-900 dark:text-white mb-2 leading-snug">{cred.title}</h3>
                    <p className="text-xs text-zinc-500 mb-6">{cred.issuer}</p>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 font-semibold">{cred.date}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. Contact Us Section (Separate Full-Width Section) */}
      <section id="contact" className="py-32 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10 min-h-screen flex items-center scroll-mt-28">
        <div className="max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            <div>
              <span className="text-amber-500 font-mono text-sm block mb-2 tracking-widest">// 06. CONTACT US</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">Let's build together.</h2>
              <p className="text-zinc-550 dark:text-zinc-500 text-base leading-relaxed mb-8 max-w-sm">
                Have a project idea, a collaboration proposal, or just want to chat about development frameworks? Reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                  <span className="text-sm font-semibold font-mono text-zinc-650 dark:text-zinc-400">hello@example.com</span>
                </div>
              </div>
            </div>

            {/* Glassmorphic Contact Form */}
            <div className="p-8 rounded-3xl border border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950/80 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-zinc-450 dark:text-zinc-500 font-bold mb-2">NAME</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-350 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-700 dark:focus:border-zinc-700 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-zinc-450 dark:text-zinc-500 font-bold mb-2">EMAIL</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-350 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-700 dark:focus:border-zinc-700 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-mono text-zinc-450 dark:text-zinc-500 font-bold mb-2">SUBJECT (OPTIONAL)</label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Project Proposal"
                        className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-350 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-700 dark:focus:border-zinc-700 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-mono text-zinc-450 dark:text-zinc-500 font-bold mb-2">MESSAGE</label>
                      <textarea
                        name="message"
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project details..."
                        className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-350 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-700 dark:focus:border-zinc-700 transition-all font-mono resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-955 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      Send Message
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 dark:text-emerald-400 mb-6 animate-bounce" />
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-zinc-550 dark:text-zinc-500 text-sm max-w-xs font-mono">
                      Thanks for reaching out, {formData.name}. I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-650">
          <p>© 2026 Talha Sami. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with precision <Code className="w-3.5 h-3.5" />
          </p>
        </div>
      </footer>

    </div>
  );
}
