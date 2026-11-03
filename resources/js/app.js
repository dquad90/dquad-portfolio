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

            const rotX = -normY * 14;
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
    // 3. Full 3D Rotating Cube / Deck World Controller
    // -----------------------------------------------------------
    const cubeWorld = document.getElementById('cube-world');
    const cubeFaces = document.querySelectorAll('.cube-face');
    const hudLinks = document.querySelectorAll('.sector-link');
    const hudDots = document.querySelectorAll('.sector-dot');
    const navLinks = document.querySelectorAll('.cube-nav-link');
    const sectorDisplay = document.getElementById('sector-indicator-text');

    const sectorNames = [
        '01 // OVERVIEW',
        '02 // BENTO ABILITIES',
        '03 // PLAYER PROFILE',
        '04 // TRANSMISSION'
    ];

    let currentSector = 0;
    const totalSectors = 4;
    let isTransitioning = false;

    function rotateToSector(index) {
        if (isTransitioning) return;
        index = (index + totalSectors) % totalSectors;
        currentSector = index;
        isTransitioning = true;

        // Perform dramatic 3D cube rotation
        if (cubeWorld) {
            cubeWorld.style.transform = `translateZ(-50vw) rotateY(${-currentSector * 90}deg)`;
        }

        // Update faces active states
        cubeFaces.forEach((face, idx) => {
            if (idx === currentSector) {
                face.classList.add('is-current');
            } else {
                face.classList.remove('is-current');
            }
        });

        // Update side HUD indicators
        hudLinks.forEach((link, idx) => {
            if (idx === currentSector) link.classList.add('is-active');
            else link.classList.remove('is-active');
        });

        hudDots.forEach((dot, idx) => {
            if (idx === currentSector) dot.classList.add('is-active');
            else dot.classList.remove('is-active');
        });

        // Update top navbar links
        navLinks.forEach((nav, idx) => {
            if (idx === currentSector) {
                nav.classList.add('text-white', 'font-semibold');
                nav.classList.remove('text-gray-400');
            } else {
                nav.classList.remove('text-white', 'font-semibold');
                nav.classList.add('text-gray-400');
            }
        });

        // Update Bottom Sector Display
        if (sectorDisplay) {
            sectorDisplay.textContent = sectorNames[currentSector];
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 1050);
    }

    // Expose functions globally for on-page buttons
    window.rotateToSector = rotateToSector;
    window.nextSector = () => rotateToSector(currentSector + 1);
    window.prevSector = () => rotateToSector(currentSector - 1);

    // Initial state
    rotateToSector(0);

    // Mouse Wheel Scroll Detection on Current Face
    let wheelCooldown = false;
    window.addEventListener('wheel', (e) => {
        if (wheelCooldown || isTransitioning) return;

        const currentFace = cubeFaces[currentSector];
        if (!currentFace) return;

        const atTop = currentFace.scrollTop <= 2;
        const atBottom = currentFace.scrollHeight - currentFace.scrollTop <= currentFace.clientHeight + 2;

        if (e.deltaY > 35 && atBottom) {
            wheelCooldown = true;
            window.nextSector();
            setTimeout(() => { wheelCooldown = false; }, 850);
        } else if (e.deltaY < -35 && atTop) {
            wheelCooldown = true;
            window.prevSector();
            setTimeout(() => { wheelCooldown = false; }, 850);
        }
    }, { passive: true });

    // Keyboard Arrow Navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            window.nextSector();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            window.prevSector();
        }
    });
});
