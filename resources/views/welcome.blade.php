<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>DQUADS PORTFOLIO</title>
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
            background-size: 24px 24px;
        }
    </style>
</head>
<body class="antialiased bg-[#08080c] text-[#ededed] selection:bg-fuchsia-600 selection:text-white overflow-x-hidden min-h-screen relative">

    <!-- High-End Interactive Liquid Ribbed Mesh & WebGL Fluid Canvas (DQUAD Dark Obsidian Theme) -->
    <canvas id="ambient-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"></canvas>

    <!-- Precision Engineering Dot Matrix Grid (Linear.app style) -->
    <div class="fixed inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_30%,transparent_100%)] pointer-events-none z-0 opacity-35"></div>

    <!-- Fullscreen Celebratory Konami Confetti Canvas -->
    <canvas id="konami-confetti-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-50"></canvas>

    <!-- 10-Second Rainbow Holographic Overdrive Countdown HUD (Top Center) -->
    <div id="konami-overdrive-hud" class="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 transform -translate-y-6 transition-all duration-500 max-w-[92vw]">
        <div class="px-4 sm:px-5 py-2 rounded-full bg-[#090812]/95 border border-fuchsia-500/60 shadow-[0_0_35px_rgba(217,70,239,0.5),0_0_15px_rgba(56,189,248,0.4)] backdrop-blur-2xl flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono-code text-white">
            <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span class="font-extrabold tracking-wider bg-gradient-to-r from-pink-400 via-purple-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent uppercase truncate">
                Holographic Overdrive Active
            </span>
            <span class="text-white/20">|</span>
            <span id="konami-overdrive-timer" class="text-cyan-300 font-bold tabular-nums">10.0s</span>
        </div>
    </div>

    <!-- Steam / Xbox Style Achievement Toast Notification (Top Right on desktop, centered bounded on mobile) -->
    <div id="konami-achievement-toast" class="fixed top-4 sm:top-6 inset-x-4 sm:inset-x-auto sm:right-6 z-50 pointer-events-none transform translate-y-[-160%] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-sm sm:w-auto">
        <div class="relative overflow-hidden rounded-2xl bg-[#0b0a16]/95 backdrop-blur-2xl border border-amber-500/40 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.25)] flex items-center gap-3.5">
            <!-- Top Animated Rainbow Prismatic Beam -->
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-400 via-emerald-400 to-amber-400 animate-pulse"></div>

            <!-- Rare Diamond Trophy Badge Icon -->
            <div class="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                <span class="text-2xl animate-bounce">🏆</span>
                <span class="absolute -inset-1 rounded-xl border border-amber-400/30 animate-ping pointer-events-none"></span>
            </div>

            <!-- Achievement Text Details -->
            <div class="flex-1 min-w-0 pr-1">
                <div class="flex items-center gap-1.5 text-[10px] font-mono-code font-bold uppercase tracking-widest text-amber-400">
                    <span>🏆 ACHIEVEMENT UNLOCKED</span>
                    <span class="text-white/40">•</span>
                    <span class="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-black text-[9px] tracking-normal">100G</span>
                </div>
                <h4 class="text-white font-extrabold text-sm tracking-tight truncate mt-0.5">
                    SECRET ARCHITECT
                </h4>
                <p class="text-gray-400 text-[11px] font-mono-code truncate">
                    Overclocked Dhaka Core // Konami Overdrive [10s]
                </p>
            </div>

            <!-- Dismiss Button -->
            <button id="konami-toast-close" type="button" class="text-gray-500 hover:text-white p-1 transition-colors text-xs cursor-pointer flex-shrink-0" title="Dismiss">
                ✕
            </button>
        </div>
    </div>

    <!-- Navigation Header (Fixed, 100% Mobile Responsive with Opaque Shield Background) -->
    <header class="fixed top-0 inset-x-0 z-50 pt-2.5 sm:pt-4 px-3 sm:px-4">
        <nav class="max-w-5xl mx-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 bg-[#090812]/95 shadow-[0_8px_32px_rgba(0,0,0,0.7)] flex items-center justify-between backdrop-blur-2xl">
            <a href="#home" class="flex items-center gap-2 group shrink-0">
                <span class="text-lg sm:text-2xl font-black tracking-tighter text-white group-hover:text-fuchsia-400 transition-colors">DQUAD</span>
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </a>

            <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
                <a href="#home" class="nav-section-link text-white font-semibold transition-colors">Overview</a>
                <a href="#bento" class="nav-section-link text-gray-400 hover:text-white transition-colors">Capabilities Bento</a>
                <a href="#profile" class="nav-section-link text-gray-400 hover:text-white transition-colors">Player Profile</a>
                <a href="#contact" class="nav-section-link text-gray-400 hover:text-white transition-colors">Transmission</a>
            </div>

            <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <!-- Tactile Sci-Fi Audio Synthesizer Toggle (Compact circle on mobile, pill on desktop) -->
                <button id="audio-toggle-btn" class="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-cyan-300 transition-all cursor-pointer select-none" title="Toggle Tactile Audio Synthesizer (Web Audio API)">
                    <span id="audio-indicator-dot" class="w-1.5 h-1.5 rounded-full bg-gray-500 transition-colors hidden sm:inline-block"></span>
                    <span id="audio-toggle-label" class="hidden sm:inline uppercase tracking-wider text-[10px] font-mono-code ml-1.5">SFX: OFF</span>
                    <svg id="audio-icon-off" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    <svg id="audio-icon-on" class="w-3.5 h-3.5 hidden text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                </button>

                <!-- Social Icons (Hidden on mobile to preserve layout, visible on sm+) -->
                <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="hidden sm:flex p-1.5 text-gray-400 hover:text-white transition-colors" title="GitHub">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                </a>
                <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="hidden sm:flex p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="YouTube">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
                </a>

                <a href="#contact" class="relative group/btn overflow-hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-black font-semibold text-[11px] sm:text-xs transition-all duration-300 shadow-md hover:text-white hover:shadow-[0_0_26px_rgba(168,85,247,0.7)] hover:-translate-y-0.5 active:translate-y-0 border border-transparent hover:border-purple-400/50 whitespace-nowrap shrink-0">
                    <span class="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full"></span>
                    <span class="relative z-10 flex items-center gap-1.5">
                        Initiate Co-Op
                    </span>
                </a>
            </div>
        </nav>
    </header>

    <main class="relative z-10">
        <!-- =====================================================
             1. OVERVIEW (Hero & 3D Holographic Card)
        ====================================================== -->
        <section id="home" class="min-h-screen pt-36 pb-20 flex items-center justify-center relative px-4">
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

                        <p class="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-xl">
                            Full-stack engineer & game developer based in <strong class="text-white font-semibold">Dhaka, Bangladesh</strong>. Hacking on physics in <span class="text-cyan-400 font-medium">Unity & Godot</span>, architecting backends in <span class="text-purple-400 font-medium">Laravel</span>, and clicking heads in <span class="text-white font-medium">CS2, Valorant & Elden Ring</span>.
                        </p>

                        <!-- Tech Chips -->
                        <div class="flex flex-wrap gap-2.5 pt-1">
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">Unity 6 & Godot 4</span>
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">PHP 8.4 & Laravel</span>
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">Android Studio</span>
                            <span class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-gray-300">Tailwind & Flowbite</span>
                        </div>

                        <!-- Channels / Quick Actions (100% Mobile Fluid & Non-Overflowing) -->
                        <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-3 w-full">
                            <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-white text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2.5 group">
                                <svg class="w-4 h-4 text-gray-400 group-hover:text-white shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                <span>github.com/dquad90</span>
                            </a>

                            <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-red-500/10 hover:border-red-500/40 text-white text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2.5 group">
                                <svg class="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
                                <span>youtube.com/@dquaddq</span>
                            </a>
                        </div>
                    </div>

                    <!-- Right: Interactive 3D Holographic Foil Card (Click to Flip 180°) -->
                    <div class="lg:col-span-5 flex justify-center lg:justify-end">
                        <div class="holo-container w-full max-w-sm cursor-pointer select-none" id="holo-card-container">
                            <div class="holo-card">
                                <!-- FRONT FACE (Diamond Tier Player Pass) -->
                                <div class="holo-face holo-front p-6 sm:p-7 rounded-3xl border border-white/20 bg-gradient-to-b from-[#181822] to-[#0c0c12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
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
                                        <span class="text-fuchsia-400 hover:text-fuchsia-300 font-semibold flex items-center gap-1 transition-colors">
                                            <span>CLICK TO FLIP</span>
                                            <svg class="w-3 h-3 animate-spin" style="animation-duration: 4s;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                        </span>
                                    </div>
                                </div>

                                <!-- BACK FACE (Developer RPG Radar & Direct Comms) -->
                                <div class="holo-face holo-back p-6 sm:p-7 rounded-3xl border border-white/20 bg-gradient-to-b from-[#181822] via-[#0f0f18] to-[#08080c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between">
                                    <div class="holo-glare"></div>
                                    <div class="holo-foil"></div>

                                    <!-- Top Header -->
                                    <div class="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
                                        <div class="flex items-center gap-2">
                                            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            <span class="font-mono-code text-[11px] text-cyan-400 uppercase tracking-widest font-semibold">DEV LOADOUT // SPECS</span>
                                        </div>
                                        <span class="text-[10px] font-mono-code px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase font-bold tracking-wider">
                                            DHAKA, BD [UTC+6]
                                        </span>
                                    </div>

                                    <!-- Center: Concrete Tech & Gaming Focus -->
                                    <div class="relative z-10 py-3 space-y-2 font-mono-code text-[11px]">
                                        <div class="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                            <div>
                                                <span class="text-[9px] text-gray-500 uppercase block">Game Engines</span>
                                                <span class="text-white font-semibold">Unity 6 & Godot 4</span>
                                            </div>
                                            <span class="text-[10px] text-cyan-400 font-medium">C# / GDScript</span>
                                        </div>

                                        <div class="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                            <div>
                                                <span class="text-[9px] text-gray-500 uppercase block">Backend Architecture</span>
                                                <span class="text-white font-semibold">Laravel 13 / PHP 8.4</span>
                                            </div>
                                            <span class="text-[10px] text-purple-400 font-medium">REST / SQLite</span>
                                        </div>

                                        <div class="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                            <div>
                                                <span class="text-[9px] text-gray-500 uppercase block">Mobile Native</span>
                                                <span class="text-white font-semibold">Android Studio</span>
                                            </div>
                                            <span class="text-[10px] text-emerald-400 font-medium">Kotlin Native</span>
                                        </div>

                                        <div class="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                            <div>
                                                <span class="text-[9px] text-gray-500 uppercase block">Competitive Rotation</span>
                                                <span class="text-amber-300 font-semibold">CS2 • Valorant</span>
                                            </div>
                                            <span class="text-[10px] text-rose-400 font-medium">Elden Ring</span>
                                        </div>
                                    </div>

                                    <!-- Comms Channels (Direct Clickable Links) -->
                                    <div class="relative z-10 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono-code text-[11px] mb-3">
                                        <a href="tel:01888574160" class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-cyan-300 border border-white/5 transition-colors">
                                            <svg class="w-3 h-3 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                            <span class="truncate">01888574160</span>
                                        </a>
                                        <a href="mailto:dquadofficialgg@gmail.com" class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-fuchsia-300 border border-white/5 transition-colors">
                                            <svg class="w-3 h-3 text-fuchsia-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                            <span class="truncate">Email Me</span>
                                        </a>
                                        <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/5 transition-colors">
                                            <svg class="w-3 h-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                                            <span class="truncate">github/dquad90</span>
                                        </a>
                                        <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-rose-400 border border-white/5 transition-colors">
                                            <svg class="w-3 h-3 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                            <span class="truncate">@dquaddq</span>
                                        </a>
                                    </div>

                                    <!-- Bottom Footer -->
                                    <div class="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono-code text-gray-500">
                                        <span class="text-gray-400">SHA-256: 9D4A...7F01</span>
                                        <span class="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors">
                                            <span>RETURN FRONT</span>
                                            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- =====================================================
             2. CAPABILITIES BENTO (Abilities Grid)
        ====================================================== -->
        <section id="bento" class="py-28 px-4 relative border-t border-white/5">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16">
                    <div class="text-left space-y-3 max-w-xl">
                        <p class="text-xs font-mono-code uppercase tracking-[0.25em] text-violet-400 font-semibold">Engineered Architecture</p>
                        <h2 class="text-4xl sm:text-5xl font-black tracking-tight text-white">
                            CAPABILITIES BENTO<span class="text-fuchsia-500">.</span>
                        </h2>
                        <p class="text-gray-400 text-base font-light">
                            A breakdown of engineering disciplines, toolchains, and real-time interactive capabilities.
                        </p>
                    </div>

                    <!-- 3D Rotating Holographic Disc & Gaming Controller -->
                    <div class="flex items-center justify-center lg:justify-end w-full">
                        <div id="controller-3d-container" class="relative w-full max-w-[390px] h-[220px] sm:h-[240px] rounded-3xl border border-white/10 glass-modern hairline-beam hairline-speed-fast hairline-spotlight flex items-center justify-center cursor-grab active:cursor-grabbing select-none group shadow-2xl overflow-hidden mx-auto">
                            <!-- HUD Corner Crosshairs -->
                            <span class="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-cyan-400/80 rounded-tl-sm pointer-events-none transition-colors group-hover:border-cyan-300 z-10"></span>
                            <span class="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-cyan-400/80 rounded-tr-sm pointer-events-none transition-colors group-hover:border-cyan-300 z-10"></span>
                            <span class="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-cyan-400/80 rounded-bl-sm pointer-events-none transition-colors group-hover:border-cyan-300 z-10"></span>
                            <span class="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-cyan-400/80 rounded-br-sm pointer-events-none transition-colors group-hover:border-cyan-300 z-10"></span>

                            <!-- Telemetry HUD Badge & Live Input Feed -->
                            <div class="absolute top-3 left-4 flex flex-col gap-1 pointer-events-none z-10">
                                <div class="flex items-center gap-2">
                                    <span id="controller-ping-dot" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                                    <span id="controller-telemetry-text" class="text-[10px] font-mono-code uppercase tracking-wider text-cyan-400 font-semibold transition-colors duration-200">VIEWPORT // READY</span>
                                </div>
                                <div id="controller-input-chip" class="opacity-0 translate-y-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-fuchsia-500/15 border border-fuchsia-500/30 text-[9px] font-mono-code text-fuchsia-300 transition-all duration-200">
                                    <span class="w-1 h-1 rounded-full bg-fuchsia-400"></span>
                                    <span id="controller-input-label">NO INPUT</span>
                                </div>
                            </div>

                            <canvas id="controller-3d-canvas" class="w-full h-full"></canvas>

                            <div class="absolute bottom-2.5 right-4 text-[10px] font-mono-code text-gray-500 bg-black/50 px-2 py-0.5 rounded border border-white/5 opacity-70 group-hover:opacity-100 group-hover:text-fuchsia-300 transition-all pointer-events-none flex items-center gap-1.5 z-10">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                CLICK BUTTONS / DRAG ✦
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bento Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <!-- Bento 1: Game Development -->
                    <div class="md:col-span-2 bento-card hairline-beam hairline-speed-mid hairline-spotlight rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                        <div class="bento-glow"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-5">
                                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/30 border border-white/10 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                <span class="text-xs font-mono-code px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase">
                                    01 // Core Specialty
                                </span>
                            </div>

                            <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Game Engineering</h3>
                            <p class="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl font-light mb-4">
                                Architecting 2D/3D gameplay mechanics, real-time physics engines, and cross-platform interactive loops. From lightweight HTML5 games to native desktop builds.
                            </p>
                        </div>

                        <!-- Live Playable Canvas Micro-Game -->
                        <div class="relative z-10 my-2 rounded-2xl overflow-hidden border border-white/10 bg-[#08080f]/90 shadow-inner group/game">
                            <!-- Telemetry bar -->
                            <div class="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/60 text-[10px] font-mono-code">
                                <div class="flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                                    <span class="text-cyan-400 font-semibold tracking-wider uppercase">DQUAD VECTOR INTERCEPTOR // 60FPS</span>
                                </div>
                                <div class="text-gray-400 flex items-center gap-2">
                                    <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 hidden sm:inline">CLICK / WASD / GAMEPAD</span>
                                    <button id="bento-game-reset-btn" class="text-[9px] px-2 py-0.5 rounded bg-fuchsia-500/15 hover:bg-fuchsia-500/30 text-fuchsia-300 border border-fuchsia-500/30 transition-colors uppercase cursor-pointer" title="Reset Score">RESET</button>
                                </div>
                            </div>
                            <canvas id="bento-game-canvas" class="w-full h-44 sm:h-48 block cursor-crosshair"></canvas>
                        </div>

                        <div class="relative z-10 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">Unity 6 Engine</span>
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">Godot 4</span>
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">HTML5 WebGL / Canvas</span>
                            <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">C# / GDScript</span>
                        </div>
                    </div>

                    <!-- Bento 2: Web Architecture -->
                    <div class="bento-card hairline-beam hairline-speed-slow hairline-spotlight rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                        <div class="bento-glow"></div>
                        <div class="relative z-10">
                            <div class="flex items-center justify-between mb-5">
                                <div class="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                                </div>
                                <span class="text-xs font-mono-code text-cyan-400 uppercase tracking-wider font-semibold">02 // Backend</span>
                            </div>

                            <h3 class="text-2xl font-bold text-white mb-2 tracking-tight">Web Architecture</h3>
                            <p class="text-gray-400 text-sm leading-relaxed font-light mb-4">
                                Full-lifecycle PHP & Laravel web systems with clean MVC patterns, robust RESTful APIs, Tailwind styling, and reactive UI.
                            </p>
                        </div>

                        <!-- Interactive Live API / Artisan Terminal Simulator -->
                        <div class="relative z-10 my-2 rounded-2xl overflow-hidden border border-white/10 bg-[#08080f] shadow-inner font-mono-code text-[11px]" id="api-terminal-simulator">
                            <!-- Terminal Header Bar -->
                            <div class="flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-black/60">
                                <div class="flex items-center gap-1.5">
                                    <span class="w-2 h-2 rounded-full bg-rose-500/80"></span>
                                    <span class="w-2 h-2 rounded-full bg-amber-500/80"></span>
                                    <span class="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                                    <span class="text-[9px] text-gray-400 ml-2">api.dquad.dev // laravel-13</span>
                                </div>
                                <div class="flex items-center gap-1 text-[9px] text-emerald-400">
                                    <span class="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                                    <span>LIVE</span>
                                </div>
                            </div>

                            <!-- Route Selector Tabs -->
                            <div class="flex items-center gap-1 p-1.5 bg-black/40 border-b border-white/5 overflow-x-auto text-[10px]">
                                <button type="button" data-route="health" class="api-tab px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold transition-all cursor-pointer">
                                    GET /health
                                </button>
                                <button type="button" data-route="architecture" class="api-tab px-2 py-0.5 rounded bg-white/[0.03] text-gray-400 hover:text-white border border-transparent hover:border-white/10 transition-all cursor-pointer">
                                    GET /stack
                                </button>
                                <button type="button" data-route="profile" class="api-tab px-2 py-0.5 rounded bg-white/[0.03] text-gray-400 hover:text-white border border-transparent hover:border-white/10 transition-all cursor-pointer">
                                    GET /profile
                                </button>
                            </div>

                            <!-- Terminal Console Output Body -->
                            <div class="p-3 text-[10px] sm:text-[11px] leading-relaxed text-gray-300 min-h-[110px] flex flex-col justify-between" id="api-terminal-output">
                                <div id="api-response-body">
                                    <!-- Dynamic JSON rendered here -->
                                </div>
                                <div class="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-[9px] text-gray-500">
                                    <span id="api-response-meta">HTTP/2 200 OK • 12ms • Redis Cache</span>
                                    <button type="button" class="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1" id="api-run-again-btn" title="Simulate Latency & Fetch">
                                        <span>RE-TEST</span>
                                        <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="relative z-10 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">PHP 8.4</span>
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">Laravel 13</span>
                            <span class="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 font-mono-code">Tailwind v4</span>
                        </div>
                    </div>

                    <!-- Bento 3: Android Studio -->
                    <div class="bento-card hairline-beam hairline-speed-fast hairline-spotlight rounded-3xl p-8 flex flex-col justify-between">
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

                    <!-- Bento 4: Live Telemetry -->
                    <div class="md:col-span-2 bento-card hairline-beam hairline-speed-mid hairline-spotlight rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
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
                            <a href="#contact" class="text-white hover:text-purple-400 font-medium transition-all flex items-center gap-1 group/link hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.85)]">
                                Initiate Co-Op <span class="group-hover/link:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- =====================================================
             3. PLAYER PROFILE (Bio, Philosophy & Comms)
        ====================================================== -->
        <section id="profile" class="py-28 px-4 relative border-t border-white/5">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <div class="space-y-6">
                        <p class="text-xs font-mono-code uppercase tracking-[0.25em] text-cyan-400 font-semibold">Behind The Screen</p>
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                            CODE. CLUTCH.<br>BUILD THINGS THAT FEEL GOOD<span class="text-cyan-400">.</span>
                        </h2>
                        <p class="text-gray-300 text-base sm:text-lg leading-relaxed">
                            I'm <strong class="text-white font-semibold">Darun Naim Sindid</strong> (in lobbies and repos, everyone knows me as <strong class="text-white font-semibold">DQUAD</strong>) — a developer from Dhaka, Bangladesh who grew up obsessed with how games feel under your fingers and how solid backends run under the hood.
                        </p>
                        <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
                            When I'm taking a break from code, you'll catch me holding bombsite in <strong class="text-white">Counter-Strike 2</strong>, queuing ranked in <strong class="text-white">Valorant</strong>, or getting tested by late-game bosses in <strong class="text-white">Elden Ring</strong>. That gamer mentality carries straight into engineering: I obsess over input responsiveness in <strong class="text-cyan-300">Unity 6 & Godot 4</strong>, clean REST APIs in <strong class="text-purple-300">Laravel 13</strong>, and fluid mobile UX in <strong class="text-emerald-300">Android Studio</strong>.
                        </p>

                        <!-- Developer Rig & Rotation Pill Cards -->
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono-code">
                            <div class="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                                <span class="text-gray-500 text-[10px] uppercase block">Location</span>
                                <span class="text-white font-semibold">Dhaka, BD [UTC+6]</span>
                            </div>
                            <div class="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                                <span class="text-gray-500 text-[10px] uppercase block">Competitive</span>
                                <span class="text-cyan-400 font-semibold">CS2 • Valorant</span>
                            </div>
                            <div class="p-3 rounded-2xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
                                <span class="text-gray-500 text-[10px] uppercase block">Solo RPG</span>
                                <span class="text-amber-300 font-semibold">Elden Ring</span>
                            </div>
                        </div>
                    </div>

                    <!-- Direct Comms Box (100% Mobile Fluid & High-Contrast) -->
                    <div class="bento-card p-5 sm:p-7 rounded-3xl space-y-4 sm:space-y-5">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Direct Comms Channels</h3>
                            <span class="text-[10px] font-mono-code text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 font-semibold tracking-wider">LIVE</span>
                        </div>
                        
                        <div class="space-y-3">
                            <!-- Voice Comms -->
                            <a href="tel:01888574160" class="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/[0.04] transition-all flex items-center justify-between gap-3 group">
                                <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                    <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-[10px] sm:text-xs font-mono-code text-gray-400 uppercase tracking-wider">Voice Comms</p>
                                        <p class="text-sm sm:text-base font-semibold text-white tracking-wide truncate">01888574160</p>
                                    </div>
                                </div>
                                <span class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 group-hover:bg-emerald-500/25 group-hover:border-emerald-400 text-[11px] sm:text-xs font-mono-code font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-1">
                                    Call <span class="group-hover:translate-x-0.5 transition-transform">→</span>
                                </span>
                            </a>

                            <!-- Official Email -->
                            <a href="mailto:dquadofficialgg@gmail.com" class="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/[0.04] transition-all flex items-center justify-between gap-3 group">
                                <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                    <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-[10px] sm:text-xs font-mono-code text-gray-400 uppercase tracking-wider">Official Email</p>
                                        <p class="text-xs sm:text-sm md:text-base font-semibold text-white tracking-tight truncate" title="dquadofficialgg@gmail.com">dquadofficialgg@gmail.com</p>
                                    </div>
                                </div>
                                <span class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 group-hover:bg-cyan-500/25 group-hover:border-cyan-400 text-[11px] sm:text-xs font-mono-code font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-1">
                                    Email <span class="group-hover:translate-x-0.5 transition-transform">→</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- =====================================================
             4. TRANSMISSION (Contact / Mission Briefing)
        ====================================================== -->
        <section id="contact" class="py-28 px-4 relative border-t border-white/5">
            <div class="max-w-4xl mx-auto">
                <div class="bento-card rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl">
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

                    <form id="transmission-form" class="max-w-lg mx-auto space-y-5 relative">
                        <!-- Canvas for celebration particle burst -->
                        <canvas id="transmission-particle-canvas" class="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none z-30"></canvas>

                        <div>
                            <label class="block text-xs font-mono-code text-gray-400 uppercase tracking-wider mb-2">Your Email / Comms Channel</label>
                            <input id="transmission-email" type="email" placeholder="client@domain.com" required class="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 text-white placeholder:text-gray-600 transition-all outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                        </div>

                        <div>
                            <label class="block text-xs font-mono-code text-gray-400 uppercase tracking-wider mb-2">Mission Briefing</label>
                            <textarea id="transmission-briefing" rows="4" placeholder="Describe your game idea, web development requirements, or app concept..." required class="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 text-white placeholder:text-gray-600 transition-all outline-none text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"></textarea>
                        </div>

                        <!-- Cybernetic Transmission Telemetry HUD Box -->
                        <div id="transmission-telemetry-hud" class="hidden rounded-xl border border-white/10 bg-[#07070d]/90 backdrop-blur-xl p-4 font-mono-code text-[11px] space-y-2 shadow-2xl">
                            <div class="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] uppercase tracking-wider text-gray-400">
                                <span class="flex items-center gap-1.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                                    <span>ENCRYPTED DISPATCH // DHAKA GATEWAY</span>
                                </span>
                                <span class="text-cyan-400 font-bold">PORT 443 [TLS 1.3]</span>
                            </div>
                            <div id="transmission-hud-log" class="space-y-1 text-xs">
                                <!-- Dynamic logs appear here -->
                            </div>
                        </div>

                        <!-- Sleek Obsidian Transmission Button -->
                        <button id="transmission-submit-btn" type="submit" class="relative group w-full py-4 px-6 rounded-xl bg-[#0f0d1a] hover:bg-[#161326] border border-purple-500/40 hover:border-purple-400/80 text-white font-semibold text-sm transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden">
                            <!-- Top specular accent line -->
                            <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
                            <!-- Subtle ambient hover gradient -->
                            <div class="absolute -inset-px rounded-xl bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            
                            <span id="transmission-btn-label" class="relative z-10 flex items-center gap-2">
                                <svg class="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                                <span>Deploy Transmission</span>
                            </span>
                        </button>

                        <!-- Direct Comms & Guaranteed Mail Dispatch Actions (Revealed upon transmission) -->
                        <div id="transmission-mail-actions" class="hidden space-y-3 pt-1">
                            <div class="p-4 rounded-xl border border-white/10 bg-[#0a0a12]/90 backdrop-blur-xl space-y-3 shadow-2xl">
                                <div class="flex items-center justify-between text-[11px] font-mono-code pb-2 border-b border-white/10">
                                    <span class="text-gray-300 flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span>RECIPIENT:</span> <strong class="text-white">dquadofficialgg@gmail.com</strong>
                                    </span>
                                    <span class="text-emerald-400 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">DIRECT ROUTED</span>
                                </div>

                                <p class="text-[11px] text-gray-400 font-sans">
                                    Choose your preferred dispatch method to ensure immediate inbox delivery:
                                </p>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                    <a id="transmission-gmail-link" href="#" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-200 hover:text-white transition-all font-mono-code font-medium">
                                        <svg class="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        <span>Open Web Gmail ↗</span>
                                    </a>
                                    <a id="transmission-mailto-link" href="#" class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:text-white transition-all font-mono-code font-medium">
                                        <svg class="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        <span>Default Mail App ↗</span>
                                    </a>
                                </div>

                                <div class="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-gray-400 font-mono-code">
                                    <button id="transmission-copy-btn" type="button" class="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                                        <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                        <span id="transmission-copy-label">Copy Briefing</span>
                                    </button>
                                    <button id="transmission-reset-link" type="button" class="hover:text-white transition-colors cursor-pointer text-gray-500 hover:text-gray-300">
                                        ↻ Transmit Another Mission
                                    </button>
                                </div>
                            </div>
                        </div>
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