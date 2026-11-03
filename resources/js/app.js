import 'flowbite';

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------
    // 1. Holographic 3D Player Card Physics (Hero)
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

            const rotX = -normY * 13;
            const rotY = normX * 13;

            holoCard.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
            holoCard.style.setProperty('--holo-x', `${px.toFixed(1)}%`);
            holoCard.style.setProperty('--holo-y', `${py.toFixed(1)}%`);
            holoCard.style.setProperty('--holo-bg-pos', `${(px * 1.5).toFixed(1)}% ${(py * 1.5).toFixed(1)}%`);
            holoCard.style.setProperty('--holo-opacity', '1');
        });

        holoContainer.addEventListener('mouseleave', () => {
            holoCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            holoCard.style.setProperty('--holo-opacity', '0');
        });
    }

    // -----------------------------------------------------------
    // 2. Bento Grid Interactive Aura Mouse Tracking
    // -----------------------------------------------------------
    const bentoCards = document.querySelectorAll('.bento-card, .spotlight');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // -----------------------------------------------------------
    // 3. Clean 3D Transitions for the 4 Main Sections
    // -----------------------------------------------------------
    const sectionIds = ['home', 'bento', 'profile', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const hudLinks = document.querySelectorAll('.sector-link');
    const hudDots = document.querySelectorAll('.sector-dot');

    function update3DSectionTransitions() {
        const windowHeight = window.innerHeight;
        const middleY = windowHeight / 2;

        let activeIndex = 0;
        let minDistanceToCenter = Infinity;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const dist = Math.abs(sectionCenter - middleY);

            if (dist < minDistanceToCenter) {
                minDistanceToCenter = dist;
                activeIndex = index;
            }

            // Apply directional 3D elevation
            if (rect.bottom < windowHeight * 0.25) {
                // Section scrolled above viewport
                section.classList.remove('is-active', 'is-out-bottom');
                section.classList.add('is-out-top');
            } else if (rect.top > windowHeight * 0.75) {
                // Section below viewport
                section.classList.remove('is-active', 'is-out-top');
                section.classList.add('is-out-bottom');
            } else {
                // Currently in view: lock into crisp 1:1 view
                section.classList.remove('is-out-top', 'is-out-bottom');
                section.classList.add('is-active');
            }
        });

        // Update Floating 3D Sector HUD
        hudLinks.forEach((link, idx) => {
            if (idx === activeIndex) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });

        hudDots.forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('is-active');
            } else {
                dot.classList.remove('is-active');
            }
        });
    }

    // Scroll listener with requestAnimationFrame throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                update3DSectionTransitions();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial pass on load
    update3DSectionTransitions();
});
