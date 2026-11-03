import 'flowbite';
import { initHero3D } from './hero3d';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize 3D Quantum Core
    initHero3D();

    // 2. Interactive 3D Tilt + Spotlight Mouse Tracking for Cards
    const spotlights = document.querySelectorAll('.spotlight');
    spotlights.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS spotlight coordinates
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);

            // Calculate 3D tilt angles based on mouse offset from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotX = ((y - centerY) / centerY) * -8; // Up/down tilt
            const rotY = ((x - centerX) / centerX) * 8;  // Left/right tilt
            
            el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // 3. Intersection Observer for Scroll Reveals
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
});
