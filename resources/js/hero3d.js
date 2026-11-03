import * as THREE from 'three';

export function initHero3D() {
    const container = document.getElementById('hero-3d-container');
    const canvas = document.getElementById('hero-3d-canvas');
    if (!container || !canvas) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Glossy Cyber Crystal (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(1.35, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x090514,
        emissive: 0x9333ea,
        emissiveIntensity: 0.8,
        roughness: 0.15,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        flatShading: true
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 2. Outer Geometric Wireframe Cage (Icosahedron)
    const cageGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const cageMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        wireframe: true,
        roughness: 0.2,
        metalness: 0.9,
        emissive: 0xd946ef,
        emissiveIntensity: 0.4
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // 3. Glowing Node Points on Cage Vertices
    const pointsGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const pointsMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.08,
        transparent: true,
        opacity: 0.95
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    coreGroup.add(pointsMesh);

    // 4. Dual Orbital Gyro Rings
    const ringGeo1 = new THREE.TorusGeometry(2.65, 0.022, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.6
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.95, 0.018, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.5
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    coreGroup.add(ring2);

    // 5. Surrounding 3D Particle Constellation / Dust Swarm
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
        const r = 2.6 + Math.random() * 3.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posArray[i] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMat = new THREE.PointsMaterial({
        size: 0.035,
        color: 0xd8b4fe,
        transparent: true,
        opacity: 0.8
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xd946ef, 5, 20);
    light1.position.set(4, 4, 4);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x06b6d4, 4, 20);
    light2.position.set(-4, -4, 3);
    scene.add(light2);

    // User Interaction & Smooth Mouse Drag/Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            targetRotationY += deltaX * 0.008;
            targetRotationX += deltaY * 0.008;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        } else {
            // Subtle Parallax when moving mouse over hero
            const normX = (e.clientX / window.innerWidth) * 2 - 1;
            const normY = -(e.clientY / window.innerHeight) * 2 + 1;
            targetRotationY = normX * 0.45;
            targetRotationX = -normY * 0.35;
        }
    });

    // Touch support for mobile / tablets
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;

            targetRotationY += deltaX * 0.01;
            targetRotationX += deltaY * 0.01;

            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, { passive: true });

    // Window Resize handling
    function handleResize() {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    // Performance: Pause rendering when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // Render / Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Constant baseline idle spin
        coreGroup.rotation.y += 0.005;
        coreGroup.rotation.x += 0.002;

        // Smooth damping towards mouse position
        coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;
        coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

        // Counter-spin rings for gyroscope feeling
        ring1.rotation.z = elapsedTime * 0.35;
        ring2.rotation.z = -elapsedTime * 0.28;

        // Subtle inner core breathing pulse
        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
        innerMesh.scale.set(pulse, pulse, pulse);

        // Slow starfield rotation
        starField.rotation.y = elapsedTime * 0.02;
        starField.rotation.x = elapsedTime * 0.01;

        renderer.render(scene, camera);
    }

    animate();
}
