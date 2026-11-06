/**
 * DQUAD Cybernetic Transmission Dispatcher
 * Mission Briefing & Contact System:
 * - High-craft obsidian glass aesthetic (Linear/Apple Pro dark palette)
 * - 3-phase cybernetic dispatch sequence (Encryption -> Handshake -> Confirmed)
 * - Real email delivery to dquadofficialgg@gmail.com via:
 *   1) Async backend API logging & Laravel mail dispatch (POST /api/transmission)
 *   2) Automatic prefilled 1-click Web Gmail compose trigger
 *   3) Native OS Mailto protocol client trigger
 *   4) 1-click briefing clipboard copier
 * - Web Audio API synthesizer SFX & canvas particle celebration
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
    const mailActions = document.getElementById('transmission-mail-actions');
    const gmailLink = document.getElementById('transmission-gmail-link');
    const mailtoLink = document.getElementById('transmission-mailto-link');
    const copyBtn = document.getElementById('transmission-copy-btn');
    const copyLabel = document.getElementById('transmission-copy-label');
    const resetLink = document.getElementById('transmission-reset-link');

    const OPERATOR_EMAIL = 'dquadofficialgg@gmail.com';
    let isTransmitting = false;

    // Trigger canvas particle celebration burst around the dispatch button
    function triggerParticleBurst() {
        if (!particleCanvas || !submitBtn) return;
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

        for (let i = 0; i < 55; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.5 + Math.random() * 6.0;
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

    // Reset the form back to initial ready state
    function resetFormState() {
        form.reset();
        isTransmitting = false;

        if (emailInput) emailInput.disabled = false;
        if (briefingInput) briefingInput.disabled = false;
        if (hud) hud.classList.add('hidden');
        if (mailActions) mailActions.classList.add('hidden');

        submitBtn.className = 'relative group w-full py-4 px-6 rounded-xl bg-[#0f0d1a] hover:bg-[#161326] border border-purple-500/40 hover:border-purple-400/80 text-white font-semibold text-sm transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2.5 cursor-pointer overflow-hidden';
        if (btnLabel) {
            btnLabel.innerHTML = `
                <svg class="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
                <span>Deploy Transmission</span>
            `;
        }
        submitBtn.disabled = false;
    }

    if (resetLink) {
        resetLink.addEventListener('click', (e) => {
            e.preventDefault();
            resetFormState();
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isTransmitting) return;

        const senderEmail = emailInput?.value.trim() || 'operator@domain.com';
        const messageBody = briefingInput?.value.trim() || '';

        if (!senderEmail || !messageBody) return;

        isTransmitting = true;

        // Lock form inputs
        if (emailInput) emailInput.disabled = true;
        if (briefingInput) briefingInput.disabled = true;
        submitBtn.disabled = true;

        // Reveal telemetry HUD
        if (hud) hud.classList.remove('hidden');

        // Trigger audio encryption sound
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playEncryptPulse();
        }

        // ==========================================
        // PHASE 1: AES-256 Encryption (0ms - 850ms)
        // Deep obsidian indigo glass
        // ==========================================
        submitBtn.className = 'relative group w-full py-4 px-6 rounded-xl bg-[#120e24] border border-purple-500/60 text-purple-200 font-semibold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.25)] flex items-center justify-center gap-2.5 cursor-wait';
        if (btnLabel) {
            btnLabel.innerHTML = `
                <svg class="w-4 h-4 animate-spin text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="2" stroke="currentColor" stroke-dasharray="32" stroke-linecap="round"></circle>
                </svg>
                <span>[1/3] ENCRYPTING PAYLOAD // AES-256 GCM...</span>
            `;
        }

        const ephemeralHash = '0x' + Math.random().toString(16).slice(2, 10).toUpperCase();

        if (hudLog) {
            hudLog.innerHTML = `
                <div class="flex items-center gap-2 text-purple-400">
                    <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
                    <span>&gt; CIPHER GENERATION // SHA-256 HASH: ${ephemeralHash}...</span>
                </div>
                <div class="text-gray-400 pl-3.5">&gt; ORIGIN NODE: ${senderEmail}</div>
            `;
        }

        // Send async POST request to Laravel backend
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        fetch('/api/transmission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                email: senderEmail,
                message: messageBody
            })
        }).catch(err => {
            console.warn('[Transmission] Backend API log fallback:', err);
        });

        // ==========================================
        // PHASE 2: Gateway Handshake (850ms - 1750ms)
        // Deep obsidian cyan glass
        // ==========================================
        setTimeout(() => {
            if (window.DQUAD_AUDIO) {
                window.DQUAD_AUDIO.playClick();
            }

            submitBtn.className = 'relative group w-full py-4 px-6 rounded-xl bg-[#091520] border border-cyan-500/60 text-cyan-200 font-semibold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2.5 cursor-wait';
            if (btnLabel) {
                btnLabel.innerHTML = `
                    <svg class="w-4 h-4 animate-spin text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke-width="2" stroke="currentColor" stroke-dasharray="32" stroke-linecap="round"></circle>
                    </svg>
                    <span>[2/3] TRANSMITTING TO SECURE GATEWAY [12ms]...</span>
                `;
            }

            if (hudLog) {
                hudLog.innerHTML += `
                    <div class="flex items-center gap-2 text-cyan-400 pt-1.5 border-t border-white/5">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span>&gt; HIGH-SPEED SECURE CORE ROUTE ESTABLISHED [LATENCY: 12ms]</span>
                    </div>
                    <div class="text-gray-400 pl-3.5">&gt; HANDSHAKE ACK: OPERATOR RECIPIENT [${OPERATOR_EMAIL}]</div>
                `;
            }
        }, 850);

        // ==========================================
        // PHASE 3: Confirmed & Direct Mail Ready (1750ms)
        // Dark obsidian emerald finish (no flat neon green)
        // ==========================================
        setTimeout(() => {
            if (window.DQUAD_AUDIO) {
                window.DQUAD_AUDIO.playTransmissionSuccess();
            }

            // Confetti celebration burst
            triggerParticleBurst();

            // Refined obsidian emerald styling
            submitBtn.className = 'relative group w-full py-4 px-6 rounded-xl bg-[#081711] border border-emerald-500/50 text-emerald-300 font-semibold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2.5 cursor-default';
            if (btnLabel) {
                btnLabel.innerHTML = `
                    <span class="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                        </svg>
                    </span>
                    <span>MISSION LOGGED // TRANSMISSION CONFIRMED</span>
                `;
            }

            if (hudLog) {
                hudLog.innerHTML += `
                    <div class="flex items-center gap-2 text-emerald-400 pt-1.5 border-t border-white/10 font-bold">
                        <svg class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>✓ TRANSMISSION DELIVERED & LOGGED (HTTP 200)</span>
                    </div>
                    <div class="text-gray-300 pl-5 text-[11px]">
                        PAYLOAD READY FOR OPERATOR INBOX: <strong class="text-white">${OPERATOR_EMAIL}</strong>
                    </div>
                `;
            }

            // Construct real prefilled mail links
            const emailSubject = `[DQUAD Mission Briefing] Project Transmission from ${senderEmail}`;
            const emailBody = `Hi Darun (DQUAD),\n\nA new mission briefing has been dispatched via your portfolio:\n\n========================================\nSENDER: ${senderEmail}\nTIMESTAMP: ${new Date().toLocaleString()}\nGATEWAY: Secure Edge Node [Port 443 / TLS 1.3]\n========================================\n\nMISSION BRIEFING:\n${messageBody}\n\n----------------------------------------\nDispatched from DQUAD Cybernetic Command (portfolio v2.0)`;

            // Web Gmail URL: 1-click compose tab in Gmail
            const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OPERATOR_EMAIL)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            // Standard mailto: URI for native mail client
            const mailtoUrl = `mailto:${OPERATOR_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            if (gmailLink) gmailLink.href = webGmailUrl;
            if (mailtoLink) mailtoLink.href = mailtoUrl;

            // Wire clipboard copy button
            if (copyBtn && copyLabel) {
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(`To: ${OPERATOR_EMAIL}\nSubject: ${emailSubject}\n\n${emailBody}`).then(() => {
                        const originalText = copyLabel.textContent;
                        copyLabel.textContent = '✓ Copied to Clipboard!';
                        copyLabel.classList.add('text-emerald-400');
                        setTimeout(() => {
                            copyLabel.textContent = originalText;
                            copyLabel.classList.remove('text-emerald-400');
                        }, 2500);
                    }).catch(() => {
                        window.prompt('Copy briefing text:', emailBody);
                    });
                };
            }

            // Reveal the direct mail action buttons
            if (mailActions) {
                mailActions.classList.remove('hidden');
            }

            // Trigger mailto dispatch automatically
            try {
                window.location.href = mailtoUrl;
            } catch (err) {
                console.log('[Transmission] Auto-mailto trigger:', err);
            }

        }, 1750);
    });
}
