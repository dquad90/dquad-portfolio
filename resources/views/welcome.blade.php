<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DQUAD | Darun Naim Sindid</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Jost is a beautiful geometric sans-serif that closely matches Futura's aesthetic -->
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body { font-family: 'Jost', 'Futura', sans-serif; }
        
        /* Interactive grid */
        .bg-grid-modern {
            background-size: 50px 50px;
            background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
    </style>
</head>
<body class="antialiased bg-[#050505] text-white selection:bg-fuchsia-600 selection:text-white">
    
    <!-- Navbar -->
    <nav class="fixed w-full z-50 top-0 start-0 border-b border-white/5 glass-modern">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:py-5">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse group">
          <span class="self-center text-3xl font-bold tracking-tighter text-white">DQUAD</span>
          <div class="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse"></div>
      </a>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          <!-- Social Icons in Header -->
          <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors p-2" title="GitHub - dquad90">
              <span class="sr-only">GitHub</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
          </a>
          <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-red-500 transition-colors p-2" title="YouTube - @dquaddq">
              <span class="sr-only">YouTube</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
          </a>
          <a href="#contact" class="text-white bg-white/10 hover:bg-white/20 border border-white/10 font-medium rounded-full text-sm px-6 py-2.5 text-center transition-all duration-300">Initiate Co-Op</a>
          <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none" aria-controls="navbar-sticky" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-800 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
          <li>
            <a href="#home" class="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 font-medium tracking-wide" aria-current="page">Home</a>
          </li>
          <li>
            <a href="#about" class="block py-2 px-3 text-gray-400 rounded hover:text-white md:hover:bg-transparent md:p-0 font-medium tracking-wide transition-colors">About</a>
          </li>
          <li>
            <a href="#skills" class="block py-2 px-3 text-gray-400 rounded hover:text-white md:hover:bg-transparent md:p-0 font-medium tracking-wide transition-colors">Abilities</a>
          </li>
        </ul>
      </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid-modern">
        <!-- Abstract Morphing Background -->
        <div class="absolute inset-0 z-0 flex items-center justify-center opacity-40">
            <div class="w-[600px] h-[600px] bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 blob-shape blur-3xl mix-blend-screen"></div>
            <div class="absolute w-[500px] h-[500px] bg-gradient-to-l from-blue-600/30 to-purple-600/30 blob-shape blur-3xl mix-blend-screen" style="animation-delay: -3s; animation-duration: 12s;"></div>
        </div>
        
        <div class="relative z-10 max-w-screen-xl mx-auto px-4 w-full">
            <div class="flex flex-col md:flex-row items-center justify-between gap-12">
                <div class="text-left w-full md:w-2/3">
                    <div class="clip-reveal mb-2">
                        <p class="text-lg md:text-xl text-violet-400 font-medium tracking-widest uppercase">Hello, World. I am</p>
                    </div>
                    <div class="clip-reveal mb-4" style="transition-delay: 0.1s;">
                        <h1 class="text-7xl md:text-[8rem] font-black tracking-tighter uppercase leading-none">
                            DQUAD
                        </h1>
                    </div>
                    <div class="clip-reveal mb-8" style="transition-delay: 0.2s;">
                        <p class="text-2xl md:text-3xl text-gray-400 font-light">
                            Darun Naim Sindid <span class="text-white font-medium">— Developer & Gamer.</span>
                        </p>
                    </div>
                    
                    <div class="clip-reveal" style="transition-delay: 0.3s;">
                        <div class="flex flex-wrap gap-4 mb-6">
                            <span class="glass-modern px-5 py-2 rounded-full text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-fuchsia-500"></span> Hardcore Gamer
                            </span>
                            <span class="glass-modern px-5 py-2 rounded-full text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-amber-400"></span> Game Developer
                            </span>
                            <span class="glass-modern px-5 py-2 rounded-full text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-blue-500"></span> Web Developer
                            </span>
                            <span class="glass-modern px-5 py-2 rounded-full text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-green-500"></span> Android Innovator
                            </span>
                        </div>

                        <!-- Direct Hero Links for GitHub & YouTube -->
                        <div class="flex flex-wrap gap-4">
                            <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="glass-modern px-5 py-2.5 rounded-full text-white text-sm font-medium border border-white/10 hover:border-white/40 hover:bg-white/10 transition-all flex items-center gap-2.5 group">
                                <svg class="w-4 h-4 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                <span>GitHub</span>
                                <span class="text-xs text-gray-400 group-hover:text-violet-300">/dquad90</span>
                            </a>
                            <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="glass-modern px-5 py-2.5 rounded-full text-white text-sm font-medium border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all flex items-center gap-2.5 group">
                                <svg class="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
                                <span>YouTube</span>
                                <span class="text-xs text-gray-400 group-hover:text-red-300">/@dquaddq</span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="w-full md:w-1/3 flex justify-end">
                    <!-- A decorative futuristic element -->
                    <div class="relative w-64 h-64 border border-white/10 rounded-full flex items-center justify-center p-8 animate-[spin_30s_linear_infinite]">
                        <div class="w-full h-full border border-dashed border-white/20 rounded-full flex items-center justify-center p-6 animate-[spin_20s_reverse_linear_infinite]">
                            <div class="w-full h-full border border-white/30 rounded-full bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 backdrop-blur-md flex items-center justify-center">
                                <span class="font-bold text-2xl tracking-tighter animate-[spin_10s_linear_infinite]">DQ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 clip-reveal" style="transition-delay: 0.6s;">
                <a href="#about" class="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
                    <span class="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
                    <div class="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
                </a>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-32 relative z-10 border-t border-white/5 bg-[#030303]">
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-16 items-center">
                <div class="clip-reveal">
                    <div>
                        <h2 class="text-5xl md:text-6xl font-black mb-8 tracking-tighter">PLAYER<br><span class="text-gray-600">PROFILE.</span></h2>
                        <div class="h-1 w-20 bg-white mb-10"></div>
                        <p class="text-gray-400 text-xl md:text-2xl font-light leading-relaxed mb-6">
                            I'm <strong class="text-white font-medium">Darun Naim Sindid</strong>, operating under the alias <strong class="text-white font-medium">DQUAD</strong>.
                        </p>
                        <p class="text-gray-400 text-lg leading-relaxed">
                            I live at the intersection of competitive gaming and cutting-edge software development. Whether I'm dominating lobbies or architecting web and Android applications, I execute with strategy, precision, and an unwavering drive to win.
                        </p>
                    </div>
                </div>
                <div class="clip-reveal spotlight glass-modern rounded-3xl p-1 md:p-8" style="transition-delay: 0.2s;">
                    <div class="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 group">
                        <!-- Placeholder for a real photo or 3D render -->
                        <div class="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/30 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Gaming Setup" class="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 hover-scale-img z-0">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Abilities Section (Cards with Spotlight Hover) -->
    <section id="skills" class="py-32 relative z-10 border-t border-white/5">
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="clip-reveal mb-20">
                <div class="flex items-center gap-6">
                    <h2 class="text-5xl md:text-6xl font-black tracking-tighter">TECH<br><span class="text-gray-600">ABILITIES.</span></h2>
                    <div class="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" id="spotlight-container">
                <!-- Card 1 -->
                <div class="clip-reveal" style="transition-delay: 0.1s;">
                    <div class="spotlight glass-modern p-8 rounded-3xl h-full border border-white/5 hover:border-white/20 transition-colors z-10 relative flex flex-col justify-between">
                        <div class="relative z-10">
                            <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                <span class="text-white font-bold text-xl">01</span>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-3">Web Architecture</h3>
                            <p class="text-gray-400 text-base mb-6 leading-relaxed font-light">Building robust, high-performance web applications with modern stacks. Seamlessly blending backend logic with beautiful frontend UI.</p>
                        </div>
                        <div class="flex flex-wrap gap-2 relative z-10 mt-auto">
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">PHP</span>
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">Laravel</span>
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">Tailwind</span>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="clip-reveal" style="transition-delay: 0.2s;">
                    <div class="spotlight glass-modern p-8 rounded-3xl h-full border border-white/5 hover:border-white/20 transition-colors z-10 relative flex flex-col justify-between">
                        <div class="relative z-10">
                            <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                <span class="text-white font-bold text-xl">02</span>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-3">Android Studio</h3>
                            <p class="text-gray-400 text-base mb-6 leading-relaxed font-light">Translating great work ideas into functional native mobile applications. Focusing on intuitive user experiences and performance.</p>
                        </div>
                        <div class="flex flex-wrap gap-2 relative z-10 mt-auto">
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">Java / Kotlin</span>
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">UX Design</span>
                        </div>
                    </div>
                </div>

                <!-- Card 3: Game Developer -->
                <div class="clip-reveal" style="transition-delay: 0.3s;">
                    <div class="spotlight glass-modern p-8 rounded-3xl h-full border border-white/5 hover:border-white/20 transition-colors z-10 relative flex flex-col justify-between">
                        <div class="relative z-10">
                            <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                <span class="text-white font-bold text-xl">03</span>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-3">Game Developer</h3>
                            <p class="text-gray-400 text-base mb-6 leading-relaxed font-light">Crafting immersive game mechanics, real-time physics, and engaging interactive experiences across multiple game engines.</p>
                        </div>
                        <div class="flex flex-wrap gap-2 relative z-10 mt-auto">
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">Unity 6</span>
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">Godot 4</span>
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">HTML5</span>
                        </div>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="clip-reveal" style="transition-delay: 0.4s;">
                    <div class="spotlight glass-modern p-8 rounded-3xl h-full border border-white/5 hover:border-white/20 transition-colors z-10 relative flex flex-col justify-between">
                        <div class="relative z-10">
                            <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                <span class="text-white font-bold text-xl">04</span>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-3">Interactive Design</h3>
                            <p class="text-gray-400 text-base mb-6 leading-relaxed font-light">Bringing the high-octane energy of gaming into digital environments. Developing modern, fluid, and memorable interfaces.</p>
                        </div>
                        <div class="flex flex-wrap gap-2 relative z-10 mt-auto">
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">Animations</span>
                            <span class="text-xs font-medium px-3 py-1 bg-white/5 text-white rounded-full">Flowbite</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-32 relative z-10 bg-[#030303] border-t border-white/5">
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-16">
                <div class="clip-reveal">
                    <h2 class="text-5xl md:text-7xl font-black tracking-tighter mb-8">INITIATE<br><span class="text-violet-500">CO-OP.</span></h2>
                    <p class="text-xl text-gray-400 font-light mb-12 max-w-md">Ready to spawn into a new project? Reach out directly or follow my work across GitHub and YouTube.</p>
                    
                    <div class="space-y-6">
                        <!-- Comms Line -->
                        <a href="tel:01888574160" class="flex items-center gap-6 group">
                            <div class="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 uppercase tracking-widest font-medium">Comms Line</p>
                                <p class="text-2xl font-medium">01888574160</p>
                            </div>
                        </a>
                        
                        <!-- Email Drop -->
                        <a href="mailto:dquadofficialgg@gmail.com" class="flex items-center gap-6 group">
                            <div class="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 uppercase tracking-widest font-medium">Email Drop</p>
                                <p class="text-xl font-medium">dquadofficialgg@gmail.com</p>
                            </div>
                        </a>

                        <!-- GitHub Profile -->
                        <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="flex items-center gap-6 group">
                            <div class="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 uppercase tracking-widest font-medium">Source Repos</p>
                                <p class="text-xl font-medium">github.com/dquad90</p>
                            </div>
                        </a>

                        <!-- YouTube Channel -->
                        <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="flex items-center gap-6 group">
                            <div class="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 uppercase tracking-widest font-medium">Gaming & Broadcasts</p>
                                <p class="text-xl font-medium">youtube.com/@dquaddq</p>
                            </div>
                        </a>
                    </div>
                </div>
                
                <!-- Modern Minimal Form -->
                <div class="clip-reveal" style="transition-delay: 0.2s;">
                    <form class="glass-modern p-8 md:p-12 rounded-3xl spotlight">
                        <h3 class="text-2xl font-bold mb-8">Send Transmission</h3>
                        <div class="mb-8">
                            <input type="email" id="email" class="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:border-white text-white text-lg py-3 px-0 transition-colors placeholder:text-gray-600" placeholder="Your Email Address" required>
                        </div>
                        <div class="mb-10">
                            <textarea id="message" rows="3" class="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:border-white text-white text-lg py-3 px-0 transition-colors placeholder:text-gray-600 resize-none" placeholder="Mission Briefing (Your Message)" required></textarea>
                        </div>
                        <button type="submit" class="w-full bg-white text-black font-bold rounded-full text-lg px-8 py-4 text-center hover:bg-gray-200 transition-colors">
                            Launch Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12">
        <div class="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center space-x-3">
                <span class="text-2xl font-bold tracking-tighter text-white">DQUAD</span>
                <span class="text-xs text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">v1.0</span>
            </div>
            
            <div class="flex items-center space-x-6 text-gray-400">
                <a href="https://github.com/dquad90" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors p-1" title="GitHub">
                    <span class="sr-only">GitHub</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                </a>
                <a href="https://www.youtube.com/@dquaddq" target="_blank" rel="noopener noreferrer" class="hover:text-red-500 transition-colors p-1" title="YouTube">
                    <span class="sr-only">YouTube</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" /></svg>
                </a>
            </div>

            <p class="text-gray-500 text-sm font-medium">© 2026 Darun Naim Sindid. All rights reserved.</p>
        </div>
    </footer>

    <!-- Modern Scripts -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Intersection Observer for scroll reveals
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            });

            document.querySelectorAll('.clip-reveal').forEach((el) => {
                revealObserver.observe(el);
            });

            // Spotlight Mouse Tracking for modern cards
            const spotlights = document.querySelectorAll('.spotlight');
            
            spotlights.forEach(el => {
                el.addEventListener('mousemove', e => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    el.style.setProperty('--mouse-x', `${x}px`);
                    el.style.setProperty('--mouse-y', `${y}px`);
                });
            });
        });
    </script>
</body>
</html>