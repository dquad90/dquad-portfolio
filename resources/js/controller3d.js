import * as THREE from 'three';

/**
 * EXACT 3D Designer Controller & Rotating Disc
 * Matches the reference image media_1793733251544_372a819d.png:
 * - Matte midnight purple-indigo chunky ergonomic chassis
 * - Two deep sunken circular wells on left and right faces
 * - Left well: Puffy pastel baby-blue / white 4-way cross D-Pad
 * - Right well: 4 candy buttons (Lime North, Golden West, Coral-Orange East, Cyan South)
 * - Lower angled chin with dual white mushroom analog thumbsticks
 * - Top white accent bracket with signature coiled purple cable loop
 * - Elevated holographic rotating disc framing the controller
 * - Full interactive 360° mouse drag + floating hover animation
 */
export function initBentoController() {
    const container = document.getElementById('controller-3d-container');
    const canvas = document.getElementById('controller-3d-canvas');
    if (!container || !canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.9, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Studio Lighting (Replicating the clean clay studio lighting in reference image)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Main Top-Left Key Light (Soft smooth clay highlights)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(-5, 8, 6);
    scene.add(keyLight);

    // Front-Right Fill Light
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    fillLight.position.set(5, 3, 5);
    scene.add(fillLight);

    // Subtle Cyan/Violet Rim Lights
    const rimCyan = new THREE.PointLight(0x38bdf8, 5, 15);
    rimCyan.position.set(-4, -1, 3);
    scene.add(rimCyan);

    const rimViolet = new THREE.PointLight(0xa855f7, 5, 15);
    rimViolet.position.set(4, 2, 3);
    scene.add(rimViolet);

    // Master Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 3. THE ELEVATED ROTATING DISC (Directly framing the controller)
    // -------------------------------------------------------------
    const discGroup = new THREE.Group();
    discGroup.position.set(0, -0.62, 0);
    discGroup.rotation.x = 0.38; // Tilted toward viewer
    rootGroup.add(discGroup);

    // Disc Base Turntable
    const platterGeo = new THREE.CylinderGeometry(2.35, 2.45, 0.08, 64);
    const platterMat = new THREE.MeshPhysicalMaterial({
        color: 0x141029, // Midnight purple-navy platter
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.15
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    discGroup.add(platter);

    // Outer Neon Violet Rim
    const outerRimGeo = new THREE.TorusGeometry(2.45, 0.04, 16, 64);
    const outerRimMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7, // Violet
        transparent: true,
        opacity: 0.95
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    discGroup.add(outerRim);

    // Middle Cyan Laser Track
    const midRimGeo = new THREE.TorusGeometry(1.75, 0.028, 16, 64);
    const midRimMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4, // Cyan
        transparent: true,
        opacity: 0.85
    });
    const midRim = new THREE.Mesh(midRimGeo, midRimMat);
    midRim.rotation.x = Math.PI / 2;
    discGroup.add(midRim);

    // Inner Glowing Amber/Gold Track (Harmonizing with candy buttons)
    const innerRimGeo = new THREE.TorusGeometry(1.05, 0.03, 16, 64);
    const innerRimMat = new THREE.MeshBasicMaterial({
        color: 0xfacc15, // Golden yellow
        transparent: true,
        opacity: 0.9
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    discGroup.add(innerRim);

    // Radial Holographic Crossbars
    const spokeMat = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.4
    });
    for (let i = 0; i < 4; i++) {
        const spokeGeo = new THREE.BoxGeometry(4.6, 0.02, 0.04);
        const spoke = new THREE.Mesh(spokeGeo, spokeMat);
        spoke.rotation.y = (i * Math.PI) / 4;
        discGroup.add(spoke);
    }

    // -------------------------------------------------------------
    // 4. THE EXACT 3D DESIGNER CONTROLLER
    // -------------------------------------------------------------
    const controllerGroup = new THREE.Group();
    controllerGroup.position.set(0, 0.15, 0);
    rootGroup.add(controllerGroup);

    // --- Materials Matching Reference Image ---
    // Deep Midnight Purple-Indigo Chassis (Satin clay finish)
    const purpleChassisMat = new THREE.MeshPhysicalMaterial({
        color: 0x242042, // Rich dark purple-indigo
        roughness: 0.32,
        metalness: 0.22,
        clearcoat: 0.65,
        clearcoatRoughness: 0.25
    });

    // Sunken Well Inset Material (Darker interior depth)
    const wellMat = new THREE.MeshStandardMaterial({
        color: 0x16132b, // Deeper midnight purple
        roughness: 0.5,
        metalness: 0.1
    });

    // Pastel Baby-Blue / Off-White for D-Pad
    const dpadMat = new THREE.MeshPhysicalMaterial({
        color: 0xe0e7ff, // Pastel off-white with sky tint
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 0.8
    });

    // Pearl White for Thumbstick Mushroom Caps & Top Bracket
    const pearlWhiteMat = new THREE.MeshPhysicalMaterial({
        color: 0xf8fafc,
        roughness: 0.15,
        metalness: 0.05,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1
    });

    // Candy Action Button Materials (Exact colors from reference)
    const btnLimeMat = new THREE.MeshPhysicalMaterial({ color: 0xbef264, roughness: 0.15, clearcoat: 0.9 });   // North
    const btnYellowMat = new THREE.MeshPhysicalMaterial({ color: 0xfacc15, roughness: 0.15, clearcoat: 0.9 }); // West
    const btnCoralMat = new THREE.MeshPhysicalMaterial({ color: 0xf97316, roughness: 0.15, clearcoat: 0.9 });  // East
    const btnCyanMat = new THREE.MeshPhysicalMaterial({ color: 0x06b6d4, roughness: 0.15, clearcoat: 0.9 });   // South

    // 4A. Central Body Bridge
    const mainBodyGeo = new THREE.BoxGeometry(1.8, 1.25, 0.65);
    const mainBody = new THREE.Mesh(mainBodyGeo, purpleChassisMat);
    controllerGroup.add(mainBody);

    // Top Curved Chamfer Bridge
    const topBridgeGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.65, 32, 1, false, 0, Math.PI);
    const topBridge = new THREE.Mesh(topBridgeGeo, purpleChassisMat);
    topBridge.rotation.z = Math.PI / 2;
    topBridge.rotation.y = Math.PI / 2;
    topBridge.position.y = 0.62;
    controllerGroup.add(topBridge);

    // 4B. Chunky Curved Handles
    const gripGeo = new THREE.CylinderGeometry(0.36, 0.46, 1.6, 32);

    const leftGrip = new THREE.Mesh(gripGeo, purpleChassisMat);
    leftGrip.position.set(-1.18, -0.45, 0.05);
    leftGrip.rotation.z = -0.38;
    leftGrip.rotation.x = 0.14;
    controllerGroup.add(leftGrip);

    const rightGrip = new THREE.Mesh(gripGeo, purpleChassisMat);
    rightGrip.position.set(1.18, -0.45, 0.05);
    rightGrip.rotation.z = 0.38;
    rightGrip.rotation.x = 0.14;
    controllerGroup.add(rightGrip);

    // Bulbous Handle Bottom Tips
    const podGeo = new THREE.SphereGeometry(0.46, 24, 24);
    const leftPod = new THREE.Mesh(podGeo, purpleChassisMat);
    leftPod.position.set(-1.42, -1.08, 0.1);
    controllerGroup.add(leftPod);

    const rightPod = new THREE.Mesh(podGeo, purpleChassisMat);
    rightPod.position.set(1.42, -1.08, 0.1);
    controllerGroup.add(rightPod);

    // 4C. Left Deep Sunken Well & Bevelled Rim (for D-Pad)
    const leftRim = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.08, 16, 48), purpleChassisMat);
    leftRim.position.set(-0.68, 0.35, 0.33);
    controllerGroup.add(leftRim);

    const leftWellBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.12, 32), wellMat);
    leftWellBottom.rotation.x = Math.PI / 2;
    leftWellBottom.position.set(-0.68, 0.35, 0.28);
    controllerGroup.add(leftWellBottom);

    // White Puffy 3D Cross D-Pad (inside the left well)
    const dpadGroup = new THREE.Group();
    dpadGroup.position.set(-0.68, 0.35, 0.36);

    const dpadArmH = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.52, 16, 16), dpadMat);
    dpadArmH.rotation.z = Math.PI / 2;
    dpadGroup.add(dpadArmH);

    const dpadArmV = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.52, 16, 16), dpadMat);
    dpadGroup.add(dpadArmV);
    controllerGroup.add(dpadGroup);

    // 4D. Right Deep Sunken Well & Bevelled Rim (for Action Buttons)
    const rightRim = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.08, 16, 48), purpleChassisMat);
    rightRim.position.set(0.68, 0.35, 0.33);
    controllerGroup.add(rightRim);

    const rightWellBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.12, 32), wellMat);
    rightWellBottom.rotation.x = Math.PI / 2;
    rightWellBottom.position.set(0.68, 0.35, 0.28);
    controllerGroup.add(rightWellBottom);

    // 4 Spherical Candy Action Buttons (Lime, Yellow, Coral, Cyan)
    const candyGroup = new THREE.Group();
    candyGroup.position.set(0.68, 0.35, 0.36);

    const btnRadius = 0.11;
    const btnConfigs = [
        { x: 0, y: 0.22, mat: btnLimeMat },     // North: Lime
        { x: -0.22, y: 0, mat: btnYellowMat },  // West: Yellow
        { x: 0.22, y: 0, mat: btnCoralMat },    // East: Coral-Orange
        { x: 0, y: -0.22, mat: btnCyanMat }     // South: Cyan
    ];

    btnConfigs.forEach((cfg) => {
        const btn = new THREE.Mesh(new THREE.SphereGeometry(btnRadius, 24, 24), cfg.mat);
        btn.position.set(cfg.x, cfg.y, 0.05);
        btn.scale.z = 0.8; // Rounded dome
        candyGroup.add(btn);
    });
    controllerGroup.add(candyGroup);

    // 4E. Lower Chin with Dual White Mushroom Thumbsticks
    const chinGeo = new THREE.BoxGeometry(1.2, 0.5, 0.35);
    const chin = new THREE.Mesh(chinGeo, purpleChassisMat);
    chin.position.set(0, -0.32, 0.28);
    chin.rotation.x = 0.25;
    controllerGroup.add(chin);

    function createThumbstick(x, y) {
        const stickSub = new THREE.Group();
        stickSub.position.set(x, y, 0.38);

        // Angled Base Collar
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.18, 32), purpleChassisMat);
        collar.rotation.x = Math.PI / 2 + 0.25;
        stickSub.add(collar);

        // Inner Stem
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.22, 16), wellMat);
        stem.rotation.x = Math.PI / 2 + 0.25;
        stem.position.set(0, -0.02, 0.12);
        stickSub.add(stem);

        // White Mushroom Cap
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), pearlWhiteMat);
        cap.position.set(0, -0.04, 0.24);
        cap.scale.z = 0.72; // Flattened mushroom dome
        stickSub.add(cap);

        return stickSub;
    }

    const leftStick = createThumbstick(-0.38, -0.26);
    controllerGroup.add(leftStick);

    const rightStick = createThumbstick(0.38, -0.26);
    controllerGroup.add(rightStick);

    // 4F. Top White Accent Bracket & Coiled Purple Cable Loop (The Signature Touch!)
    const whiteBracketGeo = new THREE.BoxGeometry(0.85, 0.14, 0.48);
    const whiteBracket = new THREE.Mesh(whiteBracketGeo, pearlWhiteMat);
    whiteBracket.position.set(0, 0.82, 0);
    controllerGroup.add(whiteBracket);

    // Coiled Purple Cable Loop standing atop the controller
    const cableLoopGeo = new THREE.TorusGeometry(0.32, 0.08, 16, 48);
    const cableLoop = new THREE.Mesh(cableLoopGeo, purpleChassisMat);
    cableLoop.position.set(0, 1.15, -0.04);
    cableLoop.rotation.x = 0.2; // Tilted slightly backwards
    controllerGroup.add(cableLoop);

    // Coiled cable plug stem connecting bracket into loop
    const plugStem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.2, 16), purpleChassisMat);
    plugStem.position.set(0, 0.92, -0.02);
    controllerGroup.add(plugStem);

    // 4G. Shoulder Bumpers (Top L1 / R1)
    const bumperGeo = new THREE.BoxGeometry(0.72, 0.18, 0.34);
    const leftBumper = new THREE.Mesh(bumperGeo, purpleChassisMat);
    leftBumper.position.set(-0.92, 0.74, -0.05);
    leftBumper.rotation.z = -0.16;
    controllerGroup.add(leftBumper);

    const rightBumper = new THREE.Mesh(bumperGeo, purpleChassisMat);
    rightBumper.position.set(0.92, 0.74, -0.05);
    rightBumper.rotation.z = 0.16;
    controllerGroup.add(rightBumper);

    // Initial 3D Display Angle (Matching the iconic perspective angle in reference image)
    rootGroup.rotation.x = 0.35;
    rootGroup.rotation.y = -0.36;
    rootGroup.rotation.z = -0.05;

    // -------------------------------------------------------------
    // 5. Interactive Drag & Rotation Controls
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let autoRotateSpeed = 0.012;
    let targetRotY = -0.36;
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

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // -------------------------------------------------------------
    // 6. Animation Render Loop
    // -------------------------------------------------------------
    function animate(now) {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = now * 0.001;

        // Auto spin when not dragging
        if (!isDragging) {
            targetRotY += autoRotateSpeed;
        }

        // Smooth spring damping
        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

        // Disc rotates continuously around its axis
        discGroup.rotation.y += 0.018;

        // Floating hover physics on the controller
        controllerGroup.position.y = 0.15 + Math.sin(elapsedTime * 2.2) * 0.08;
        controllerGroup.rotation.z = Math.sin(elapsedTime * 1.6) * 0.03;

        // Subtle dynamic twitch on the analog thumbsticks (alive gaming feel)
        leftStick.rotation.x = Math.sin(elapsedTime * 3) * 0.1;
        leftStick.rotation.y = Math.cos(elapsedTime * 2.5) * 0.1;

        rightStick.rotation.x = Math.cos(elapsedTime * 2.7) * 0.08;
        rightStick.rotation.y = Math.sin(elapsedTime * 3.1) * 0.08;

        renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);
}
