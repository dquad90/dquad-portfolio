/**
 * High-End Ambient Studio Lighting & Fluid Aurora Canvas (Linear / Apple Pro Aesthetic)
 * Smooth, organic, and ultra-professional.
 * Zero wireframes, zero clutter.
 */
export function initAmbientBackground() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Smooth mouse coordinates with viscous spring lag
    let mouseX = width / 2;
    let mouseY = height / 3;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    }, { passive: true });

    // Organic luminous color nodes drifting smoothly across the background
    const orbs = [
        {
            // Primary Royal Indigo/Violet (Top Center / Hero)
            baseX: 0.5,
            baseY: 0.2,
            radius: 520,
            color: 'rgba(99, 102, 241, 0.16)', // Indigo
            speed: 0.0006,
            phase: 0
        },
        {
            // Subtle Rose / Magenta Glow (Center Right / Bento & Comms)
            baseX: 0.75,
            baseY: 0.55,
            radius: 460,
            color: 'rgba(217, 70, 239, 0.12)', // Fuchsia
            speed: 0.0008,
            phase: Math.PI / 2
        },
        {
            // Deep Cyber Cyan (Left Flank / Profile)
            baseX: 0.22,
            baseY: 0.65,
            radius: 480,
            color: 'rgba(6, 182, 212, 0.11)', // Cyan
            speed: 0.0005,
            phase: Math.PI
        },
        {
            // Deep Midnight Purple (Bottom / Transmission)
            baseX: 0.5,
            baseY: 0.88,
            radius: 550,
            color: 'rgba(139, 92, 246, 0.14)', // Violet
            speed: 0.0007,
            phase: Math.PI * 1.5
        }
    ];

    let lastScroll = window.scrollY;

    function render(time) {
        // Smoothly lerp mouse coordinates
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        ctx.clearRect(0, 0, width, height);

        // 1. Render Smooth Organic Fluid Orbs
        orbs.forEach((orb) => {
            // Harmonic floating motion
            const wobbleX = Math.sin(time * orb.speed + orb.phase) * (width * 0.12);
            const wobbleY = Math.cos(time * orb.speed * 0.8 + orb.phase) * (height * 0.08);

            const x = orb.baseX * width + wobbleX;
            const y = orb.baseY * height + wobbleY;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius);
            gradient.addColorStop(0, orb.color);
            gradient.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, '0.04)'));
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, orb.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // 2. Interactive Cursor Ambient Spotlight (Linear.app style)
        const mouseGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 380);
        mouseGradient.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
        mouseGradient.addColorStop(0.4, 'rgba(99, 102, 241, 0.05)');
        mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = mouseGradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 380, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
