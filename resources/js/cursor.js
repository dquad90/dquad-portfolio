/**
 * DQUAD Precision Magnetic Crosshair Cursor
 * Features:
 * - Ultra-smooth spring lerping (60 FPS)
 * - Magnetic attraction to buttons and interactive pills
 * - Precision reticle with 4-way crosshair ticks
 * - Click compression & hover expansion
 * - Automatically disabled on touch / mobile devices (pointer: fine only)
 */

export function initMagneticCursor() {
    // Only initialize on desktop devices with a precision pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Create cursor DOM elements if they don't already exist
    let dot = document.getElementById('magnetic-cursor-dot');
    let ring = document.getElementById('magnetic-cursor-ring');

    if (!dot) {
        dot = document.createElement('div');
        dot.id = 'magnetic-cursor-dot';
        dot.className = 'fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 shadow-[0_0_8px_#38bdf8]';
        document.body.appendChild(dot);
    }

    if (!ring) {
        ring = document.createElement('div');
        ring.id = 'magnetic-cursor-ring';
        ring.className = 'fixed top-0 left-0 w-8 h-8 rounded-full border border-fuchsia-400/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 flex items-center justify-center';
        ring.innerHTML = `
            <span class="absolute -top-1 left-1/2 -translate-x-1/2 w-[1.5px] h-1 bg-cyan-400/80"></span>
            <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1.5px] h-1 bg-cyan-400/80"></span>
            <span class="absolute top-1/2 -left-1 -translate-y-1/2 h-[1.5px] w-1 bg-cyan-400/80"></span>
            <span class="absolute top-1/2 -right-1 -translate-y-1/2 h-[1.5px] w-1 bg-cyan-400/80"></span>
        `;
        document.body.appendChild(ring);
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    let isHoveringInteractive = false;
    let magneticTargetX = null;
    let magneticTargetY = null;
    let isMouseDown = false;
    let isVisible = false;

    // Fast mouse tracking for immediate dot positioning
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
            ringX = mouseX;
            ringY = mouseY;
        }

        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    document.body.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    window.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    window.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    // Detect hover over interactive elements for magnetic snap
    const interactiveSelector = 'button, a, input, textarea, .holo-card, .bento-card, .sector-link, [data-magnetic]';

    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(interactiveSelector);
        if (target) {
            isHoveringInteractive = true;
            const rect = target.getBoundingClientRect();
            // Magnetize only for smaller buttons/chips (< 280px width)
            if (rect.width < 280 && rect.height < 100) {
                magneticTargetX = rect.left + rect.width / 2;
                magneticTargetY = rect.top + rect.height / 2;
            } else {
                magneticTargetX = null;
                magneticTargetY = null;
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(interactiveSelector);
        if (target) {
            isHoveringInteractive = false;
            magneticTargetX = null;
            magneticTargetY = null;
        }
    });

    // 60 FPS Spring Lerp Loop for Reticle Ring
    function animateCursor() {
        if (isVisible) {
            // Target determination (magnetic center or mouse coordinates)
            let destX = mouseX;
            let destY = mouseY;

            if (magneticTargetX !== null && magneticTargetY !== null) {
                // Blend mouse position with magnetic center (70% pull)
                destX = magneticTargetX + (mouseX - magneticTargetX) * 0.3;
                destY = magneticTargetY + (mouseY - magneticTargetY) * 0.3;
            }

            // Smooth spring lerp
            ringX += (destX - ringX) * 0.22;
            ringY += (destY - ringY) * 0.22;

            // Scale calculations
            let scale = 1;
            if (isMouseDown) {
                scale = 0.8;
            } else if (isHoveringInteractive) {
                scale = 1.35;
            }

            ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale})`;

            if (isHoveringInteractive) {
                ring.style.borderColor = 'rgba(56, 189, 248, 0.85)';
                ring.style.boxShadow = '0 0 16px rgba(56, 189, 248, 0.45)';
            } else {
                ring.style.borderColor = 'rgba(168, 85, 247, 0.45)';
                ring.style.boxShadow = 'none';
            }
        }

        requestAnimationFrame(animateCursor);
    }

    requestAnimationFrame(animateCursor);
}
