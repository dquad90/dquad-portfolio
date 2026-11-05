/**
 * DQUAD Konami Code Secret Achievement Engine
 * Sequence: [↑, ↑, ↓, ↓, ←, →, ←, →, B, A]
 * 
 * Supports:
 * - Keyboard (Arrow keys / WASD + B, A)
 * - 3D Controller interactive candy buttons & D-pad clicks
 * - Hardware Physical Gamepad (D-Pad + B/A buttons)
 * 
 * Secret Unlocks:
 * - Steam / Xbox style achievement toast notification
 * - Uplifting 8-bit retro arcade synth triumph fanfare
 * - 10-Second Rainbow Holographic Overdrive mode across hairline beams
 * - Prismatic celebratory confetti burst
 */

export function initKonamiCode() {
    const KONAMI_SEQUENCE = [
        'up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'
    ];

    let currentInputIndex = 0;
    let overdriveTimerInterval = null;
    let overdriveTimeout = null;
    let isOverdriveActive = false;

    const toast = document.getElementById('konami-achievement-toast');
    const toastCloseBtn = document.getElementById('konami-toast-close');
    const overdriveHud = document.getElementById('konami-overdrive-hud');
    const overdriveTimer = document.getElementById('konami-overdrive-timer');
    const confettiCanvas = document.getElementById('konami-confetti-canvas');

    // Confetti celebration particle burst
    function triggerKonamiConfetti() {
        if (!confettiCanvas) return;
        const ctx = confettiCanvas.getContext('2d');
        if (!ctx) return;

        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particles = [];
        const colors = [
            '#ff0055', '#ff5500', '#ffdd00', '#00ff66', '#00ccff', '#a855f7', '#ec4899', '#ffffff'
        ];

        // Launch celebratory confetti from the top across viewport
        for (let i = 0; i < 140; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: -10 + Math.random() * -50,
                vx: (Math.random() - 0.5) * 8,
                vy: 3.5 + Math.random() * 8.5,
                size: 4 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.25,
                alpha: 1,
                decay: 0.005 + Math.random() * 0.008
            });
        }

        function renderConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let active = 0;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.14; // Gravity
                p.rotation += p.rotSpeed;
                p.alpha -= p.decay;

                if (p.alpha > 0 && p.y < confettiCanvas.height + 60) {
                    active++;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
                    ctx.restore();
                }
            });

            if (active > 0) {
                requestAnimationFrame(renderConfetti);
            } else {
                ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            }
        }

        requestAnimationFrame(renderConfetti);
    }

    // Trigger the secret achievement unlock sequence!
    function triggerSecretAchievement() {
        if (isOverdriveActive) return;
        isOverdriveActive = true;

        // Persist secret unlock
        try {
            localStorage.setItem('dquad_achievement_konami', 'unlocked');
        } catch (e) {}

        // 1. Play authentic retro 8-bit synth fanfare
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playKonamiFanfare();
        }

        // 2. Launch full-screen confetti burst
        triggerKonamiConfetti();

        // 3. Drop Steam / Xbox Achievement Toast from top-right
        if (toast) {
            toast.classList.remove('translate-y-[-160%]', 'opacity-0', 'pointer-events-none');
            toast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        }

        // 4. Activate Rainbow Holographic Overdrive Mode
        document.body.classList.add('konami-overdrive');

        // 5. Show Top Overdrive HUD Banner with 10s countdown
        if (overdriveHud) {
            overdriveHud.classList.remove('opacity-0', '-translate-y-6');
            overdriveHud.classList.add('opacity-100', 'translate-y-0');
        }

        let timeLeft = 10.0;
        if (overdriveTimer) overdriveTimer.textContent = `${timeLeft.toFixed(1)}s`;

        clearInterval(overdriveTimerInterval);
        overdriveTimerInterval = setInterval(() => {
            timeLeft -= 0.1;
            if (timeLeft <= 0) {
                timeLeft = 0;
                clearInterval(overdriveTimerInterval);
            }
            if (overdriveTimer) overdriveTimer.textContent = `${timeLeft.toFixed(1)}s`;
        }, 100);

        // 6. After exactly 10 seconds, smoothly end Overdrive mode
        clearTimeout(overdriveTimeout);
        overdriveTimeout = setTimeout(() => {
            document.body.classList.remove('konami-overdrive');
            if (overdriveHud) {
                overdriveHud.classList.add('opacity-0', '-translate-y-6');
                overdriveHud.classList.remove('opacity-100', 'translate-y-0');
            }
            isOverdriveActive = false;

            // Slide toast out gracefully after overdrive completes
            setTimeout(() => {
                if (toast) {
                    toast.classList.add('translate-y-[-160%]', 'opacity-0', 'pointer-events-none');
                    toast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                }
            }, 1200);
        }, 10000);
    }

    // Dismiss toast manually
    if (toastCloseBtn && toast) {
        toastCloseBtn.addEventListener('click', () => {
            toast.classList.add('translate-y-[-160%]', 'opacity-0', 'pointer-events-none');
            toast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        });
    }

    // Process a normalized directional or button input
    function processInput(key) {
        if (!key) return;
        const normalized = key.toLowerCase();
        const expected = KONAMI_SEQUENCE[currentInputIndex];

        if (normalized === expected) {
            currentInputIndex++;

            // Trigger subtle progress blip on 3D controller HUD if available
            const hudFeedback = document.getElementById('hardware-hud-feedback');
            if (hudFeedback) {
                hudFeedback.textContent = `KONAMI CODE [${currentInputIndex}/10]`;
                hudFeedback.classList.remove('text-cyan-400');
                hudFeedback.classList.add('text-amber-400');
            }

            // If completed the full 10-step sequence:
            if (currentInputIndex === KONAMI_SEQUENCE.length) {
                currentInputIndex = 0;
                triggerSecretAchievement();
            }
        } else {
            // If mismatch, check if input matches starting key ('up')
            currentInputIndex = (normalized === KONAMI_SEQUENCE[0]) ? 1 : 0;
        }
    }

    // Expose global interface for 3D controller and gamepad integration
    window.DQUAD_KONAMI = {
        pushInput: processInput,
        trigger: triggerSecretAchievement,
        isOverdrive: () => isOverdriveActive
    };

    // Keyboard listener
    window.addEventListener('keydown', (e) => {
        // Ignore typing inside active input/textarea fields
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable) {
            return;
        }

        let key = null;
        if (e.code === 'ArrowUp' || e.key === 'ArrowUp') {
            key = 'up';
        } else if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
            key = 'down';
        } else if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
            key = 'left';
        } else if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
            key = 'right';
        } else if (e.code === 'KeyW' || e.key === 'w' || e.key === 'W') {
            key = 'up';
        } else if (e.code === 'KeyS' || e.key === 's' || e.key === 'S') {
            key = 'down';
        } else if (e.code === 'KeyD' || e.key === 'd' || e.key === 'D') {
            key = 'right';
        } else if (e.code === 'KeyB' || e.key === 'b' || e.key === 'B') {
            key = 'b';
        } else if (e.code === 'KeyA' || e.key === 'a' || e.key === 'A') {
            // If expected is 'left' (WASD navigation), resolve to 'left', else resolve to 'a'
            key = (KONAMI_SEQUENCE[currentInputIndex] === 'left') ? 'left' : 'a';
        }

        if (key) {
            processInput(key);
        }
    });
}
