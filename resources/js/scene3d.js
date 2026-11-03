import * as THREE from 'three';

/**
 * High-performance 3D Background Universe for DQUAD Portfolio
 * Features:
 * - 3D Cyber Grid Horizon
 * - Floating Holographic Polyhedra / Crystals framing the layout
 * - 3D Particle Constellation / Energy Dust
 * - Scroll-driven 3D Camera flight along rail
 * - Smooth Mouse Parallax
 */
export function init3DBackground() {
    const canvas = document.getElementById('bg-3d-canvas');
    if (!canvas) return;

    // 1. Scene & Depth Fog matching #070709
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.016);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        200
    );
    camera.position.set(0, 0, 12);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const lightViolet = new THREE.PointLight(0x8b5cf6, 8, 40);
    lightViolet.position.set(-6, 4, 8);
    scene.add(lightViolet);

    const lightFuchsia = new THREE.PointLight(0xec4899, 8, 40);
    lightFuchsia.position.set(6, -2, 6);
    scene.add(lightFuchsia);

    const lightCyan = new THREE.PointLight(0x06b6d4, 6, 35);
    lightCyan.position.set(0, 8, -5);
    scene.add(lightCyan);

    // 5. Infinite 3D Cyber Grid Plane
    const gridHelper = new THREE.GridHelper(240, 60, 0x8b5cf6, 0x1f1b2e);
    gridHelper.position.y = -6;
    scene.add(gridHelper);

    // 6. Floating 3D Gaming Crystals / Polyhedra (Framing Left & Right)
    const crystalsGroup = new THREE.Group();
    scene.add(crystalsGroup);

    const crystalMaterials = [
        new THREE.MeshPhysicalMaterial({
            color: 0x0c0c16,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.6,
            roughness: 0.2,
            metalness: 0.85,
            clearcoat: 1.0,
            flatShading: true
        }),
        new THREE.MeshPhysicalMaterial({
            color: 0x0c0c16,
            emissive: 0xec4899,
            emissiveIntensity: 0.6,
            roughness: 0.2,
            metalness: 0.85,
            clearcoat: 1.0,
            flatShading: true
        }),
        new THREE.MeshPhysicalMaterial({
            color: 0x0c0c16,
            emissive: 0x06b6d4,
            emissiveIntensity: 0.5,
            roughness: 0.2,
            metalness: 0.85,
            clearcoat: 1.0,
            flatShading: true
        })
    ];

    const crystalGeometries = [
        new THREE.OctahedronGeometry(1.2, 0),
        new THREE.IcosahedronGeometry(1.0, 0),
        new THREE.TetrahedronGeometry(1.1, 0),
        new THREE.DodecahedronGeometry(0.9, 0)
    ];

    const crystalMeshes = [];
    const crystalCount = 14;

    for (let i = 0; i < crystalCount; i++) {
        const geo = crystalGeometries[i % crystalGeometries.length];
        const mat = crystalMaterials[i % crystalMaterials.length];
        const mesh = new THREE.Mesh(geo, mat);

        // Position on left or right sides away from central text column
        const side = i % 2 === 0 ? 1 : -1;
        mesh.position.x = side * (5.5 + Math.random() * 4.5);
        mesh.position.y = (Math.random() - 0.5) * 35;
        mesh.position.z = (Math.random() - 0.5) * 25 - 5;

        // Custom spin velocities
        mesh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.015,
            rotSpeedY: (Math.random() - 0.5) * 0.02,
            rotSpeedZ: (Math.random() - 0.5) * 0.01,
            baseY: mesh.position.y,
            floatSpeed: 0.5 + Math.random() * 0.8,
            floatOffset: Math.random() * Math.PI * 2
        };

        crystalsGroup.add(mesh);
        crystalMeshes.push(mesh);
    }

    // 7. 3D Particle Constellation (Starfield Dust)
    const particleCount = 650;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorViolet = new THREE.Color(0xa78bfa);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorPink = new THREE.Color(0xf472b6);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * 45;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 45;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 40 - 5;

        const randColor = Math.random();
        const chosen = randColor < 0.4 ? colorViolet : randColor < 0.7 ? colorCyan : colorPink;
        particleColors[i3] = chosen.r;
        particleColors[i3 + 1] = chosen.g;
        particleColors[i3 + 2] = chosen.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 8. Scroll & Mouse Tracking
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

    // Window Resize Handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 9. Animation Loop
    let lastTime = performance.now();

    function renderFrame(now) {
        const delta = (now - lastTime) * 0.001;
        lastTime = now;
        const elapsedTime = now * 0.001;

        // Smooth scroll interpolation
        const scrollDelta = targetScroll - currentScroll;
        currentScroll += scrollDelta * 0.08;
        scrollVelocity = scrollDelta * 10;

        // Smooth mouse parallax
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // 3D Camera Flight along Scroll Rail
        // Section 1 (Hero: 0.0) -> Section 2 (Bento: 0.33) -> Section 3 (Profile: 0.66) -> Section 4 (Contact: 1.0)
        const targetCamY = -currentScroll * 22;
        const targetCamZ = 12 - Math.sin(currentScroll * Math.PI) * 3;
        const targetCamX = Math.sin(currentScroll * Math.PI * 2) * 1.8 + currentMouseX * 0.8;

        camera.position.y += (targetCamY - camera.position.y) * 0.08;
        camera.position.z += (targetCamZ - camera.position.z) * 0.08;
        camera.position.x += (targetCamX - camera.position.x) * 0.08;

        // Camera rotation reacts to scroll velocity and mouse
        camera.rotation.x = -currentScroll * 0.35 + (currentMouseY * 0.1) - (scrollVelocity * 0.08);
        camera.rotation.y = -currentMouseX * 0.12 + Math.sin(currentScroll * Math.PI) * 0.1;

        // Grid plane moves with scroll to give continuous warp motion
        gridHelper.position.z = (currentScroll * 60) % 8 - 4;
        gridHelper.position.y = -6 + currentScroll * 4;

        // Rotate individual floating crystals
        crystalMeshes.forEach((mesh) => {
            mesh.rotation.x += mesh.userData.rotSpeedX;
            mesh.rotation.y += mesh.userData.rotSpeedY;
            mesh.rotation.z += mesh.userData.rotSpeedZ;
            mesh.position.y = mesh.userData.baseY + Math.sin(elapsedTime * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.4;
        });

        // Drift and twist particles
        particles.rotation.y = elapsedTime * 0.03 + currentScroll * 0.8;
        particles.rotation.x = currentScroll * 0.4;

        renderer.render(scene, camera);
        requestAnimationFrame(renderFrame);
    }

    requestAnimationFrame(renderFrame);
}
