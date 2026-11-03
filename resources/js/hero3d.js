import * as THREE from 'three';

export function initHero3D() {
    const canvas = document.getElementById('global-3d-canvas');
    if (!canvas) return;

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.032);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
        58,
        window.innerWidth / window.innerHeight,
        0.1,
        150
    );
    camera.position.set(0, 1.2, 7.5);

    // 3. Renderer with High Performance & Alpha
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Global Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x06b6d4, 6, 45);
    lightCyan.position.set(-5, 6, 5);
    scene.add(lightCyan);

    const lightMagenta = new THREE.PointLight(0xd946ef, 7, 50);
    lightMagenta.position.set(6, -4, -15);
    scene.add(lightMagenta);

    const lightViolet = new THREE.PointLight(0x8b5cf6, 6, 60);
    lightViolet.position.set(-4, -6, -38);
    scene.add(lightViolet);

    // -------------------------------------------------------------
    // LANDMARK 1: HERO CYBER CORE (Z = 0)
    // -------------------------------------------------------------
    const heroGroup = new THREE.Group();
    heroGroup.position.set(3.2, 0.2, 0);
    scene.add(heroGroup);

    const coreGeo = new THREE.OctahedronGeometry(1.5, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f051d,
        emissive: 0xa855f7,
        emissiveIntensity: 0.85,
        roughness: 0.1,
        metalness: 0.9,
        clearcoat: 1.0,
        flatShading: true
    });
    const heroCore = new THREE.Mesh(coreGeo, coreMat);
    heroGroup.add(heroCore);

    const cageGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const cageMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        wireframe: true,
        emissive: 0xd946ef,
        emissiveIntensity: 0.5
    });
    const heroCage = new THREE.Mesh(cageGeo, cageMat);
    heroGroup.add(heroCage);

    const ring1Geo = new THREE.TorusGeometry(3.0, 0.025, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    const heroRing1 = new THREE.Mesh(ring1Geo, ringMat);
    heroRing1.rotation.x = Math.PI / 3;
    heroGroup.add(heroRing1);

    const ring2Geo = new THREE.TorusGeometry(3.4, 0.02, 16, 100);
    const heroRing2 = new THREE.Mesh(ring2Geo, ringMat);
    heroRing2.rotation.y = Math.PI / 4;
    heroGroup.add(heroRing2);

    // -------------------------------------------------------------
    // LANDMARK 2: ABOUT / PLAYER PROFILE HOLOGRAM (Z = -18)
    // -------------------------------------------------------------
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(3.5, -1.2, -18);
    scene.add(aboutGroup);

    const dodecaGeo = new THREE.DodecahedronGeometry(2.2, 0);
    const dodecaMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        wireframe: true,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.6
    });
    const aboutDodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
    aboutGroup.add(aboutDodeca);

    const aboutCoreGeo = new THREE.SphereGeometry(1.1, 16, 16);
    const aboutCoreMat = new THREE.MeshPhysicalMaterial({
        color: 0x1e1b4b,
        emissive: 0x6366f1,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8
    });
    const aboutCore = new THREE.Mesh(aboutCoreGeo, aboutCoreMat);
    aboutGroup.add(aboutCore);

    // -------------------------------------------------------------
    // LANDMARK 3: ABILITIES CYBER WAVE MATRIX (Z = -36)
    // -------------------------------------------------------------
    const waveGroup = new THREE.Group();
    waveGroup.position.set(0, -4.5, -36);
    scene.add(waveGroup);

    const waveWidth = 38;
    const waveHeight = 26;
    const waveSegmentsX = 140;
    const waveSegmentsY = 90;
    const wavePlaneGeo = new THREE.PlaneGeometry(waveWidth, waveHeight, waveSegmentsX, waveSegmentsY);
    const wavePlaneMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a14,
        wireframe: true,
        emissive: 0xa855f7,
        emissiveIntensity: 0.45,
        roughness: 0.3,
        metalness: 0.85
    });
    const wavePlane = new THREE.Mesh(wavePlaneGeo, wavePlaneMat);
    wavePlane.rotation.x = -Math.PI / 2.2;
    waveGroup.add(wavePlane);

    // Store base positions for dynamic procedural ripple
    const baseWavePositions = wavePlaneGeo.attributes.position.array.slice();

    // -------------------------------------------------------------
    // LANDMARK 4: CONTACT HYPERSPACE WARP VORTEX (Z = -54)
    // -------------------------------------------------------------
    const contactGroup = new THREE.Group();
    contactGroup.position.set(0, -3.2, -54);
    scene.add(contactGroup);

    const vortexRings = [];
    for (let i = 0; i < 9; i++) {
        const radius = 1.6 + i * 0.7;
        const vRingGeo = new THREE.TorusGeometry(radius, 0.028, 16, 80);
        const vRingMat = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0xec4899 : 0x06b6d4,
            transparent: true,
            opacity: 0.75 - i * 0.05
        });
        const ring = new THREE.Mesh(vRingGeo, vRingMat);
        ring.position.z = -i * 1.8;
        contactGroup.add(ring);
        vortexRings.push(ring);
    }

    // -------------------------------------------------------------
    // 5. HYPERSPACE 3D PARTICLE FIELD (Spanning Z = +15 to -70)
    // -------------------------------------------------------------
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 36;
        particlePositions[i + 1] = (Math.random() - 0.5) * 24;
        particlePositions[i + 2] = 15 - Math.random() * 85; // Distributed through full scroll depth
        particleScales[i / 3] = Math.random();
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.055,
        color: 0xc084fc,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // -------------------------------------------------------------
    // SCROLL & MOUSE INTERPOLATION
    // -------------------------------------------------------------
    let targetScroll = 0;
    let currentScroll = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    function updateScrollProgress() {
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        targetScroll = window.scrollY / maxScroll;

        const delta = window.scrollY - lastScrollY;
        scrollVelocity = Math.abs(delta) * 0.002;
        lastScrollY = window.scrollY;
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    let targetMouse = { x: 0, y: 0 };
    let currentMouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle Window Resize
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    // -------------------------------------------------------------
    // ANIMATION & SCROLL FLIGHT LOOP
    // -------------------------------------------------------------
    const clock = new THREE.Clock();

    // Keyframes for the 3D Camera Flight through the sections
    // progress: [0.0 (Hero), 0.33 (About), 0.66 (Abilities), 1.0 (Contact)]
    const cameraWaypoints = [
        { progress: 0.0,  pos: new THREE.Vector3(0, 1.2, 7.5),     look: new THREE.Vector3(0.5, 0.5, 0) },
        { progress: 0.33, pos: new THREE.Vector3(1.8, -0.6, -11),  look: new THREE.Vector3(3.5, -1.2, -18) },
        { progress: 0.66, pos: new THREE.Vector3(-0.8, -2.4, -27), look: new THREE.Vector3(0, -4.5, -36) },
        { progress: 1.0,  pos: new THREE.Vector3(0, -2.2, -44),    look: new THREE.Vector3(0, -3.2, -54) }
    ];

    function getInterpolatedCamera(p) {
        p = THREE.MathUtils.clamp(p, 0, 1);
        let idx = 0;
        for (let i = 0; i < cameraWaypoints.length - 1; i++) {
            if (p >= cameraWaypoints[i].progress && p <= cameraWaypoints[i + 1].progress) {
                idx = i;
                break;
            }
        }
        const w1 = cameraWaypoints[idx];
        const w2 = cameraWaypoints[idx + 1];
        const range = w2.progress - w1.progress;
        const t = (p - w1.progress) / range;

        // Smooth cubic ease-in-out
        const smoothT = t * t * (3 - 2 * t);

        const pos = new THREE.Vector3().lerpVectors(w1.pos, w2.pos, smoothT);
        const look = new THREE.Vector3().lerpVectors(w1.look, w2.look, smoothT);
        return { pos, look };
    }

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // 1. Smooth lerp for scroll & mouse parallax
        currentScroll += (targetScroll - currentScroll) * 0.06;
        scrollVelocity *= 0.92;

        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

        // 2. Flight path calculation
        const flight = getInterpolatedCamera(currentScroll);

        // Apply mouse parallax to camera position and look target
        camera.position.x = flight.pos.x + currentMouse.x * 0.8;
        camera.position.y = flight.pos.y + currentMouse.y * 0.6;
        camera.position.z = flight.pos.z - scrollVelocity * 4.0; // Dynamic hyperspace surge on scroll!

        const lookTarget = flight.look.clone();
        lookTarget.x += currentMouse.x * 0.4;
        lookTarget.y += currentMouse.y * 0.3;
        camera.lookAt(lookTarget);

        // 3. Animate Hero Core
        heroGroup.rotation.y = elapsedTime * 0.4;
        heroGroup.rotation.x = elapsedTime * 0.2;
        heroRing1.rotation.z = elapsedTime * 0.6;
        heroRing2.rotation.z = -elapsedTime * 0.5;

        // 4. Animate About Hologram
        aboutGroup.rotation.y = -elapsedTime * 0.5;
        aboutGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.3;
        aboutCore.scale.setScalar(1 + Math.sin(elapsedTime * 2.0) * 0.08);

        // 5. Animate Abilities Wave Grid
        const posAttr = wavePlaneGeo.attributes.position;
        const waveArr = posAttr.array;
        for (let i = 0; i < waveArr.length; i += 3) {
            const u = baseWavePositions[i];
            const v = baseWavePositions[i + 1];
            waveArr[i + 2] = Math.sin(u * 0.4 + elapsedTime * 1.6) * Math.cos(v * 0.4 + elapsedTime * 1.2) * 0.75
                          + Math.sin(u * 0.8 - elapsedTime * 2.0) * 0.25;
        }
        posAttr.needsUpdate = true;

        // 6. Animate Contact Vortex Rings
        vortexRings.forEach((ring, index) => {
            ring.rotation.z = elapsedTime * (0.3 + index * 0.08) * (index % 2 === 0 ? 1 : -1);
            const scale = 1 + Math.sin(elapsedTime * 2.5 + index * 0.6) * 0.06;
            ring.scale.set(scale, scale, 1);
        });

        // 7. Ambient Particle Drift
        particleSystem.rotation.y = elapsedTime * 0.015;
        particleSystem.rotation.z = currentScroll * 0.5;

        renderer.render(scene, camera);
    }

    animate();
}
