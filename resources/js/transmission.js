/**
 * DQUAD Cybernetic Transmission Dispatcher
 * Turns the static contact form into a memorable mission briefing sequence:
 * - Morphing button states with live telemetry progress
 * - AES-256 encryption simulation & Dhaka gateway handshake
 * - Neon particle celebration burst
 * - Procedural Web Audio API sound sequence
 */

export function initTransmissionDispatcher() {
    const form = document.getElementById('transmission-form');
    if (!form) return;

    const emailInput = document.getElementById('transmission-email');
    const briefingInput = document.getElementById('transmission-briefing');
    const submitBtn = document.getElementById('transmission-submit-btn');
    const btnLabel = document.getElementById('transmission-btn-label');
    const hud = document.getElementById('transmission-telemetry-hud');
    const hudLog = document.getElementById('transmission-hud-log');
    const particleCanvas = document.getElementById('transmission-particle-canvas');

    let isTransmitting = false;

    // Trigger canvas particle burst around the button
    function triggerParticleBurst() {
        if (!particleCanvas) return;
        const rect = submitBtn.getBoundingClientRect();
        const canvasRect = particleCanvas.getBoundingClientRect();

        particleCanvas.width = canvasRect.width;
        particleCanvas.height = canvasRect.height;
        const ctx = particleCanvas.getContext('2d');
        if (!ctx) return;

        const originX = rect.left - canvasRect.left + rect.width / 2;
        const originY = rect.top - canvasRect.top + rect.height / 2;

        const particles = [];
        const colors = ['#38bdf8', '#34d399', '#ec4899', '#f59e0b', '#a855f7', '#ffffff'];

        for (let i = 0; i < 60; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.5 + Math.random() * 6.5;
            particles.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 2 + Math.random() * 3,
                alpha: 1,
                decay: 0.015 + Math.random() * 0.02
            });
        }

        function renderParticles() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            let activeCount = 0;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;
                p.alpha -= p.decay;

                if (p.alpha > 0) {
                    activeCount++;
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.color;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            });

            if (activeCount > 0) {
                requestAnimationFrame(renderParticles);
            } else {
                ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            }
        }

        requestAnimationFrame(renderParticles);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isTransmitting) return;

        const email = emailInput?.value.trim() || 'player@domain.com';
        const briefing = briefingInput?.value.trim() || '';

        if (!email || !briefing) return;

        isTransmitting = true;

        // Lock form inputs
        if (emailInput) emailInput.disabled = true;
        if (briefingInput) briefingInput.disabled = true;

        // Show HUD
        if (hud) hud.classList.remove('hidden');

        // Audio encryption trigger
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playEncryptPulse();
        }

        // ==========================================
        // PHASE 1: AES-256 Encryption (0ms - 800ms)
        // ==========================================
        submitBtn.className = 'w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white font-black text-sm shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 cursor-wait animate-pulse';
        if (btnLabel) {
            btnLabel.innerHTML = `
                <svg class="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>[1/3] ENCRYPTING PAYLOAD // AES-256 GCM...</span>
            `;
        }

        if (hudLog) {
            hudLog.innerHTML = `
                <div class="flex items-center gap-2 text-cyan-400">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    <span>&gt; GENERATING EPHEMERAL CIPHER KEY // SHA-256: 9E4F...8B12</span>
                </div>
                <div class="text-gray-400 pl-3.5">&gt; PACKET SIGNATURE CREATED FOR: ${email}</div>
            `;
        }

        // ==========================================
        // PHASE 2: Transmission Handshake (800ms - 1700ms)
        // ==========================================
        setTimeout(() => {
            if (window.DQUAD_AUDIO) {
                window.DQUAD_AUDIO.playClick();
            }

            if (btnLabel) {
                btnLabel.innerHTML = `
                    <svg class="w-4 h-4 animate-spin text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke-width="2" stroke="currentColor" stroke-dasharray="32" stroke-linecap="round"></circle>
                    </svg>
                    <span>[2/3] TRANSMITTING TO DHAKA GATEWAY [12ms]...</span>
                `;
            }

            if (hudLog) {
                hudLog.innerHTML += `
                    <div class="flex items-center gap-2 text-amber-400 pt-1 border-t border-white/5">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        <span>&gt; ROUTING PACKET VIA BDIX HIGH-SPEED CORE...</span>
                    </div>
                    <div class="text-gray-400 pl-3.5">&gt; HANDSHAKE ESTABLISHED WITH DQUAD OPERATOR NODE [LATENCY: 12ms]</div>
                `;
            }
        }, 850);

        // ==========================================
        // PHASE 3: Confirmed & Celebration (1700ms)
        // ==========================================
        setTimeout(() => {
            // Uplifting victory fanfare sound
            if (window.DQUAD_AUDIO) {
                window.DQUAD_AUDIO.playTransmissionSuccess();
            }

            // Confetti particle burst
            triggerParticleBurst();

            submitBtn.className = 'w-full py-4 rounded-xl bg-emerald-400 text-black font-black text-sm shadow-[0_0_35px_rgba(52,211,153,0.7)] transition-all flex items-center justify-center gap-2 cursor-default';
            if (btnLabel) {
                btnLabel.innerHTML = `
                    <svg class="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>[3/3] MISSION LOGGED // TRANSMISSION CONFIRMED</span>
                `;
            }

            if (hudLog) {
                hudLog.innerHTML += `
                    <div class="flex items-center gap-2 text-emerald-400 pt-1.5 border-t border-white/10 font-bold">
                        <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                        <span>✓ TRANSMISSION DELIVERED // HTTP 200 SUCCESS</span>
                    </div>
                    <div class="text-gray-300 pl-5 text-[10px]">
                        OPERATOR ACKNOWLEDGED • COPY QUEUED FOR: <strong class="text-white">dquadofficialgg@gmail.com</strong>
                    </div>
                `;
            }

            // Show reset button after 3 seconds
            setTimeout(() => {
                if (btnLabel) {
                    btnLabel.innerHTML = `
                        <span>TRANSMIT ANOTHER MISSION ↻</span>
                    `;
                    submitBtn.classList.add('hover:bg-emerald-300', 'cursor-pointer');
                    submitBtn.onclick = () => {
                        form.reset();
                        if (emailInput) emailInput.disabled = false;
                        if (briefingInput) briefingInput.disabled = false;
                        if (hud) hud.classList.add('hidden');
                        submitBtn.className = 'w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all shadow-xl cursor-pointer';
                        btnLabel.innerHTML = `<span>Deploy Transmission</span>`;
                        submitBtn.onclick = null;
                        isTransmitting = false;
                    };
                }
            }, 3200);
        }, 1750);
    });
}
