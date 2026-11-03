import * as THREE from 'three';

/**
 * AAA 3D Cyberpunk / Gaming Background Universe for DQUAD Portfolio
 * Features:
 * - Dynamic undulating 3D Cyber Grid / Synthwave Horizon with Additive Glow
 * - Glowing Energy Embers with custom soft-radial canvas texture
 * - 3D Starfield Warp that accelerates on scroll
 * - Floating Neon-Edged Obsidian Prisms & Gaming Crystals
 * - Interactive Mouse Point Light & Cosmic Parallax
 * - Camera flight rail mapped to scroll progress
 */
export function init3DBackground() {
    const canvas = document.getElementById('bg-3d-canvas');
    if (!canvas) return;

    // 1. Scene & Atmospheric Depth Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.014);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
        58,
        window.innerWidth / window.innerHeight,
        0.1,
        250
    );
    camera.position.set(0, 1.5, 12);

    // 3. WebGL Renderer with High Dynamic Range & Alpha
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // -------------------------------------------------------------
    // Helper: Procedural Soft Glow Particle Texture (Additive Sprite)
    // -------------------------------------------------------------
    function createGlowSpriteTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(217, 70, 239, 0.85)');
        grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.45)');
        grad.addColorStop(0.8, 'rgba(6, 182, 212, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(c);
        texture.needsUpdate = true;
        return texture;
    }
    const glowTexture = createGlowSpriteTexture();

    // -------------------------------------------------------------
    // 4. Dynamic Lighting System
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x2a1b4e, 1.2);
    scene.add(ambientLight);

    // Interactive mouse light
    const mouseLight = new THREE.PointLight(0x06b6d4, 8, 45);
    mouseLight.position.set(0, 0, 8);
    scene.add(mouseLight);

    // Flank neon accent lights
    const lightViolet = new THREE.PointLight(0x8b5cf6, 10, 60);
    lightViolet.position.set(-8, 4, 2);
    scene.add(lightViolet);

    const lightMagenta = new THREE.PointLight(0xec4899, 10, 60);
    lightMagenta.position.set(8, -3, 2);
    scene.add(lightMagenta);

    const horizonLight = new THREE.PointLight(0xa855f7, 12, 80);
    horizonLight.position.set(0, -6, -45);
    scene.add(horizonLight);

    // -------------------------------------------------------------
    // 5. Undulating 3D Cyber Wave Grid (Synthwave / Tron Landscape)
    // -------------------------------------------------------------
    const gridCols = 44;
    const gridRows = 60;
    const gridWidth = 140;
    const gridLength = 190;
    const gridGeo = new THREE.PlaneGeometry(gridWidth, gridLength, gridCols, gridRows);
    gridGeo.rotateX(-Math.PI / 2);
    gridGeo.translate(0, -6.5, -45);

    // Store original coordinate base
    const posAttr = gridGeo.attributes.position;
    const basePositions = new Float32Array(posAttr.array);

    const gridMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    scene.add(gridMesh);

    // Glowing Neon Horizon Beam
    const horizonGeo = new THREE.PlaneGeometry(160, 2);
    const horizonMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(0, -6.4, -138);
    scene.add(horizonMesh);

    // -------------------------------------------------------------
    // 6. Floating Neon-Edged Gaming Crystals / Polyhedra
    // -------------------------------------------------------------
    const crystalsGroup = new THREE.Group();
    scene.add(crystalsGroup);

    const crystalGeos = [
        new THREE.OctahedronGeometry(1.3, 0),
        new THREE.IcosahedronGeometry(1.1, 0),
        new THREE.DodecahedronGeometry(1.0, 0),
        new THREE.TetrahedronGeometry(1.2, 0)
    ];

    const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x080612,
        roughness: 0.15,
        metalness: 0.9,
        emissive: 0x7c3aed,
        emissiveIntensity: 0.45,
        clearcoat: 1.0,
        flatShading: true
    });

    const edgeColors = [0xec4899, 0x06b6d4, 0xa855f7, 0x38bdf8];
    const crystalMeshes = [];
    const numCrystals = 12;

    for (let i = 0; i < numCrystals; i++) {
        const geo = crystalGeos[i % crystalGeos.length];
        const crystalMesh = new THREE.Mesh(geo, bodyMat.clone());

        // Bright glowing neon wireframe edges
        const wireGeo = new THREE.WireframeGeometry(geo);
        const wireMat = new THREE.LineBasicMaterial({
            color: edgeColors[i % edgeColors.length],
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });
        const wireframe = new THREE.LineSegments(wireGeo, wireMat);
        crystalMesh.add(wireframe);

        // Flank positioning: frame left and right sides so central content remains legible
        const isRight = i % 2 === 0;
        const xDist = (isRight ? 1 : -1) * (5.5 + Math.random() * 4.5);
        const yDist = (Math.random() - 0.5) * 32;
        const zDist = (Math.random() - 0.5) * 30 - 5;

        crystalMesh.position.set(xDist, yDist, zDist);

        crystalMesh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.016,
            rotSpeedY: (Math.random() - 0.5) * 0.022,
            rotSpeedZ: (Math.random() - 0.5) * 0.014,
            baseY: yDist,
            floatSpeed: 0.6 + Math.random() * 0.8,
            floatOffset: Math.random() * Math.PI * 2
        };

        crystalsGroup.add(crystalMesh);
        crystalMeshes.push(crystalMesh);
    }

    // -------------------------------------------------------------
    // 7. Layer A: Soft Luminous Energy Embers (Near Field)
    // -------------------------------------------------------------
    const emberCount = 130;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberScales = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
        const i3 = i * 3;
        emberPositions[i3] = (Math.random() - 0.5) * 35;
        emberPositions[i3 + 1] = (Math.random() - 0.5) * 35;
        emberPositions[i3 + 2] = (Math.random() - 0.5) * 25 + 2;
        emberScales[i] = 0.5 + Math.random() * 0.9;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
        size: 0.75,
        map: glowTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // -------------------------------------------------------------
    // 8. Layer B: Hyperspace Starfield / Cyber Dust (Deep Field)
    // -------------------------------------------------------------
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorViolet = new THREE.Color(0xa855f7);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorPink = new THREE.Color(0xf472b6);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        starPositions[i3] = (Math.random() - 0.5) * 55;
        starPositions[i3 + 1] = (Math.random() - 0.5) * 50;
        starPositions[i3 + 2] = (Math.random() - 0.5) * 70 - 15;

        const rand = Math.random();
        const col = rand < 0.35 ? colorViolet : rand < 0.65 ? colorCyan : rand < 0.85 ? colorPink : colorWhite;
        starColors[i3] = col.r;
        starColors[i3 + 1] = col.g;
        starColors[i3 + 2] = col.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
        size: 0.22,
        map: glowTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // -------------------------------------------------------------
    // 9. Interactive Scroll & Mouse Tracking
    // -------------------------------------------------------------
    let targetScroll = 0;
    let currentScroll = 0;
    let scrollVelocity = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // -------------------------------------------------------------
    // 10. High-Performance Render Loop
    // -------------------------------------------------------------
    let lastTime = performance.now();

    function renderFrame(now) {
        const delta = (now - lastTime) * 0.001;
        lastTime = now;
        const elapsedTime = now * 0.001;

        // Smooth scroll interpolation
        const scrollDelta = targetScroll - currentScroll;
        currentScroll += scrollDelta * 0.09;
        scrollVelocity = scrollDelta * 12;

        // Smooth mouse lag
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Mouse light moves in 3D space
        mouseLight.position.x = currentMouseX * 12;
        mouseLight.position.y = currentMouseY * 8;
        mouseLight.position.z = 4 + Math.sin(elapsedTime * 2) * 1.5;

        // 3D Camera Flight Rail
        const targetCamY = -currentScroll * 24;
        const targetCamZ = 12 - Math.sin(currentScroll * Math.PI) * 3.5;
        const targetCamX = Math.sin(currentScroll * Math.PI * 2) * 2.2 + currentMouseX * 1.0;

        camera.position.y += (targetCamY - camera.position.y) * 0.08;
        camera.position.z += (targetCamZ - camera.position.z) * 0.08;
        camera.position.x += (targetCamX - camera.position.x) * 0.08;

        // Dynamic camera pitch reacting to scroll velocity
        camera.rotation.x = -currentScroll * 0.3 + (currentMouseY * 0.08) - (scrollVelocity * 0.1);
        camera.rotation.y = -currentMouseX * 0.1 + Math.sin(currentScroll * Math.PI) * 0.12;

        // Undulate 3D Cyber Wave Grid
        const positions = posAttr.array;
        const scrollWaveOffset = currentScroll * 90;
        for (let i = 0; i < posAttr.count; i++) {
            const i3 = i * 3;
            const x = basePositions[i3];
            const z = basePositions[i3 + 2];
            // Dual-frequency cyber wave ripple
            const wave = Math.sin(x * 0.09 + elapsedTime * 1.8) * Math.cos((z + scrollWaveOffset) * 0.06) * 1.6;
            positions[i3 + 1] = basePositions[i3 + 1] + wave;
        }
        posAttr.needsUpdate = true;

        // Grid mesh follows camera along Z to feel infinite
        gridMesh.position.z = (currentScroll * 50) % 15 - 5;

        // Spin & float gaming crystals
        crystalMeshes.forEach((mesh) => {
            mesh.rotation.x += mesh.userData.rotSpeedX;
            mesh.rotation.y += mesh.userData.rotSpeedY;
            mesh.rotation.z += mesh.userData.rotSpeedZ;
            mesh.position.y = mesh.userData.baseY + Math.sin(elapsedTime * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.5;
        });

        // Drift Near Embers upwards like cyber fireflies
        const emberPos = emberGeo.attributes.position.array;
        for (let i = 0; i < emberCount; i++) {
            const i3 = i * 3;
            emberPos[i3 + 1] += 0.02; // slowly float up
            if (emberPos[i3 + 1] > 18) emberPos[i3 + 1] = -18;
            emberPos[i3] += Math.sin(elapsedTime + i) * 0.005;
        }
        emberGeo.attributes.position.needsUpdate = true;

        // Deep starfield rotation & subtle warp
        starfield.rotation.y = elapsedTime * 0.02 + currentScroll * 0.6;
        starfield.rotation.x = currentScroll * 0.3;

        renderer.render(scene, camera);
        requestAnimationFrame(renderFrame);
    }

    requestAnimationFrame(renderFrame);
}
