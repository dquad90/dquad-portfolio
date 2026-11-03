import 'flowbite';
import { init3DBackground } from './scene3d';

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------
    // 1. Initialize High-Performance 3D Background Universe
    // -----------------------------------------------------------
    init3DBackground();

    // -----------------------------------------------------------
    // 2. Holographic 3D Player Card Physics (Hero Mouse Hover)
    // -----------------------------------------------------------
    const holoContainer = document.querySelector('.holo-container');
    const holoCard = document.querySelector('.holo-card');
    let isHoveringHolo = false;

    if (holoContainer && holoCard) {
        holoContainer.addEventListener('mouseenter', () => {
            isHoveringHolo = true;
        });

        holoContainer.addEventListener('mousemove', (e) => {
            const rect = holoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const px = (x / rect.width) * 100;
            const py = (y / rect.height) * 100;

            const normX = (x / rect.width) * 2 - 1;
            const normY = (y / rect.height) * 2 - 1;

            const rotX = -normY * 14;
            const rotY = normX * 14;

            holoCard.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
            holoCard.style.setProperty('--holo-x', `${px.toFixed(1)}%`);
            holoCard.style.setProperty('--holo-y', `${py.toFixed(1)}%`);
            holoCard.style.setProperty('--holo-bg-pos', `${(px * 1.5).toFixed(1)}% ${(py * 1.5).toFixed(1)}%`);
            holoCard.style.setProperty('--holo-opacity', '1');
        });

        holoContainer.addEventListener('mouseleave', () => {
            isHoveringHolo = false;
            holoCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            holoCard.style.setProperty('--holo-opacity', '0');
        });
    }

    // -----------------------------------------------------------
    // 3. Bento Grid Interactive Spotlight & Mouse 3D Tilt
    // -----------------------------------------------------------
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D mouse tilt on individual card hover
            const normX = (x / rect.width) * 2 - 1;
            const normY = (y / rect.height) * 2 - 1;
            const rotX = -normY * 6;
            const rotY = normX * 6;
            card.style.setProperty('--card-tilt-x', `${rotX.toFixed(2)}deg`);
            card.style.setProperty('--card-tilt-y', `${rotY.toFixed(2)}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--card-tilt-x', '0deg');
            card.style.setProperty('--card-tilt-y', '0deg');
        });
    });

    // -----------------------------------------------------------
    // 4. Continuous 3D Animated Scroll Physics Engine
    // -----------------------------------------------------------
    const scrollSections = document.querySelectorAll('.scroll-3d-section');
    const scrollElements = document.querySelectorAll('.scroll-3d-element');
    const hudLinks = document.querySelectorAll('.sector-link');
    const hudDots = document.querySelectorAll('.sector-dot');
    const navLinks = document.querySelectorAll('.nav-section-link');

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let scrollVelocity = 0;
    let smoothVelocity = 0;

    window.addEventListener('scroll', () => {
        targetScroll = window.scrollY;
    }, { passive: true });

    function render3DScrollPhysics() {
        // Calculate smooth scroll inertia and velocity
        const delta = targetScroll - currentScroll;
        currentScroll += delta * 0.14;
        scrollVelocity = delta;
        smoothVelocity += (scrollVelocity - smoothVelocity) * 0.12;

        const windowHeight = window.innerHeight;
        const middleY = windowHeight / 2;
        // Dynamic cockpit tilt when scrolling fast
        const scrollInertiaTilt = Math.max(Math.min(smoothVelocity * 0.05, 8), -8);

        // 1. Process 3D Sections (Perspective & Depth based on scroll)
        let activeIndex = 0;
        let minDistanceToCenter = Infinity;

        scrollSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const dist = Math.abs(sectionCenter - middleY);

            if (dist < minDistanceToCenter) {
                minDistanceToCenter = dist;
                activeIndex = index;
            }

            // Normalized distance from viewport center (-1.2 to +1.2)
            const progress = (sectionCenter - middleY) / (windowHeight * 0.65);
            const clampedProgress = Math.max(Math.min(progress, 1.2), -1.2);

            // Bold 3D Scroll Rotation and Depth
            const rotX = clampedProgress * 12 + scrollInertiaTilt;
            const transZ = -Math.abs(clampedProgress) * 60;
            const scale = 1 - Math.abs(clampedProgress) * 0.04;
            const opacity = 1 - Math.abs(clampedProgress) * 0.3;

            section.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) translateZ(${transZ.toFixed(1)}px) scale(${scale.toFixed(3)})`;
            section.style.opacity = Math.max(opacity, 0.3).toFixed(2);
        });

        // 2. Process Individual 3D Staggered Cards (Bento, Cards)
        scrollElements.forEach((el, elIndex) => {
            const rect = el.getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const progress = (elCenter - middleY) / (windowHeight * 0.75);
            const clampedProgress = Math.max(Math.min(progress, 1.2), -1.2);

            // Stagger depth from data-depth attribute
            const depthFactor = parseFloat(el.getAttribute('data-depth')) || 1.0;
            const rotDir = elIndex % 2 === 0 ? 1 : -1;

            const rotX = clampedProgress * (14 * depthFactor) + scrollInertiaTilt * 0.6;
            const rotY = clampedProgress * (6 * depthFactor) * rotDir;
            const transZ = -Math.abs(clampedProgress) * (80 * depthFactor);
            const transY = clampedProgress * (30 * depthFactor);

            el.style.transform = `perspective(1000px) translateY(${transY.toFixed(1)}px) translateZ(${transZ.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        });

        // 3. Special 3D Scroll Exit for Holographic Card (when not hovered)
        if (holoCard && !isHoveringHolo) {
            const heroRect = holoCard.getBoundingClientRect();
            const heroProgress = (heroRect.top + heroRect.height / 2 - middleY) / (windowHeight * 0.55);
            if (heroProgress < 0) {
                // Scrolling down away from hero: card turns backwards in 3D
                const rotY = Math.abs(heroProgress) * 22;
                const rotX = -Math.abs(heroProgress) * 10;
                const transZ = -Math.abs(heroProgress) * 100;
                holoCard.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${transZ.toFixed(1)}px)`;
            }
        }

        // 4. Update HUD Indicators
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

        requestAnimationFrame(render3DScrollPhysics);
    }

    // Launch continuous 3D scroll physics loop
    requestAnimationFrame(render3DScrollPhysics);
});
