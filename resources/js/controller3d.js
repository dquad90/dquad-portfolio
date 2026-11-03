import * as THREE from 'three';

/**
 * Interactive 3D Rotating Disc & Gaming Controller
 * Specifically placed in the Capabilities Bento header.
 */
export function initBentoController() {
    const container = document.getElementById('controller-3d-container');
    const canvas = document.getElementById('controller-3d-canvas');
    if (!container || !canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 220;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const lightTop = new THREE.DirectionalLight(0xffffff, 2.5);
    lightTop.position.set(3, 8, 5);
    scene.add(lightTop);

    const lightCyan = new THREE.PointLight(0x06b6d4, 6, 15);
    lightCyan.position.set(-4, -1, 3);
    scene.add(lightCyan);

    const lightMagenta = new THREE.PointLight(0xec4899, 8, 15);
    lightMagenta.position.set(4, 2, 3);
    scene.add(lightMagenta);

    const lightViolet = new THREE.PointLight(0x8b5cf6, 6, 15);
    lightViolet.position.set(0, -3, 2);
    scene.add(lightViolet);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 3. THE ROTATING DISC (Holographic Cyber Pedestal)
    // -------------------------------------------------------------
    const discGroup = new THREE.Group();
    discGroup.position.y = -1.2;
    discGroup.rotation.x = 0.25; // tilted towards viewer
    rootGroup.add(discGroup);

    // Main Disc Platter
    const platterGeo = new THREE.CylinderGeometry(2.3, 2.4, 0.08, 64);
    const platterMat = new THREE.MeshPhysicalMaterial({
        color: 0x0e0e16,
        roughness: 0.2,
        metalness: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    discGroup.add(platter);

    // Glowing Outer Rim
    const outerRimGeo = new THREE.TorusGeometry(2.4, 0.035, 16, 64);
    const outerRimMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.9
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    discGroup.add(outerRim);

    // Middle Neon Laser Track
    const midRimGeo = new THREE.TorusGeometry(1.7, 0.025, 16, 64);
    const midRimMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.8
    });
    const midRim = new THREE.Mesh(midRimGeo, midRimMat);
    midRim.rotation.x = Math.PI / 2;
    discGroup.add(midRim);

    // Inner Glowing Core Ring
    const innerRimGeo = new THREE.TorusGeometry(0.9, 0.03, 16, 64);
    const innerRimMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.95
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    discGroup.add(innerRim);

    // Disc Radial Spoke Crossbars
    const spokeMat = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.4
    });
    for (let i = 0; i < 4; i++) {
        const spokeGeo = new THREE.BoxGeometry(4.4, 0.02, 0.04);
        const spoke = new THREE.Mesh(spokeGeo, spokeMat);
        spoke.rotation.y = (i * Math.PI) / 4;
        discGroup.add(spoke);
    }

    // -------------------------------------------------------------
    // 4. THE 3D GAMING CONTROLLER
    // -------------------------------------------------------------
    const controllerGroup = new THREE.Group();
    controllerGroup.position.set(0, 0.25, 0);
    rootGroup.add(controllerGroup);

    // Materials
    const chassisMat = new THREE.MeshPhysicalMaterial({
        color: 0x14141e,
        roughness: 0.2,
        metalness: 0.75,
        clearcoat: 0.9,
        clearcoatRoughness: 0.15
    });

    const rubberGripMat = new THREE.MeshStandardMaterial({
        color: 0x09090e,
        roughness: 0.85,
        metalness: 0.15
    });

    const buttonMat = new THREE.MeshStandardMaterial({
        color: 0x222230,
        roughness: 0.3,
        metalness: 0.6
    });

    // 4A. Central Body Housing
    const centerBodyGeo = new THREE.BoxGeometry(1.6, 0.95, 0.45);
    const centerBody = new THREE.Mesh(centerBodyGeo, chassisMat);
    controllerGroup.add(centerBody);

    // Top Bridge
    const bridgeGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.45, 32, 1, false, 0, Math.PI);
    const bridge = new THREE.Mesh(bridgeGeo, chassisMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.rotation.y = Math.PI / 2;
    bridge.position.y = 0.45;
    controllerGroup.add(bridge);

    // 4B. Ergonomic Left & Right Grips
    const gripGeo = new THREE.CylinderGeometry(0.32, 0.42, 1.5, 32);

    const leftGrip = new THREE.Mesh(gripGeo, chassisMat);
    leftGrip.position.set(-1.05, -0.42, 0.05);
    leftGrip.rotation.z = -0.38;
    leftGrip.rotation.x = 0.12;
    controllerGroup.add(leftGrip);

    const rightGrip = new THREE.Mesh(gripGeo, chassisMat);
    rightGrip.position.set(1.05, -0.42, 0.05);
    rightGrip.rotation.z = 0.38;
    rightGrip.rotation.x = 0.12;
    controllerGroup.add(rightGrip);

    // Rubber Grip Overlays (Bottom handles)
    const rubberLeft = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), rubberGripMat);
    rubberLeft.position.set(-1.32, -0.98, 0.08);
    controllerGroup.add(rubberLeft);

    const rubberRight = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), rubberGripMat);
    rubberRight.position.set(1.32, -0.98, 0.08);
    controllerGroup.add(rubberRight);

    // 4C. Central Touchpad & LED Lightbar
    const touchpadGeo = new THREE.BoxGeometry(0.85, 0.48, 0.08);
    const touchpadMat = new THREE.MeshPhysicalMaterial({
        color: 0x0c0c14,
        roughness: 0.1,
        metalness: 0.9,
        clearcoat: 1.0
    });
    const touchpad = new THREE.Mesh(touchpadGeo, touchpadMat);
    touchpad.position.set(0, 0.22, 0.23);
    controllerGroup.add(touchpad);

    // Glowing LED Lightbar around touchpad
    const lightbarGeo = new THREE.BoxGeometry(0.88, 0.06, 0.04);
    const lightbarMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4, // Cyan LED
        transparent: true,
        opacity: 0.95
    });
    const lightbar = new THREE.Mesh(lightbarGeo, lightbarMat);
    lightbar.position.set(0, 0.48, 0.24);
    controllerGroup.add(lightbar);

    // Central Home Logo Button
    const logoButtonGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24);
    const logoButtonMat = new THREE.MeshBasicMaterial({ color: 0xec4899 });
    const logoButton = new THREE.Mesh(logoButtonGeo, logoButtonMat);
    logoButton.rotation.x = Math.PI / 2;
    logoButton.position.set(0, -0.15, 0.24);
    controllerGroup.add(logoButton);

    // 4D. Dual Analog Thumbsticks
    const stickMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0f,
        roughness: 0.8,
        metalness: 0.2
    });
    const stickRingMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.7
    });

    function createThumbstick(x, y) {
        const stickSubGroup = new THREE.Group();
        stickSubGroup.position.set(x, y, 0.22);

        // Base Ring Socket
        const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 16, 32), stickRingMat);
        stickSubGroup.add(baseRing);

        // Stem
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.2, 16), buttonMat);
        stem.rotation.x = Math.PI / 2;
        stem.position.z = 0.1;
        stickSubGroup.add(stem);

        // Concave Cap
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.08, 24), stickMat);
        cap.rotation.x = Math.PI / 2;
        cap.position.z = 0.2;
        stickSubGroup.add(cap);

        return stickSubGroup;
    }

    const leftStick = createThumbstick(-0.48, -0.22);
    controllerGroup.add(leftStick);

    const rightStick = createThumbstick(0.48, -0.22);
    controllerGroup.add(rightStick);

    // 4E. Directional D-Pad (Left Face)
    const dpadGroup = new THREE.Group();
    dpadGroup.position.set(-0.68, 0.15, 0.24);

    const dpadH = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.17, 0.08), buttonMat);
    const dpadV = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.52, 0.08), buttonMat);
    dpadGroup.add(dpadH);
    dpadGroup.add(dpadV);
    controllerGroup.add(dpadGroup);

    // 4F. Action Face Buttons (Right Face)
    const actionGroup = new THREE.Group();
    actionGroup.position.set(0.68, 0.15, 0.24);

    const buttonRadius = 0.07;
    const buttonColors = [0x38bdf8, 0xf43f5e, 0x10b981, 0xfbbf24]; // X, Circle, Triangle, Square
    const btnPositions = [
        { x: 0, y: 0.18 },   // North
        { x: 0.18, y: 0 },   // East
        { x: 0, y: -0.18 },  // South
        { x: -0.18, y: 0 }   // West
    ];

    btnPositions.forEach((pos, idx) => {
        const btnGeo = new THREE.CylinderGeometry(buttonRadius, buttonRadius, 0.08, 16);
        const btnMat = new THREE.MeshBasicMaterial({ color: buttonColors[idx] });
        const btn = new THREE.Mesh(btnGeo, btnMat);
        btn.rotation.x = Math.PI / 2;
        btn.position.set(pos.x, pos.y, 0.04);
        actionGroup.add(btn);
    });
    controllerGroup.add(actionGroup);

    // 4G. Shoulder Bumpers & Triggers (Top)
    const bumperGeo = new THREE.BoxGeometry(0.65, 0.16, 0.28);
    const leftBumper = new THREE.Mesh(bumperGeo, buttonMat);
    leftBumper.position.set(-0.85, 0.58, -0.05);
    leftBumper.rotation.z = -0.15;
    controllerGroup.add(leftBumper);

    const rightBumper = new THREE.Mesh(bumperGeo, buttonMat);
    rightBumper.position.set(0.85, 0.58, -0.05);
    rightBumper.rotation.z = 0.15;
    controllerGroup.add(rightBumper);

    // Initial angled pose for maximum 3D visual appeal
    rootGroup.rotation.x = 0.35;
    rootGroup.rotation.y = -0.45;

    // -------------------------------------------------------------
    // 5. Mouse Drag & Hover Interaction
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let autoRotateSpeed = 0.012;
    let targetRotY = -0.45;
    let targetRotX = 0.35;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - prevMouseX;
            const deltaY = e.clientY - prevMouseY;

            targetRotY += deltaX * 0.012;
            targetRotX += deltaY * 0.012;
            targetRotX = Math.max(-0.6, Math.min(0.9, targetRotX));

            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        }
    });

    // Touch support for mobile / tablets
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            prevMouseX = e.touches[0].clientX;
            prevMouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - prevMouseX;
            const deltaY = e.touches[0].clientY - prevMouseY;

            targetRotY += deltaX * 0.015;
            targetRotX += deltaY * 0.015;
            targetRotX = Math.max(-0.6, Math.min(0.9, targetRotX));

            prevMouseX = e.touches[0].clientX;
            prevMouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    // Resize listener
    function handleResize() {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize);

    // Visibility Observer to pause rendering when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // -------------------------------------------------------------
    // 6. Animation Render Loop
    // -------------------------------------------------------------
    let lastTime = performance.now();

    function animate(now) {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = now * 0.001;

        // Auto spin when not dragging
        if (!isDragging) {
            targetRotY += autoRotateSpeed;
        }

        // Smooth damping
        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

        // Disc rotates continuously
        discGroup.rotation.y += 0.018;

        // Floating hover physics on the controller
        controllerGroup.position.y = 0.25 + Math.sin(elapsedTime * 2.2) * 0.1;
        controllerGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.04;

        // Thumbsticks subtle twitch (active game feel)
        leftStick.rotation.x = Math.sin(elapsedTime * 3) * 0.12;
        leftStick.rotation.y = Math.cos(elapsedTime * 2.5) * 0.12;

        rightStick.rotation.x = Math.cos(elapsedTime * 2.8) * 0.1;
        rightStick.rotation.y = Math.sin(elapsedTime * 3.2) * 0.1;

        // Pulse LED lightbar
        const pulse = 0.75 + Math.sin(elapsedTime * 4) * 0.25;
        lightbar.material.opacity = pulse;

        renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);
}
