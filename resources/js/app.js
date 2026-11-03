import 'flowbite';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Holographic 3D Player Card Physics
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

            const rotX = -normY * 14; // Max 14 deg tilt
            const rotY = normX * 14;

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

    // 2. Bento Grid Interactive Aura Mouse Tracking
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

    // 3. Smooth Intersection Observer for Scroll Reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll('.clip-reveal').forEach((el) => {
        revealObserver.observe(el);
    });
});
