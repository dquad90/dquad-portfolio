<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DQUAD — Darun Naim Sindid | 3D Animated Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Jost (Futura geometric aesthetic) & JetBrains Mono -->
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body { font-family: 'Jost', 'Futura', -apple-system, sans-serif; }
        .font-mono-code { font-family: 'JetBrains Mono', monospace; }
        .bg-grid-subtle {
            background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;
        }
    </style>
</head>
<body class="antialiased bg-[#070709] text-[#ededed] selection:bg-fuchsia-600 selection:text-white overflow-x-hidden min-h-screen relative">

    <!-- 3D WebGL Background Universe Canvas -->
    <canvas id="bg-3d-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>

    <!-- Ambient Cosmic Nebulas & Volumetric Depth Glows -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-violet-600/20 via-fuchsia-600/10 to-transparent blur-[140px] pointer-events-none -z-10"></div>
    <div class="fixed top-1/3 -left-48 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/15 via-violet-600/10 to-transparent blur-[130px] rounded-full pointer-events-none -z-10"></div>
    <div class="fixed top-2/3 -right-48 w-[700px] h-[700px] bg-gradient-to-bl from-fuchsia-600/15 via-purple-600/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10"></div>
    <div class="fixed bottom-0 left-1/3 w-[800px] h-[500px] bg-gradient-to-t from-violet-900/20 via-cyan-900/10 to-transparent blur-[150px] pointer-events-none -z-10"></div>

    <!-- Navigation Header -->
    <header class="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
        <nav class="max-w-5xl mx-auto px-5 py-3 rounded-full border border-white/10 glass-modern shadow-2xl flex items-center justify-between backdrop-blur-2xl">
            <a href="#home" class="flex items-center gap-3 group">
                <span class="text-2xl font-black tracking-tighter text-white group-hover:text-fuchsia-400 transition-colors">DQUAD</span>
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </a>

            <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
                <a href="#home" class="nav-section-link text-white font-semibold transition-colors">Overview</a>
                <a href="#bento" class="nav-section-link text-gray-400 hover:text-white transition-colors">Capabilities Bento</a>
                <a href="#profile" class="nav-section-link text-gray-400 hover:text-white transition-colors">Player Profile</a>
                <a href="#contact" class="nav-section-link text-gray-400 hover:text-white transition-colors">Transmission</a>
            </div>

            <div class="flex items-center gap-3">
                <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="p-2 text-gray-400 hover:text-white transition-colors" title="GitHub">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                </a>
                <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="p-2 text-gray-400 hover:text-red-500 transition-colors" title="YouTube">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
                </a>
                <a href="#contact" class="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-all shadow-md">
                    Initiate Co-Op
                </a>
            </div>
        </nav>
    </header>

    <main class="relative z-10">
        <!-- =====================================================
             1. OVERVIEW (Hero & 3D Holographic Card)
        ====================================================== -->
        <section id="home" class="scroll-3d-section min-h-screen pt-36 pb-20 flex items-center justify-center relative px-4 scroll-3d-scene">
            <div class="max-w-6xl mx-auto w-full">
                <div class="grid lg:grid-cols-12 gap-14 items-center">
                    
                    <!-- Left: Bio & Status -->
                    <div class="lg:col-span-7 text-left space-y-7">
                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono-code font-medium tracking-wide">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                            ACTIVE FOR NEW PROJECTS & MISSIONS
                        </div>

                        <div class="space-y-2">
                            <p class="text-xs font-mono-code uppercase tracking-[0.25em] text-violet-400 font-semibold">Darun Naim Sindid // Alias</p>
                            <h1 class="text-6xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter uppercase leading-none text-white">
                                DQUAD<span class="text-fuchsia-500">.</span>
                            </h1>
                        </div>

                        <p class="text-lg sm:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                            Full-Stack Web Architect, Game Developer, and Android Innovator. Crafting performant digital experiences with competitive gaming precision.
                        </p>

                        <!-- Tech Chips -->
                        <div class="flex flex-wrap gap-2.5 pt-1">
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">Unity 6 & Godot 4</span>
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">PHP 8.4 & Laravel</span>
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">Android Studio</span>
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">Tailwind & Flowbite</span>
                        </div>

                        <!-- Channels / Quick Actions -->
                        <div class="flex flex-wrap gap-4 pt-3">
                            <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-white text-sm font-medium transition-all flex items-center gap-2.5 group">
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                <span>github.com/dquad90</span>
                            </a>

                            <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-red-500/10 hover:border-red-500/40 text-white text-sm font-medium transition-all flex items-center gap-2.5 group">
                                <svg class="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
                                <span>youtube.com/@dquaddq</span>
                            </a>
                        </div>
                    </div>

                    <!-- Right: Interactive 3D Holographic Foil Card -->
                    <div class="lg:col-span-5 flex justify-center lg:justify-end">
                        <div class="holo-container w-full max-w-sm cursor-pointer select-none">
                            <div class="holo-card p-6 sm:p-7 rounded-3xl border border-white/20 bg-gradient-to-b from-[#181822] to-[#0c0c12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
                                <div class="holo-glare"></div>
                                <div class="holo-foil"></div>

                                <div class="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
                                    <div class="flex items-center gap-2">
                                        <div class="w-7 h-5 rounded bg-gradient-to-r from-amber-400 to-amber-200 border border-amber-300 flex items-center justify-center">
                                            <div class="w-4 h-2.5 border-y border-amber-800/40"></div>
                                        </div>
                                        <span class="font-mono-code text-[11px] text-gray-400 uppercase tracking-widest font-semibold">DQUAD-090</span>
                                    </div>
                                    <span class="text-[10px] font-mono-code px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 uppercase font-bold tracking-wider">
                                        Diamond Tier
                                    </span>
                                </div>

                                <div class="relative z-10 py-7 text-center space-y-3">
                                    <div class="relative mx-auto w-24 h-24 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-violet-600 p-[2px] shadow-xl">
                                        <div class="w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center overflow-hidden">
                                            <span class="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-white via-violet-200 to-fuchsia-400">
                                                DQ
                                            </span>
                                        </div>
                                        <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0c0c12] flex items-center justify-center">
                                            <svg class="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 class="text-2xl font-bold tracking-tight text-white">DARUN NAIM SINDID</h3>
                                        <p class="text-xs font-mono-code text-gray-400 tracking-wider">CLASS: FULL-STACK & GAME DEV</p>
                                    </div>
                                </div>

                                <div class="relative z-10 grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono-code mb-5">
                                    <div class="p-2 rounded-xl bg-white/[0.02]">
                                        <span class="text-[10px] text-gray-500 uppercase block">Game Engines</span>
                                        <span class="text-white font-bold">Unity 6 / Godot 4</span>
                                    </div>
                                    <div class="p-2 rounded-xl bg-white/[0.02]">
                                        <span class="text-[10px] text-gray-500 uppercase block">Web Stack</span>
                                        <span class="text-cyan-400 font-bold">Laravel 13 / PHP</span>
                                    </div>
                                    <div class="p-2 rounded-xl bg-white/[0.02]">
                                        <span class="text-[10px] text-gray-500 uppercase block">Mobile Native</span>
                                        <span class="text-fuchsia-400 font-bold">Android Studio</span>
                                    </div>
                                    <div class="p-2 rounded-xl bg-white/[0.02]">
                                        <span class="text-[10px] text-gray-500 uppercase block">Network Status</span>
                                        <span class="text-emerald-400 font-bold">ONLINE [12ms]</span>
                                    </div>
                                </div>

                                <div class="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono-code text-gray-500">
                                    <div class="flex items-center gap-1.5">
                                        <div class="flex gap-0.5 h-4 items-center">
                                            <div class="w-0.5 h-full bg-gray-400"></div>
                                            <div class="w-1 h-full bg-gray-400"></div>
                                            <div class="w-0.5 h-full bg-gray-400"></div>
                                            <div class="w-1.5 h-full bg-gray-400"></div>
                                        </div>
                                        <span>778-DQUAD-BD</span>
                                    </div>
                                    <span class="text-gray-400">HOVER TO TILT 3D ✦</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- =====================================================
             2. CAPABILITIES BENTO (Abilities Grid with 3D Depth)
        ====================================================== -->
        <section id="bento" class="scroll-3d-section py-28 px-4 relative border-t border-white/5 scroll-3d-scene">
            <div class="max-w-6xl mx-auto">
                <div class="text-left mb-16 space-y-3">
                    <p class="text-xs font-mono-code uppercase tracking-[0.25em] text-violet-400 font-semibold">Engineered Architecture</p>
                    <h2 class="text-4xl sm:text-5xl font-black tracking-tight text-white">
                        CAPABILITIES BENTO<span class="text-fuchsia-500">.</span>
                    </h2>
                    <p class="text-gray-400 max-w-xl text-base font-light">
                        A breakdown of engineering disciplines, toolchains, and real-time interactive capabilities.
                    </p>
                </div>

                <!-- Bento Grid with Staggered 3D Depth Parallax -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <!-- Bento 1: Game Development (Depth Factor 1.3) -->
                    <div class="md:col-span-2 bento-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between scroll-3d-element" data-depth="1.3">
                        <div class="bento-glow"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-8">
                                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/30 border border-white/10 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                <span class="text-xs font-mono-code px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase">
                                    01 // Core Specialty
                                </span>
                            </div>

                            <h3 class="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Game Engineering</h3>
                            <p class="text-gray-400 text-base leading-relaxed max-w-xl font-light mb-8">
                                Architecting 2D/3D gameplay mechanics, real-time physics engines, and cross-platform interactive loops. From lightweight HTML5 games to native desktop builds.
                            </p>
                        </div>

                        <div class="relative z-10 flex flex-wrap gap-2.5 pt-4 border-t border-white/5">
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">Unity 6 Engine</span>
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">Godot 4</span>
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">HTML5 WebGL / Canvas</span>
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">C# / GDScript</span>
                        </div>
                    </div>

                    <!-- Bento 2: Web Architecture (Depth Factor 0.8) -->
                    <div class="bento-card rounded-3xl p-8 flex flex-col justify-between scroll-3d-element" data-depth="0.8">
                        <div class="bento-glow"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-8">
                                <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                                </div>
                                <span class="text-xs font-mono-code text-gray-500">02 // Backend</span>
                            </div>

                            <h3 class="text-2xl font-bold text-white mb-3 tracking-tight">Web Architecture</h3>
                            <p class="text-gray-400 text-sm leading-relaxed font-light mb-6">
                                Full-lifecycle PHP & Laravel web systems with clean MVC patterns, robust RESTful APIs, Tailwind styling, and reactive UI.
                            </p>
                        </div>

                        <div class="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">PHP 8.4</span>
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">Laravel 13</span>
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">Tailwind v4</span>
                        </div>
                    </div>

                    <!-- Bento 3: Android Studio (Depth Factor 1.5) -->
                    <div class="bento-card rounded-3xl p-8 flex flex-col justify-between scroll-3d-element" data-depth="1.5">
                        <div class="bento-glow"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-8">
                                <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                                </div>
                                <span class="text-xs font-mono-code text-gray-500">03 // Native</span>
                            </div>

                            <h3 class="text-2xl font-bold text-white mb-3 tracking-tight">Android Studio</h3>
                            <p class="text-gray-400 text-sm leading-relaxed font-light mb-6">
                                Designing native mobile Android applications in Android Studio with Kotlin/Java, intuitive UX layouts, and background thread management.
                            </p>
                        </div>

                        <div class="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">Kotlin</span>
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">Java</span>
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">Material UI</span>
                        </div>
                    </div>

                    <!-- Bento 4: Live Telemetry (Depth Factor 1.1) -->
                    <div class="md:col-span-2 bento-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between scroll-3d-element" data-depth="1.1">
                        <div class="bento-glow"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-6">
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                    <span class="text-xs font-mono-code uppercase tracking-wider text-emerald-400 font-semibold">Live System Status</span>
                                </div>
                                <span class="text-xs font-mono-code text-gray-500">v1.2 // Production Ready</span>
                            </div>

                            <div class="grid sm:grid-cols-3 gap-4 mb-8">
                                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <span class="text-xs text-gray-500 font-mono-code uppercase block mb-1">Latency</span>
                                    <span class="text-2xl font-black text-white">12 ms</span>
                                    <span class="text-[11px] text-emerald-400 block mt-1">Optimal Response</span>
                                </div>
                                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <span class="text-xs text-gray-500 font-mono-code uppercase block mb-1">Cloud Host</span>
                                    <span class="text-2xl font-black text-white">Railway</span>
                                    <span class="text-[11px] text-cyan-400 block mt-1">Live & Active</span>
                                </div>
                                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <span class="text-xs text-gray-500 font-mono-code uppercase block mb-1">Identity</span>
                                    <span class="text-2xl font-black text-white">DQUAD</span>
                                    <span class="text-[11px] text-fuchsia-400 block mt-1">Verified Gamer/Dev</span>
                                </div>
                            </div>
                        </div>

                        <div class="relative z-10 flex items-center justify-between pt-4 border-t border-white/5 text-xs text-gray-400">
                            <span>Ready to collaborate on games, web apps, or Android solutions.</span>
                            <a href="#contact" class="text-white hover:text-fuchsia-400 font-medium transition-colors flex items-center gap-1">
                                Initiate Co-Op <span>→</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- =====================================================
             3. PLAYER PROFILE (Bio, Philosophy & Comms)
        ====================================================== -->
        <section id="profile" class="scroll-3d-section py-28 px-4 relative border-t border-white/5 scroll-3d-scene">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div class="space-y-6">
                        <p class="text-xs font-mono-code uppercase tracking-[0.25em] text-cyan-400 font-semibold">Origin & Philosophy</p>
                        <h2 class="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none">
                            BUILT BY GAMERS,<br>ARCHITECTED FOR SCALE<span class="text-cyan-400">.</span>
                        </h2>
                        <p class="text-gray-300 text-lg font-light leading-relaxed">
                            I'm <strong class="text-white font-semibold">Darun Naim Sindid</strong>, known everywhere in competitive gaming lobbies and developer repositories as <strong class="text-white font-semibold">DQUAD</strong>.
                        </p>
                        <p class="text-gray-400 text-base font-light leading-relaxed">
                            I treat writing software with the same relentless focus, reaction speed, and strategy required to win high-stakes multiplayer games. Whether it's crafting gameplay loops in Unity, structuring clean backend models in Laravel, or debugging Android activities in Android Studio, I execute cleanly.
                        </p>
                    </div>

                    <!-- Direct Comms Box with 3D Tilt on Scroll -->
                    <div class="bento-card p-8 rounded-3xl space-y-6 scroll-3d-element" data-depth="1.3">
                        <h3 class="text-xl font-bold text-white tracking-tight">Direct Comms Channels</h3>
                        
                        <div class="space-y-4">
                            <a href="tel:01888574160" class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                    </div>
                                    <div>
                                        <p class="text-xs font-mono-code text-gray-500 uppercase">Voice Comms</p>
                                        <p class="text-base font-semibold text-white">01888574160</p>
                                    </div>
                                </div>
                                <span class="text-xs text-gray-500 group-hover:text-white transition-colors">Call →</span>
                            </a>

                            <a href="mailto:dquadofficialgg@gmail.com" class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    </div>
                                    <div>
                                        <p class="text-xs font-mono-code text-gray-500 uppercase">Official Email</p>
                                        <p class="text-base font-semibold text-white">dquadofficialgg@gmail.com</p>
                                    </div>
                                </div>
                                <span class="text-xs text-gray-500 group-hover:text-white transition-colors">Send →</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- =====================================================
             4. TRANSMISSION (Contact / Mission Briefing)
        ====================================================== -->
        <section id="contact" class="scroll-3d-section py-28 px-4 relative border-t border-white/5 scroll-3d-scene">
            <div class="max-w-4xl mx-auto">
                <div class="bento-card rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl scroll-3d-element" data-depth="1.0">
                    <div class="max-w-xl mx-auto text-center space-y-4 mb-10">
                        <span class="inline-block px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-mono-code text-xs uppercase font-semibold">
                            Initiate Co-Op
                        </span>
                        <h2 class="text-4xl sm:text-5xl font-black tracking-tight text-white">
                            SEND TRANSMISSION<span class="text-fuchsia-500">.</span>
                        </h2>
                        <p class="text-gray-400 text-sm font-light">
                            Have a game idea, web project, or Android app concept? Send a message and let's build it.
                        </p>
                    </div>

                    <form class="max-w-lg mx-auto space-y-5">
                        <div>
                            <label class="block text-xs font-mono-code text-gray-400 uppercase tracking-wider mb-2">Your Email</label>
                            <input type="email" placeholder="player@domain.com" required class="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 text-white placeholder:text-gray-600 transition-all outline-none text-sm">
                        </div>

                        <div>
                            <label class="block text-xs font-mono-code text-gray-400 uppercase tracking-wider mb-2">Mission Briefing</label>
                            <textarea rows="4" placeholder="Describe your game idea, web development requirements, or app concept..." required class="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 text-white placeholder:text-gray-600 transition-all outline-none text-sm resize-none"></textarea>
                        </div>

                        <button type="submit" class="w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all shadow-xl">
                            Deploy Transmission
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <!-- Floating 3D Sector HUD (Right Spine) -->
    <aside class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col pointer-events-auto">
        <div class="glass-modern px-3 py-5 rounded-full border border-white/10 flex flex-col items-center gap-3.5 shadow-2xl backdrop-blur-2xl">
            <a href="#home" class="sector-link flex items-center gap-2 group text-[11px] font-mono-code text-gray-500 hover:text-white transition-all p-1" title="01 // Overview">
                <span class="sector-dot w-2 h-2 rounded-full bg-gray-600"></span>
                <span class="hidden group-hover:inline-block pr-1 font-semibold">01 HERO</span>
            </a>
            <div class="w-px h-2.5 bg-white/10"></div>
            <a href="#bento" class="sector-link flex items-center gap-2 group text-[11px] font-mono-code text-gray-500 hover:text-white transition-all p-1" title="02 // Capabilities Bento">
                <span class="sector-dot w-2 h-2 rounded-full bg-gray-600"></span>
                <span class="hidden group-hover:inline-block pr-1 font-semibold">02 BENTO</span>
            </a>
            <div class="w-px h-2.5 bg-white/10"></div>
            <a href="#profile" class="sector-link flex items-center gap-2 group text-[11px] font-mono-code text-gray-500 hover:text-white transition-all p-1" title="03 // Player Profile">
                <span class="sector-dot w-2 h-2 rounded-full bg-gray-600"></span>
                <span class="hidden group-hover:inline-block pr-1 font-semibold">03 PROFILE</span>
            </a>
            <div class="w-px h-2.5 bg-white/10"></div>
            <a href="#contact" class="sector-link flex items-center gap-2 group text-[11px] font-mono-code text-gray-500 hover:text-white transition-all p-1" title="04 // Transmission">
                <span class="sector-dot w-2 h-2 rounded-full bg-gray-600"></span>
                <span class="hidden group-hover:inline-block pr-1 font-semibold">04 CONTACT</span>
            </a>
        </div>
    </aside>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12 px-4 text-xs font-mono-code text-gray-500 relative z-10">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <span class="text-white font-bold text-sm tracking-tight font-sans">DQUAD</span>
                <span>•</span>
                <span>© 2026 Darun Naim Sindid. All rights reserved.</span>
            </div>
            <div class="flex items-center gap-6">
                <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub</a>
                <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="hover:text-red-400 transition-colors">YouTube</a>
                <a href="tel:01888574160" class="hover:text-white transition-colors">Comms</a>
            </div>
        </div>
    </footer>

</body>
</html>