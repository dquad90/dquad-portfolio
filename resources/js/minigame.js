/**
 * DQUAD VECTOR INTERCEPTOR // Bento Canvas Mini-Game
 * Features:
 * - 60 FPS HTML5 Canvas Vector Combat
 * - Multi-input: Mouse aim/click, WASD / Arrow Keys + Space, and Physical Gamepad!
 * - Autonomous showcase AI when idle, instant manual control on interaction
 * - Particle explosions & Web Audio API laser/explosion sound effects
 */

export function initBentoMiniGame() {
    const canvas = document.getElementById('bento-game-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth || 380;
    let height = canvas.clientHeight || 200;
    canvas.width = width * (window.devicePixelRatio > 1 ? 2 : 1);
    canvas.height = height * (window.devicePixelRatio > 1 ? 2 : 1);
    ctx.scale(window.devicePixelRatio > 1 ? 2 : 1, window.devicePixelRatio > 1 ? 2 : 1);

    function resize() {
        if (!canvas) return;
        width = canvas.clientWidth || 380;
        height = canvas.clientHeight || 200;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);

    // Game State
    let isManual = false;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('dquad_game_high') || '1200', 10);
    let lastShootTime = 0;

    // Player Ship
    const player = {
        x: width * 0.25,
        y: height * 0.5,
        vx: 0,
        vy: 0,
        angle: 0,
        speed: 4.5,
        radius: 12
    };

    // Arrays
    const lasers = [];
    const drones = [];
    const particles = [];
    const stars = [];

    // Background ambient starfield
    for (let i = 0; i < 40; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speed: 0.3 + Math.random() * 0.8,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.6 + 0.2
        });
    }

    // Input state
    const keys = { w: false, a: false, s: false, d: false, space: false };
    let mouseAimX = width * 0.7;
    let mouseAimY = height * 0.5;
    let isMouseOver = false;

    canvas.addEventListener('mouseenter', () => {
        isMouseOver = true;
        isManual = true;
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseAimX = e.clientX - rect.left;
        mouseAimY = e.clientY - rect.top;
        isManual = true;
    });

    canvas.addEventListener('mouseleave', () => {
        isMouseOver = false;
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseAimX = e.clientX - rect.left;
        mouseAimY = e.clientY - rect.top;
        isManual = true;
        fireLaser();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') keys.w = true;
        if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') keys.s = true;
        if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') keys.a = true;
        if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') keys.d = true;
        if (e.key === ' ' || e.key === 'Spacebar') {
            keys.space = true;
            if (isMouseOver) e.preventDefault();
        }
        if (keys.w || keys.a || keys.s || keys.d || keys.space) {
            isManual = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') keys.w = false;
        if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') keys.s = false;
        if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') keys.a = false;
        if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') keys.d = false;
        if (e.key === ' ' || e.key === 'Spacebar') keys.space = false;
    });

    // Weapon firing
    function fireLaser() {
        const now = performance.now();
        if (now - lastShootTime < 140) return; // Fire rate limit
        lastShootTime = now;

        const forwardX = Math.cos(player.angle);
        const forwardY = Math.sin(player.angle);

        // Double pulse lasers from wings
        const perpX = -forwardY * 7;
        const perpY = forwardX * 7;

        lasers.push({
            x: player.x + forwardX * 14 + perpX,
            y: player.y + forwardY * 14 + perpY,
            vx: forwardX * 9,
            vy: forwardY * 9,
            life: 60
        });

        lasers.push({
            x: player.x + forwardX * 14 - perpX,
            y: player.y + forwardY * 14 - perpY,
            vx: forwardX * 9,
            vy: forwardY * 9,
            life: 60
        });

        // Trigger Web Audio API sound
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playControllerButton('CORAL');
        }
    }

    // Spawn Enemy Drones
    let lastDroneSpawn = 0;
    function spawnDrone() {
        const colors = ['#a855f7', '#ec4899', '#f59e0b', '#38bdf8'];
        drones.push({
            x: width + 20,
            y: Math.random() * (height - 40) + 20,
            vx: -(1.2 + Math.random() * 1.5),
            vy: (Math.random() - 0.5) * 0.8,
            radius: 12 + Math.random() * 5,
            hp: 2,
            maxHp: 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.05
        });
    }

    // Spawn Explosion Particles
    function spawnExplosion(x, y, color) {
        for (let i = 0; i < 16; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 4;
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 30 + Math.random() * 20,
                maxLife: 50,
                size: 1.5 + Math.random() * 2,
                color
            });
        }
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playClick();
        }
    }

    // Main Game Loop (60 FPS)
    let animationFrameId;
    let lastTime = performance.now();

    function gameLoop(now) {
        animationFrameId = requestAnimationFrame(gameLoop);

        // Hardware Gamepad polling for the Mini-Game
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if (gamepads && gamepads[0] && gamepads[0].connected) {
            const gp = gamepads[0];
            const ax0 = gp.axes[0] || 0;
            const ax1 = gp.axes[1] || 0;

            if (Math.abs(ax0) > 0.18 || Math.abs(ax1) > 0.18) {
                isManual = true;
                player.x += ax0 * player.speed;
                player.y += ax1 * player.speed;
                player.angle = Math.atan2(ax1, ax0);
            }

            // Right stick aiming
            const ax2 = gp.axes[2] || 0;
            const ax3 = gp.axes[3] || 0;
            if (Math.abs(ax2) > 0.2 || Math.abs(ax3) > 0.2) {
                isManual = true;
                player.angle = Math.atan2(ax3, ax2);
            }

            // Fire on button A or R1
            if ((gp.buttons[0] && gp.buttons[0].pressed) || (gp.buttons[5] && gp.buttons[5].pressed)) {
                isManual = true;
                fireLaser();
            }
        }

        // Spawn drone cadence
        if (now - lastDroneSpawn > 1400) {
            if (drones.length < 6) {
                spawnDrone();
            }
            lastDroneSpawn = now;
        }

        // Control Logic (Manual vs Autonomous AI Showcase)
        if (isManual) {
            // Keyboard Controls
            if (keys.w) player.y -= player.speed;
            if (keys.s) player.y += player.speed;
            if (keys.a) player.x -= player.speed;
            if (keys.d) player.x += player.speed;
            if (keys.space) fireLaser();

            // Mouse Aim
            if (isMouseOver) {
                const targetAngle = Math.atan2(mouseAimY - player.y, mouseAimX - player.x);
                player.angle = targetAngle;
                // Gently gravitate toward mouse
                player.x += (mouseAimX - player.x) * 0.05;
                player.y += (mouseAimY - player.y) * 0.05;
            }
        } else {
            // Autonomous Patrol Mode
            const target = drones[0];
            if (target) {
                const targetAngle = Math.atan2(target.y - player.y, target.x - player.x);
                player.angle += (targetAngle - player.angle) * 0.08;
                player.y += Math.sin(now * 0.002) * 1.2;

                // Auto-fire at target when aligned
                if (Math.abs(targetAngle - player.angle) < 0.2 && Math.random() < 0.06) {
                    fireLaser();
                }
            } else {
                player.angle = Math.sin(now * 0.001) * 0.3;
                player.y = height * 0.5 + Math.sin(now * 0.002) * 20;
            }
        }

        // Keep player in bounds
        player.x = Math.max(player.radius + 5, Math.min(width - player.radius - 5, player.x));
        player.y = Math.max(player.radius + 5, Math.min(height - player.radius - 5, player.y));

        // Update Lasers
        for (let i = lasers.length - 1; i >= 0; i--) {
            const l = lasers[i];
            l.x += l.vx;
            l.y += l.vy;
            l.life--;

            // Check collision with drones
            for (let j = drones.length - 1; j >= 0; j--) {
                const d = drones[j];
                const dist = Math.hypot(l.x - d.x, l.y - d.y);
                if (dist < d.radius + 4) {
                    d.hp--;
                    l.life = 0;
                    if (d.hp <= 0) {
                        spawnExplosion(d.x, d.y, d.color);
                        drones.splice(j, 1);
                        score += 150;
                        if (score > highScore) {
                            highScore = score;
                            localStorage.setItem('dquad_game_high', highScore.toString());
                        }
                    }
                    break;
                }
            }

            if (l.life <= 0 || l.x > width + 20 || l.x < -20 || l.y > height + 20 || l.y < -20) {
                lasers.splice(i, 1);
            }
        }

        // Update Drones
        for (let i = drones.length - 1; i >= 0; i--) {
            const d = drones[i];
            d.x += d.vx;
            d.y += d.vy;
            d.rot += d.rotSpeed;

            // Bounce off top/bottom
            if (d.y < d.radius || d.y > height - d.radius) {
                d.vy *= -1;
            }

            if (d.x < -d.radius - 20) {
                drones.splice(i, 1);
            }
        }

        // Update Particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.94;
            p.vy *= 0.94;
            p.life--;
            if (p.life <= 0) particles.splice(i, 1);
        }

        // -------------------------------------------------------------
        // DRAWING SCENE
        // -------------------------------------------------------------
        ctx.clearRect(0, 0, width, height);

        // Background subtle grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 24;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Stars
        stars.forEach(s => {
            s.x -= s.speed;
            if (s.x < 0) s.x = width;
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.fillRect(s.x, s.y, s.size, s.size);
        });

        // Draw Lasers
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#06b6d4';
        lasers.forEach(l => {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            ctx.lineTo(l.x - l.vx * 1.5, l.y - l.vy * 1.5);
            ctx.stroke();
        });
        ctx.shadowBlur = 0;

        // Draw Drones
        drones.forEach(d => {
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.rotate(d.rot);

            ctx.shadowBlur = 10;
            ctx.shadowColor = d.color;
            ctx.strokeStyle = d.color;
            ctx.lineWidth = 1.8;

            // Draw Hexagon drone
            ctx.beginPath();
            for (let a = 0; a < 6; a++) {
                const ang = (Math.PI / 3) * a;
                const hx = Math.cos(ang) * d.radius;
                const hy = Math.sin(ang) * d.radius;
                if (a === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();

            // Inner Core
            ctx.fillStyle = d.color;
            ctx.beginPath();
            ctx.arc(0, 0, d.radius * 0.35, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });

        // Draw Particles
        particles.forEach(p => {
            const alpha = p.life / p.maxLife;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Draw Player Ship
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(player.angle);

        // Engine Thruster Flame
        const flameLength = 8 + Math.random() * 8;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ec4899';
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(-10, -4);
        ctx.lineTo(-10 - flameLength, 0);
        ctx.lineTo(-10, 4);
        ctx.closePath();
        ctx.fill();

        // Ship Body (Vector Cyber Fighter)
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#06b6d4';
        ctx.strokeStyle = '#38bdf8';
        ctx.fillStyle = '#0a0a14';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(-10, -9);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, 9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cockpit
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(2, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.shadowBlur = 0;

        // Top HUD Overlay
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(`SCORE: ${score.toString().padStart(4, '0')}`, 14, 18);
        ctx.fillText(`HIGH: ${highScore.toString().padStart(4, '0')}`, 100, 18);

        ctx.fillStyle = isManual ? '#34d399' : '#38bdf8';
        const statusText = isManual ? '● MANUAL OVERRIDE' : '○ AUTONOMOUS PATROL';
        ctx.fillText(statusText, width - ctx.measureText(statusText).width - 14, 18);
    }

    requestAnimationFrame(gameLoop);
}
