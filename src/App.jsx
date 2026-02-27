import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Code2, Menu, X, Terminal, Cpu, Camera } from 'lucide-react';
import studyPlannerImg from './assets/study_planner.png';
import gradingSystemImg from './assets/grading_system.png';
import todoListImg from './assets/todo_list.png';
import masterpieceImg from './assets/masterpiece.png';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

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

    const projects = [
        {
            title: 'Study Planner',
            tech: ['React', 'Python', 'CSS'],
            desc: 'A comprehensive personal study planning and productivity application designed to help students manage their schedules.',
            github: 'https://github.com/harsha08-2k6/Study-Planner.git',
            img: studyPlannerImg
        },
        {
            title: 'Online Grading System',
            tech: ['React.js', 'Supabase', 'CSS'],
            desc: 'A web-based, secure application designed to modernize and streamline the traditional process of recording student grades.',
            github: 'https://github.com/harsha08-2k6/fsad-project.git',
            img: gradingSystemImg
        },
        {
            title: 'To-do List',
            tech: ['JavaScript', 'CSS'],
            desc: 'A simple, lightweight web application built to help users manage daily tasks efficiently with MVP focus.',
            github: 'https://github.com/harsha08-2k6/To-Do-List.git',
            img: todoListImg
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
                                        SH<span className="text-sky-400">.</span>
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
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={!isLoading ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className={`max-w-5xl w-full flex justify-between items-center px-8 py-3 rounded-2xl transition-all duration-500 border pointer-events-auto ${scrolled ? 'bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent'}`}
                >
                    <div className="text-2xl font-bold font-['Outfit'] tracking-tighter text-white">
                        SH<span className="text-sky-400">.</span>
                    </div>

                    <div className="hidden md:flex gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
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
                            className="absolute top-24 left-6 right-6 bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 md:hidden pointer-events-auto shadow-2xl overflow-hidden"
                        >
                            <div className="flex flex-col gap-6 text-center">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-bold text-slate-300 hover:text-sky-400 py-2 border-b border-white/5 transition-all"
                                        onClick={() => setIsMenuOpen(false)}
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
                                                    <span className="text-[8px] font-mono text-white/80 tracking-widest uppercase">REC 00:24:12:02</span>
                                                </div>

                                                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                                    <div className="text-[8px] font-mono text-white/60 leading-none">
                                                        <div>ISO 100</div>
                                                        <div>f/1.8 1/250</div>
                                                    </div>
                                                    <div className="flex gap-1 h-2 items-end">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div key={i} className={`w-0.5 rounded-full bg-sky-400`} style={{ height: `${20 + i * 15}%` }} />
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
                                                    <div className="text-[8px] text-sky-400/60 mb-1 uppercase tracking-widest">Retouching</div>
                                                    <div className="text-sm font-black text-white">99.8%</div>
                                                </div>
                                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                                    <div className="text-[8px] text-indigo-400/60 mb-1 uppercase tracking-widest">Grading</div>
                                                    <div className="text-sm font-black text-white">PRO</div>
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
                                                <div className="text-sm font-bold text-white tracking-[0.2em] uppercase font-['Outfit']">Creative Master</div>
                                                <div className="flex items-center gap-1.5 justify-center mt-1">
                                                    <motion.span
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                        className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9]"
                                                    />
                                                    <div className="text-[8px] text-sky-500/70 font-mono tracking-widest uppercase">Editor Mode Enabled</div>
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
            < section id="about" className="min-h-screen flex items-center py-24 px-6 bg-[#111a2e] snap-start justify-center" >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    <h2 className="text-4xl font-bold font-['Outfit'] mb-12 relative inline-block">
                        About Me
                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-sky-400"></div>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="text-slate-400 space-y-6 text-lg">
                            <p>I’m Harsha, a Computer Science student at K L University who’s passionate about building practical and impactful tech solutions. I enjoy working on frontend development with React, HTML, CSS, and JavaScript, while continuously strengthening my problem-solving skills in C and core algorithms.</p>
                            <p>I’ve worked on projects involving admin portals, approval workflows, auto-generated ID systems, and quiz platforms with analytics dashboards. Currently, I’m focused on improving my DSA foundation, refining my UI/UX thinking, and building scalable web applications. My goal is to create clean, minimal, and efficient products that solve real-world problems effectively.</p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                {['Prompt Engineering', 'Video Editing', 'Full Stack', 'Photography', 'Open Source'].map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: 'Projects', val: '10+' },
                                { label: 'CGPA', val: '9.3' },
                                { label: 'Contributions', val: '130+' },
                                { label: 'Certificates', val: '10+' }
                            ].map(stat => (
                                <div key={stat.label} className="bg-[#1e293b]/50 p-6 rounded-2xl border border-white/5 text-center transition-transform hover:-translate-y-2">
                                    <div className="text-3xl font-bold text-sky-400 mb-1">{stat.val}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section >

            {/* Projects */}
            < section id="projects" className="min-h-screen flex items-center py-24 px-6 snap-start justify-center" >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    <h2 className="text-4xl font-bold font-['Outfit'] mb-16 relative inline-block">
                        Featured Projects
                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-sky-400"></div>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-[#1e293b]/30 border border-white/5 rounded-2xl overflow-hidden group"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-all duration-500" />
                                    <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-8">
                                    <div className="flex gap-2 mb-4">
                                        {p.tech.map(t => <span key={t} className="text-[10px] uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded">{t}</span>)}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                                    <p className="text-sm text-slate-400 mb-6">{p.desc}</p>
                                    <a href={p.github} target="_blank" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:underline">
                                        <Github size={18} /> GitHub
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section >

            {/* Skills Section */}
            < section id="skills" className="min-h-screen flex items-center py-24 px-6 bg-[#0f172a] snap-start justify-center" >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto w-full"
                >
                    <h2 className="text-4xl font-bold font-['Outfit'] mb-16 relative inline-block text-white">
                        Technical Skills
                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-sky-400"></div>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Creative Arts */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-500/30 transition-all duration-500">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-sky-400">
                                <Camera size={24} /> Creative Arts
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Video Editing', level: 95 },
                                    { name: 'Photography', level: 80 },
                                    { name: 'Creative Direction', level: 60 }
                                ].map(skill => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                                            <span className="text-sm text-sky-400 font-mono">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-sky-600 to-sky-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-500">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-indigo-400">
                                <Code2 size={24} /> Frontend
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'React / Next.js', level: 92 },
                                    { name: 'HTML/CSS', level: 95 },
                                    { name: 'UI/UX Design', level: 85 }
                                ].map(skill => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                                            <span className="text-sm text-indigo-400 font-mono">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Backend */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-500">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-emerald-400">
                                <Terminal size={24} /> Backend
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Python / Backend', level: 88 },
                                    { name: 'Node.js / Express', level: 85 },
                                    { name: 'SQL / Databases', level: 82 }
                                ].map(skill => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                                            <span className="text-sm text-emerald-400 font-mono">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section >

            {/* Contact */}
            < section id="contact" className="min-h-screen flex items-center py-24 px-6 bg-[#111a2e] snap-start justify-center flex-col" >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto text-center w-full"
                >
                    <h2 className="text-4xl font-bold font-['Outfit'] mb-4">Let's Connect</h2>
                    <p className="text-slate-400 mb-16 max-w-lg mx-auto">Currently open to new opportunities and interesting projects.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {/* Email Card */}
                        <a href="mailto:tsivaharshavardhanreddy08@gmail.com"
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-500 flex flex-col items-center">
                            <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                                <Mail size={32} />
                            </div>
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold mb-3">Email Address</span>
                            <span className="text-slate-200 font-semibold text-sm break-all">tsivaharshavardhanreddy08@gmail.com</span>
                        </a>

                        {/* LinkedIn Card */}
                        <a href="https://linkedin.com/in/siva-harsha-vardhan-reddy" target="_blank"
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-500 flex flex-col items-center">
                            <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                                <Linkedin size={32} />
                            </div>
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold mb-3">Professional</span>
                            <span className="text-slate-200 font-semibold text-lg">LinkedIn Profile</span>
                        </a>

                        {/* GitHub Card */}
                        <a href="https://github.com/harsha08-2k6" target="_blank"
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-500 flex flex-col items-center">
                            <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                                <Github size={32} />
                            </div>
                            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] font-bold mb-3">Code Base</span>
                            <span className="text-slate-200 font-semibold text-lg">GitHub Repository</span>
                        </a>
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
