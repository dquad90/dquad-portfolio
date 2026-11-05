import 'flowbite';
import { initAmbientBackground } from './ambient';
import { initBentoController } from './controller3d';

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------
    // 1. Initialize High-End Ambient Studio Lighting Canvas
    // -----------------------------------------------------------
    initAmbientBackground();

    // -----------------------------------------------------------
    // 2. Initialize 3D Rotating Disc & Game Controller
    // -----------------------------------------------------------
    initBentoController();

    // -----------------------------------------------------------
    // 2. 3D Holographic Player Card (Hero Micro-Physics)
    // -----------------------------------------------------------
    const holoContainer = document.querySelector('.holo-container');
    const holoCard = document.querySelector('.holo-card');

    if (holoContainer && holoCard) {
        holoContainer.addEventListener('mousemove', (e) => {
            const rect = holoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const px = (x / rect.width) * 100;
            const py = (y / rect.height) * 100;

            const normX = (x / rect.width) * 2 - 1;
            const normY = (y / rect.height) * 2 - 1;

            // Refined, smooth 3D tilt angles
            const rotX = -normY * 10;
            const rotY = normX * 10;

            holoCard.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            holoCard.style.setProperty('--holo-x', `${px.toFixed(1)}%`);
            holoCard.style.setProperty('--holo-y', `${py.toFixed(1)}%`);
            holoCard.style.setProperty('--holo-bg-pos', `${(px * 1.5).toFixed(1)}% ${(py * 1.5).toFixed(1)}%`);
            holoCard.style.setProperty('--holo-opacity', '1');
        });

        holoContainer.addEventListener('mouseleave', () => {
            holoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            holoCard.style.setProperty('--holo-opacity', '0');
        });
    }

    // -----------------------------------------------------------
    // 3. Bento Grid & Controller Viscous Hairline Spotlight Physics
    // -----------------------------------------------------------
    const spotlightCards = document.querySelectorAll('.bento-card, .hairline-spotlight');
    const cardTracking = [];

    spotlightCards.forEach(card => {
        const state = {
            card: card,
            currentX: -500,
            currentY: -500,
            targetX: -500,
            targetY: -500,
            isHovered: false
        };

        card.addEventListener('mouseenter', () => {
            state.isHovered = true;
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            state.targetX = e.clientX - rect.left;
            state.targetY = e.clientY - rect.top;
        });

        card.addEventListener('mouseleave', () => {
            state.isHovered = false;
        });

        cardTracking.push(state);
    });

    function updateSpotlightPhysics() {
        cardTracking.forEach(state => {
            if (state.isHovered) {
                // Smooth viscous spring damping for liquid hairline spotlight
                state.currentX += (state.targetX - state.currentX) * 0.14;
                state.currentY += (state.targetY - state.currentY) * 0.14;
                state.card.style.setProperty('--mouse-x', `${state.currentX.toFixed(1)}px`);
                state.card.style.setProperty('--mouse-y', `${state.currentY.toFixed(1)}px`);
            }
        });
        requestAnimationFrame(updateSpotlightPhysics);
    }
    requestAnimationFrame(updateSpotlightPhysics);

    // -----------------------------------------------------------
    // 4. Smooth Scroll Spy & Sector HUD Engine
    // -----------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const hudLinks = document.querySelectorAll('.sector-link');
    const hudDots = document.querySelectorAll('.sector-dot');
    const navLinks = document.querySelectorAll('.nav-section-link');

    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35;
        let activeIndex = 0;

        sections.forEach((section, index) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                activeIndex = index;
            }
        });

        hudLinks.forEach((link, idx) => {
            if (idx === activeIndex) link.classList.add('is-active');
            else link.classList.remove('is-active');
        });

        hudDots.forEach((dot, idx) => {
            if (idx === activeIndex) dot.classList.add('is-active');
            else dot.classList.remove('is-active');
        });

        navLinks.forEach((nav, idx) => {
            if (idx === activeIndex) {
                nav.classList.add('text-white', 'font-semibold');
                nav.classList.remove('text-gray-400');
            } else {
                nav.classList.remove('text-white', 'font-semibold');
                nav.classList.add('text-gray-400');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
});
