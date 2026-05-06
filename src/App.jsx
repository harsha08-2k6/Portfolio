import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Code2, Menu, X, Terminal, Cpu, Camera, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import studyPlannerImg from './assets/study_planner.png';
import gradingSystemImg from './assets/grading_system.png';
import todoListImg from './assets/todo_list.png';
import masterpieceImg from './assets/masterpiece.png';
import projectOneImg from './assets/project1.png';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeNavTarget, setActiveNavTarget] = useState(null);

    useEffect(() => {
        // Handle scroll state
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // Dynamic Loading Counter
        const interval = setInterval(() => {
            setCounter(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 800);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15) + 2;
            });
        }, 120);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);

        if (!target) return;

        const targetId = href.replace('#', '');
        setActiveNavTarget(targetId);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        window.setTimeout(() => {
            setActiveNavTarget(null);
        }, 1100);
    };

    const sectionFocusMotion = (id) => (
        activeNavTarget === id
            ? { opacity: [0.75, 1], y: [22, 0], scale: [0.985, 1] }
            : {}
    );

    const projects = [
        {
            title: 'Study Planner',
            tech: ['React', 'Python', 'CSS'],
            skills: ['Dashboard UI', 'Task Planning', 'Progress Tracking', 'Responsive Design'],
            status: 'Completed',
            type: 'Productivity App',
            desc: 'A productivity dashboard for students to plan schedules, track tasks, and monitor study progress in one place.',
            highlights: ['Calendar-based study planning', 'Progress and task tracking', 'Responsive dashboard UI'],
            github: 'https://github.com/harsha08-2k6/Study-Planner.git',
            demo: 'https://harsha08-2k6.github.io/Study-Planner/',
            img: studyPlannerImg
        },
        {
            title: 'Online Grading System',
            tech: ['React.js', 'Supabase', 'CSS'],
            skills: ['Full Stack', 'Database Design', 'Analytics UI', 'Auth-ready Flow'],
            status: 'Full Stack',
            type: 'Academic Platform',
            desc: 'A secure grading platform for managing student records, assignments, grade analytics, and performance reports.',
            highlights: ['Student grade management', 'Analytics and performance charts', 'Supabase-backed data flow'],
            github: 'https://github.com/harsha08-2k6/fsad-project.git',
            demo: 'https://harsha08-2k6.github.io/fsad-project/',
            img: gradingSystemImg
        },
        {
            title: 'To-do List',
            tech: ['JavaScript', 'CSS'],
            skills: ['DOM Logic', 'Task UX', 'Local Workflow', 'Clean UI'],
            status: 'MVP',
            type: 'Task Manager',
            desc: 'A lightweight task manager with priority labels, completion tracking, and a clean responsive interface.',
            highlights: ['Fast daily task capture', 'Completion-focused workflow', 'Minimal responsive layout'],
            github: 'https://github.com/harsha08-2k6/To-Do-List.git',
            demo: 'https://harsha08-2k6.github.io/To-Do-List/',
            img: todoListImg
        },
        {
            title: 'AutoOps',
            tech: ['React', 'Node.js', 'Docker'],
            skills: ['DevOps Automation', 'Container Management', 'System Monitoring', 'REST APIs'],
            status: 'Open Source',
            type: 'DevOps Platform',
            desc: 'A DevOps automation platform for managing containers, monitoring system performance, and automating operational workflows from one dashboard.',
            highlights: ['Docker container monitoring', 'CPU and memory metrics', 'Automation workflows and logs'],
            github: 'https://github.com/harsha08-2k6/AutoOps.git',
            demo: 'https://github.com/harsha08-2k6/AutoOps',
            img: projectOneImg
        }
    ];

    // Animation Variants
    const curtainVariant = {
        initial: { y: 0 },
        exit: (i) => ({
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
                delay: i * 0.1
            }
        })
    };

    return (
        <div className="bg-[#0f172a] text-slate-200 min-h-screen font-['Inter'] snap-y snap-mandatory overflow-y-scroll h-screen">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[100] flex flex-col pointer-events-none"
                    >
                        {/* Background Panels */}
                        <div className="absolute inset-0 flex">
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    variants={curtainVariant}
                                    custom={i}
                                    initial="initial"
                                    exit="exit"
                                    className="flex-1 bg-[#0f172a] relative border-r border-white/5"
                                >
                                    {i === 3 && (
                                        <div className="absolute inset-0 bg-gradient-to-l from-sky-500/5 to-transparent" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Loader Content */}
                        <div className="relative z-[110] flex-1 flex flex-col items-center justify-center pointer-events-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative mb-12">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="w-32 h-32 rounded-full border border-sky-500/20 border-t-sky-500 border-r-sky-500/30"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center font-['Outfit'] font-bold text-3xl tracking-tighter">
                                        SHVR<span className="text-sky-400">.</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <motion.div className="text-7xl font-['Outfit'] font-black tracking-tighter text-white/10 relative">
                                        {counter}%
                                        <motion.div
                                            className="absolute inset-0 text-sky-500 overflow-hidden"
                                            style={{ width: `${counter}%` }}
                                        >
                                            {counter}%
                                        </motion.div>
                                    </motion.div>

                                    <div className="flex items-center gap-3 overflow-hidden h-6">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={counter < 30 ? "init" : counter < 60 ? "craft" : counter < 90 ? "compile" : "ready"}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[10px] uppercase tracking-[0.5em] text-slate-500 ml-2"
                                            >
                                                {counter < 30 && "Initializing System"}
                                                {counter >= 30 && counter < 60 && "Crafting Experience"}
                                                {counter >= 60 && counter < 90 && "Compiling Portfolio"}
                                                {counter >= 90 && "Ready to Launch"}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center border-b border-white/10 bg-[#0f172a]/95 px-6 py-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl pointer-events-none">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={!isLoading ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className={`max-w-5xl w-full flex justify-between items-center px-8 py-3 rounded-2xl transition-all duration-500 border pointer-events-auto ${scrolled ? 'bg-white/[0.08] border-white/15 shadow-lg shadow-sky-950/20' : 'bg-white/[0.03] border-white/10'}`}
                >
                    <div className="text-2xl font-bold font-['Outfit'] tracking-tighter text-white">
                        SHVR<span className="text-sky-400">.</span>
                    </div>

                    <div className="hidden md:flex gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm font-semibold text-slate-400 hover:text-white transition-all uppercase tracking-widest relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-slate-200 pointer-events-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                        <a href="#contact" className="hidden md:block bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-sky-500/20 uppercase tracking-[0.2em] pointer-events-auto">
                            Hire Me
                        </a>
                    </div>
                </motion.div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-24 left-6 right-6 bg-[#0f172a]/[0.98] backdrop-blur-2xl rounded-3xl border border-white/10 p-8 md:hidden pointer-events-auto shadow-2xl overflow-hidden"
                        >
                            <div className="flex flex-col gap-6 text-center">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            handleNavClick(e, link.href);
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-lg font-bold text-slate-300 hover:text-sky-400 py-2 border-b border-white/5 transition-all"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    className="bg-sky-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-500/20 mt-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center px-6 relative overflow-hidden snap-start justify-center">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full py-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-['Outfit'] mb-6 leading-tight">
                            Hi, I'm <br />
                            <span className="text-white bg-gradient-to-r from-sky-400 to-white bg-clip-text text-transparent inline-block py-2">
                                Siva Harsha Vardhan Reddy
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg">
                            Full Stack Developer | Prompt Engineer | Video Editor | Open Source Contributor
                        </p>
                        <div className="flex gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#projects"
                                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-sky-500/20"
                            >
                                View Projects
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="border border-slate-700 text-white hover:bg-slate-800 px-8 py-3 rounded-lg font-bold transition-all"
                            >
                                Contact Me
                            </motion.a>
                        </div>
                    </motion.div>

                    <div className="relative h-[400px] w-full [perspective:1000px] group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={!isLoading ? {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                rotateY: isFlipped ? 180 : 0
                            } : { opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                                duration: 0.8,
                                delay: isLoading ? 1.2 : 0,
                                ease: [0.33, 1, 0.68, 1],
                                rotateY: { duration: 0.6 }
                            }}
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer"
                        >
                            {/* Front: Code Window */}
                            <div className="absolute inset-0 [backface-visibility:hidden]">
                                <div className="code-window glass rounded-2xl h-full overflow-hidden shadow-2xl border border-white/10 group-hover:border-sky-500/30 transition-colors">
                                    <div className="code-header bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                            <span className="ml-4 text-xs text-slate-500 font-mono">developer.js</span>
                                        </div>
                                        <div className="text-[10px] text-sky-500/50 font-mono uppercase tracking-widest animate-pulse">Click to flip</div>
                                    </div>
                                    <div className="code-content p-8 font-mono text-sm leading-relaxed">
                                        <div><span className="text-pink-400">const</span> <span className="text-sky-300">developer</span> <span className="text-pink-400">=</span> {'{'}</div>
                                        <div className="pl-6"><span className="text-sky-300">name</span>: <span className="text-yellow-200">'Siva Harsha Vardhan Reddy'</span>,</div>
                                        <div className="pl-6"><span className="text-sky-300">role</span>: <span className="text-yellow-200">'Full Stack Developer'</span>,</div>
                                        <div className="pl-6"><span className="text-sky-300">skills</span>: [<span className="text-yellow-200">'Editing'</span>, <span className="text-yellow-200">'Prompting'</span>],</div>
                                        <div className="pl-6"><span className="text-sky-300">creative</span>: <span className="text-pink-400">true</span>,</div>
                                        <div className="pl-6"><span className="text-sky-300">aiReady</span>: <span className="text-pink-400">true</span>,</div>
                                        <div className="pl-6"><span className="text-sky-300">hireMe</span>: () <span className="text-pink-400">=&gt;</span> {'{'}</div>
                                        <div className="pl-12"><span className="text-pink-400">return</span> <span className="text-yellow-200">'Let\'s innovate together!'</span>;</div>
                                        <div className="pl-6">{'}'}</div>
                                        <div>{'}'};</div>
                                    </div>
                                </div>
                            </div>

                            {/* Back: Creative Dashboard */}
                            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <div className="glass rounded-2xl h-full overflow-hidden shadow-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-[#0f172a]">
                                    <div className="code-header bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                                        <span className="text-xs text-sky-400 font-mono flex items-center gap-2">
                                            <Cpu size={14} /> creator_engine.v1
                                        </span>
                                        <div className="flex gap-2 items-center">
                                            <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></div>
                                            <span className="text-[10px] text-slate-500 font-mono">LIVE PREVIEW</span>
                                        </div>
                                    </div>

                                    <div className="p-6 grid grid-cols-2 gap-4 h-[calc(100%-60px)] relative">
                                        {/* Left Side: Creative Workflow */}
                                        <div className="space-y-3 relative z-10 flex flex-col justify-center">
                                            {/* Studio Monitor / Viewfinder */}
                                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl group/monitor">
                                                <img src={masterpieceImg} className="w-full h-full object-cover grayscale-[0.3] group-hover/monitor:grayscale-0 transition-all duration-700" alt="Masterpiece" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                                {/* Camera HUD Overlay */}
                                                <div className="absolute inset-2 border border-white/20 rounded-sm pointer-events-none">
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sky-400"></div>
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sky-400"></div>
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sky-400"></div>
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sky-400"></div>
                                                </div>

                                                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                                    <span className="text-[8px] font-mono text-white/80 tracking-widest uppercase">REC &bull; 4K LOG &bull; 24FPS</span>
                                                </div>

                                                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                                    <div className="text-[8px] font-mono text-white/60 leading-none space-y-1">
                                                        <div>ISO 800 &bull; 5600K</div>
                                                        <div>f/2.8 &nbsp; 1/48</div>
                                                    </div>
                                                    <div className="flex gap-1 h-3 items-end">
                                                        {[...Array(6)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                animate={{ height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 80 + 20}%`] }}
                                                                transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                                                                className={`w-0.5 rounded-full ${i > 4 ? 'bg-red-400' : i > 3 ? 'bg-yellow-400' : 'bg-emerald-400'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Scanning Line */}
                                                <motion.div
                                                    animate={{ top: ["0%", "100%", "0%"] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-x-0 h-[1px] bg-sky-400/30 shadow-[0_0_8px_#38bdf8] z-10"
                                                />
                                            </div>

                                            {/* Creative DNA Stats */}
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                                    <div className="text-[8px] text-sky-400/60 mb-1 uppercase tracking-widest">Color Space</div>
                                                    <div className="text-sm font-black text-white px-0.5">DCI-P3</div>
                                                </div>
                                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                                    <div className="text-[8px] text-indigo-400/60 mb-1 uppercase tracking-widest">Processing</div>
                                                    <div className="text-sm font-black text-white px-0.5">32-Bit Float</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: The Editor with Laptop */}
                                        <div className="flex flex-col justify-center items-center relative z-10">
                                            <div className="relative w-44 h-44 flex items-center justify-center scale-100">
                                                {/* Circular HUD Elements */}
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-0 border border-sky-400/20 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ rotate: -360 }}
                                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-4 border border-dashed border-indigo-400/30 rounded-full"
                                                />

                                                {/* The Workspace */}
                                                <div className="relative flex flex-col items-center">
                                                    {/* Glow behind character */}
                                                    <div className="absolute w-32 h-32 bg-sky-500/10 blur-3xl rounded-full -z-10" />

                                                    {/* Laptop & Man Setup */}
                                                    <div className="relative flex flex-col items-center pt-8">
                                                        {/* Stylized Man leaning in */}
                                                        <div className="relative flex flex-col items-center mb-[-12px] z-20">
                                                            <div className="w-4 h-4 rounded-full bg-slate-800 border border-white/10" />
                                                            <motion.div
                                                                animate={{ rotateX: [0, 5, 0] }}
                                                                transition={{ duration: 4, repeat: Infinity }}
                                                                className="w-10 h-8 bg-slate-800 rounded-t-xl border border-white/10 mt-[-2px] origin-bottom"
                                                            />
                                                        </div>

                                                        {/* The Laptop */}
                                                        <div className="relative flex flex-col items-center">
                                                            {/* Laptop Lid / Screen */}
                                                            <motion.div
                                                                animate={{ rotateX: [0, -2, 0] }}
                                                                transition={{ duration: 3, repeat: Infinity }}
                                                                className="w-24 h-16 bg-[#1a202c] border border-white/20 rounded-md relative shadow-2xl overflow-hidden [transform-style:preserve-3d]"
                                                            >
                                                                {/* Editing Setup on Screen */}
                                                                <div className="absolute inset-1 bg-black/40 rounded-[2px] overflow-hidden flex flex-col gap-0.5 p-1">
                                                                    {/* Editor Top Bar */}
                                                                    <div className="flex justify-between items-center h-1.5 px-0.5">
                                                                        <div className="flex gap-0.5">
                                                                            <div className="w-1 h-1 rounded-full bg-red-400"></div>
                                                                            <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                                                                        </div>
                                                                        <div className="w-6 h-0.5 bg-sky-400/40 rounded-full"></div>
                                                                    </div>
                                                                    {/* Main Workspace Area */}
                                                                    <div className="flex-1 flex gap-0.5">
                                                                        {/* Left Panel: Layers */}
                                                                        <div className="w-4 flex flex-col gap-0.5">
                                                                            {[...Array(4)].map((_, i) => (
                                                                                <div key={i} className="h-1.5 bg-white/5 rounded-sm" />
                                                                            ))}
                                                                        </div>
                                                                        {/* Central Preview */}
                                                                        <div className="flex-1 bg-white/5 rounded-sm relative overflow-hidden">
                                                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                                                                            <motion.div
                                                                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                                                                transition={{ duration: 2, repeat: Infinity }}
                                                                                className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-sky-400/50 flex items-center justify-center p-[2px]"
                                                                            >
                                                                                <div className="w-full h-full bg-sky-400 rounded-full" />
                                                                            </motion.div>
                                                                        </div>
                                                                        {/* Right Panel: Effects */}
                                                                        <div className="w-4 flex flex-col items-center gap-0.5">
                                                                            <div className="w-2.5 h-2.5 rounded-full border border-white/10 flex items-center justify-center">
                                                                                <div className="w-1 h-1 bg-yellow-400/60 rounded-full" />
                                                                            </div>
                                                                            <div className="w-full h-1 bg-white/5 rounded-sm" />
                                                                            <div className="w-full h-1 bg-white/5 rounded-sm" />
                                                                        </div>
                                                                    </div>
                                                                    {/* Timeline Bottom Bar */}
                                                                    <div className="h-3 flex flex-col gap-0.5 pt-0.5">
                                                                        <div className="flex-1 bg-white/10 relative rounded-sm overflow-hidden">
                                                                            <motion.div
                                                                                animate={{ x: ["-100%", "200%"] }}
                                                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                                                className="absolute inset-y-0 w-0.5 bg-sky-400 z-10 shadow-[0_0_5px_#38bdf8]"
                                                                            />
                                                                            <div className="absolute inset-0 flex gap-[1px]">
                                                                                <div className="w-1/3 h-full bg-sky-500/20" />
                                                                                <div className="w-1/4 h-full bg-indigo-500/20" />
                                                                                <div className="w-1/2 h-full bg-pink-500/20" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                            {/* Laptop Base */}
                                                            <div className="w-28 h-1.5 bg-slate-700/80 rounded-b-sm relative">
                                                                <div className="absolute top-0 inset-x-0 h-[1px] bg-white/10" />
                                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-white/5" />
                                                            </div>
                                                        </div>

                                                        {/* Floating Studio Gear */}
                                                        <motion.div
                                                            animate={{ y: [0, -3, 0], rotate: [5, -5, 5] }}
                                                            transition={{ duration: 4, repeat: Infinity }}
                                                            className="absolute top-4 -right-12 bg-slate-900/60 backdrop-blur-sm p-1.5 rounded-lg border border-sky-500/20 shadow-xl"
                                                        >
                                                            <Camera size={18} className="text-sky-400/80" />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center mt-2">
                                                <div className="text-sm font-bold text-white tracking-[0.2em] uppercase font-['Outfit']">Video Editor</div>
                                                <div className="flex items-center gap-1.5 justify-center mt-1">
                                                    <motion.span
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                        className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9]"
                                                    />
                                                    <div className="text-[8px] text-sky-500/70 font-mono tracking-widest uppercase">DaVinci Resolve Pipeline</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* About Section */}
            < section id="about" className="min-h-screen flex items-start px-6 pb-14 pt-32 bg-[#111a2e] snap-start justify-center overflow-hidden" >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={sectionFocusMotion('about')}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto w-full"
                >
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div className="flex flex-col items-start">
                            <span className="mb-4 inline-flex rounded-full border border-sky-300/15 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-200">
                                Computer Science Student
                            </span>
                            <h2 className="text-4xl font-bold font-['Outfit'] relative inline-block">
                                About Me
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-sky-400"></div>
                            </h2>
                        </div>
                        <div className="text-sm font-semibold text-slate-400 md:pb-2">
                            K L University / Frontend / DevOps
                        </div>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/10">
                            <h3 className="mb-4 text-2xl font-bold text-white">Building practical web products with clean UI and reliable logic.</h3>
                            <div className="space-y-4 text-sm leading-7 text-slate-400">
                                <p>I am Harsha, a Computer Science student focused on frontend development, full-stack fundamentals, and DevOps-oriented project work.</p>
                                <p>I work with React, JavaScript, CSS, Node.js, Python, Supabase, and Docker concepts to build dashboards, productivity tools, grading systems, and automation platforms.</p>
                            </div>
                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                {[
                                    { label: 'Focus', value: 'React Interfaces' },
                                    { label: 'Learning', value: 'DSA + DevOps' },
                                    { label: 'Style', value: 'Clean & Minimal' }
                                ].map(item => (
                                    <div key={item.label} className="rounded-xl border border-white/10 bg-slate-950/25 p-4">
                                        <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">{item.label}</div>
                                        <div className="text-sm font-semibold text-slate-200">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {['React', 'JavaScript', 'Node.js', 'Python', 'Supabase', 'Docker', 'Open Source'].map(skill => (
                                    <span key={skill} className="rounded-lg border border-sky-300/10 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Projects', val: '10+' },
                                { label: 'CGPA', val: '9.3' },
                                { label: 'Contributions', val: '130+' },
                                { label: 'Certificates', val: '10+' }
                            ].map(stat => (
                                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30">
                                    <div className="mb-2 text-3xl font-bold text-sky-400">{stat.val}</div>
                                    <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section >

            {/* Projects */}
            < section id="projects" className="min-h-screen flex items-start px-6 pb-20 pt-32 snap-start justify-center" >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={sectionFocusMotion('projects')}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-4xl font-bold font-['Outfit'] relative inline-block">
                                Featured Projects
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-sky-400"></div>
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-sky-300/15 bg-sky-400/10 px-5 py-3 text-sm font-semibold text-sky-200">
                            {projects.length} Projects
                        </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {projects.map((p, i) => (
                            <motion.div
                                key={i}
                                role="button"
                                tabIndex={0}
                                onClick={() => setSelectedProject(p)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setSelectedProject(p);
                                    }
                                }}
                                whileHover={{ y: -8 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#1e293b]/35 shadow-xl shadow-black/10 outline-none transition-colors duration-300 group hover:border-sky-400/60 hover:bg-[#1e293b]/60 hover:shadow-sky-500/10 focus-visible:border-sky-300"
                            >
                                <div className="h-36 overflow-hidden relative bg-slate-900">
                                    <img src={p.img} alt={p.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/5 to-transparent"></div>
                                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-sky-300/30 bg-slate-950/75 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md">
                                        <CheckCircle2 size={13} /> {p.status}
                                    </span>
                                    <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-widest text-sky-200">
                                        {p.type}
                                    </span>
                                </div>
                                <div className="flex min-h-[210px] flex-col p-5">
                                    <h3 className="mb-3 text-lg font-bold text-white">{p.title}</h3>
                                    <p className="mb-4 h-12 overflow-hidden text-sm leading-6 text-slate-400">{p.desc}</p>
                                    <div className="mb-5 flex flex-wrap gap-2">
                                        {p.tech.slice(0, 3).map(t => <span key={t} className="rounded-md border border-sky-300/10 bg-sky-400/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-sky-200">{t}</span>)}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                                        <span className="text-xs font-semibold text-slate-400">{p.skills[0]}</span>
                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-400 text-slate-950 transition-transform group-hover:translate-x-1">
                                            <ArrowUpRight size={18} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section >

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-slate-950/80 px-6 py-10 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.96 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#111c31] shadow-2xl shadow-black/30"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                aria-label="Close project details"
                                onClick={() => setSelectedProject(null)}
                                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-slate-950/70 p-2 text-slate-300 backdrop-blur-md transition-colors hover:border-sky-400/50 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                            <div className="grid lg:grid-cols-[1.05fr_1fr]">
                                <div className="relative min-h-[260px] bg-slate-950">
                                    <img src={selectedProject.img} alt={selectedProject.title} className="h-full min-h-[260px] w-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-slate-950/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-200 backdrop-blur-md">
                                            <Layers size={14} /> {selectedProject.type}
                                        </span>
                                        <h3 className="font-['Outfit'] text-3xl font-bold text-white md:text-4xl">{selectedProject.title}</h3>
                                    </div>
                                </div>
                                <div className="p-7 md:p-8">
                                    <div className="mb-5 flex flex-wrap items-center gap-3 pr-10">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-200">
                                            <CheckCircle2 size={14} /> {selectedProject.status}
                                        </span>
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="rounded bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-widest text-slate-300">{t}</span>
                                        ))}
                                    </div>
                                    <p className="mb-6 leading-7 text-slate-300">{selectedProject.desc}</p>

                                    <div className="mb-6">
                                        <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-500">Skills Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.skills.map(skill => (
                                                <span key={skill} className="rounded-lg border border-emerald-300/10 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                        {selectedProject.highlights.map(item => (
                                            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-300">
                                            <ExternalLink size={16} /> View Project
                                        </a>
                                        <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-sky-300 transition-colors hover:border-sky-400/50 hover:bg-sky-400/10">
                                            <Github size={16} /> GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Skills Section */}
            < section id="skills" className="min-h-screen flex items-start px-6 pb-16 pt-32 bg-[#0f172a] snap-start justify-center" >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={sectionFocusMotion('skills')}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto w-full"
                >
                    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-4xl font-bold font-['Outfit'] relative inline-block text-white">
                                Technical Skills
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-sky-400"></div>
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300">
                            React / Node / Docker / UI/UX
                        </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-4">
                        {[
                            {
                                title: 'Frontend Engineering',
                                icon: <Code2 size={22} />,
                                accent: 'text-sky-300',
                                desc: 'Building responsive, accessible interfaces with strong layout discipline and smooth interactions.',
                                tools: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
                                strengths: ['Component UI', 'Responsive Layouts', 'Framer Motion']
                            },
                            {
                                title: 'Backend & APIs',
                                icon: <Terminal size={22} />,
                                accent: 'text-emerald-300',
                                desc: 'Designing API-driven features, database-backed flows, and clean server-side logic.',
                                tools: ['Node.js', 'Express', 'Python', 'SQL', 'Supabase'],
                                strengths: ['REST APIs', 'Database Logic', 'Auth-ready Flows']
                            },
                            {
                                title: 'DevOps Foundations',
                                icon: <Cpu size={22} />,
                                accent: 'text-indigo-300',
                                desc: 'Working with automation, containers, monitoring concepts, and deployment-focused workflows.',
                                tools: ['Docker', 'Git', 'GitHub', 'Vite', 'Linux'],
                                strengths: ['Container Basics', 'Automation', 'Monitoring']
                            },
                            {
                                title: 'Creative Systems',
                                icon: <Camera size={22} />,
                                accent: 'text-rose-300',
                                desc: 'Creating visual content and presentation systems that make technical work easier to understand.',
                                tools: ['Video Editing', 'Photography', 'Storytelling', 'Branding'],
                                strengths: ['Visual Polish', 'Content Flow', 'Creative Direction']
                            }
                        ].map((group) => (
                            <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/[0.06]">
                                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/40 ${group.accent}`}>
                                    {group.icon}
                                </div>
                                <h3 className="mb-3 text-lg font-bold text-white">{group.title}</h3>
                                <p className="mb-5 min-h-[72px] text-sm leading-6 text-slate-400">{group.desc}</p>
                                <div className="mb-5 flex flex-wrap gap-2">
                                    {group.tools.map(tool => (
                                        <span key={tool} className="rounded-md border border-white/10 bg-slate-950/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                                <div className="space-y-2 border-t border-white/10 pt-4">
                                    {group.strengths.map(strength => (
                                        <div key={strength} className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                                            {strength}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section >

            {/* Contact */}
            < section id="contact" className="min-h-screen flex items-start px-6 pb-16 pt-32 bg-[#111a2e] snap-start justify-start flex-col" >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={sectionFocusMotion('contact')}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto w-full"
                >
                    <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-end">
                        <div>
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-200">
                                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                                Available for opportunities
                            </span>
                            <h2 className="text-4xl font-bold font-['Outfit'] mb-4">Let's Build Something Useful</h2>
                            <p className="max-w-2xl text-sm leading-6 text-slate-400">
                                I am open to internships, open-source collaboration, frontend roles, and practical full-stack projects where clean UI and reliable engineering both matter.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                { label: 'Best Fit', value: 'Frontend / Full Stack' },
                                { label: 'Response', value: 'Usually within 24h' },
                                { label: 'Focus', value: 'React, APIs, DevOps' },
                                { label: 'Location', value: 'India / Remote' }
                            ].map(item => (
                                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">{item.label}</div>
                                    <div className="text-sm font-semibold text-slate-200">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 px-0 md:grid-cols-3">
                        {/* Email Card */}
                        <a href="mailto:tsivaharshavardhanreddy08@gmail.com"
                            className="group p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-500 flex flex-col items-start text-left shadow-xl shadow-black/10">
                            <div className="mb-8 flex w-full items-center justify-between">
                                <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                                    <Mail size={28} />
                                </div>
                                <ArrowUpRight className="text-slate-500 transition-colors group-hover:text-sky-300" size={20} />
                            </div>
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold mb-3">Primary Contact</span>
                            <span className="mb-2 text-slate-200 font-semibold text-lg">Email Me</span>
                            <span className="text-sm text-slate-400 break-all">tsivaharshavardhanreddy08@gmail.com</span>
                        </a>

                        {/* LinkedIn Card */}
                        <a href="https://linkedin.com/in/siva-harsha-vardhan-reddy" target="_blank" rel="noreferrer"
                            className="group p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-500 flex flex-col items-start text-left shadow-xl shadow-black/10">
                            <div className="mb-8 flex w-full items-center justify-between">
                                <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                                    <Linkedin size={28} />
                                </div>
                                <ArrowUpRight className="text-slate-500 transition-colors group-hover:text-sky-300" size={20} />
                            </div>
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold mb-3">Professional Network</span>
                            <span className="mb-2 text-slate-200 font-semibold text-lg">LinkedIn Profile</span>
                            <span className="text-sm text-slate-400">Connect for roles, collaborations, and updates.</span>
                        </a>

                        {/* GitHub Card */}
                        <a href="https://github.com/harsha08-2k6" target="_blank" rel="noreferrer"
                            className="group p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-500 flex flex-col items-start text-left shadow-xl shadow-black/10">
                            <div className="mb-8 flex w-full items-center justify-between">
                                <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                                    <Github size={28} />
                                </div>
                                <ArrowUpRight className="text-slate-500 transition-colors group-hover:text-sky-300" size={20} />
                            </div>
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold mb-3">Open Source</span>
                            <span className="mb-2 text-slate-200 font-semibold text-lg">GitHub Projects</span>
                            <span className="text-sm text-slate-400">View repositories, experiments, and project progress.</span>
                        </a>
                    </div>

                    <div className="mt-5 rounded-2xl border border-sky-300/15 bg-sky-400/10 p-5 text-sm leading-6 text-sky-100">
                        Looking for a focused contributor who can design clean screens, build React interfaces, connect APIs, and document work clearly.
                    </div>
                </motion.div>
            </section >

            <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
                <p>&copy; 2024 Siva Harsha Vardhan Reddy. Built with React & Framer Motion.</p>
            </footer>
        </div >
    );
};

export default App;
