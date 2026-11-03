import * as THREE from 'three';

/**
 * EXACT 3D Designer Controller & Holographic Halo Disc
 * Matches the reference image media_1793733251544_372a819d.png:
 * - Midnight purple-indigo chunky ergonomic chassis
 * - Left sunken circular well with puffy pastel white 4-way cross D-Pad
 * - Right sunken circular well with 4 candy action buttons (Lime, Yellow, Coral, Cyan)
 * - Lower angled chin with dual white mushroom thumbsticks
 * - Top white accent bracket with signature coiled purple cable loop
 * - Hollow glowing holographic halo disc that wraps around the controller without clipping
 * - Front-facing showcase angle with smooth idle sway & full 360° drag interactivity
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
    // Camera positioned at eye level looking straight at the controller front
    camera.position.set(0, 0.4, 5.6);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Multi-Directional Studio Lighting (No pitch black shadows)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Top-Left Key Light (Matches reference image specular sheen)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(-5, 7, 6);
    scene.add(keyLight);

    // Front-Right Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 1.2);
    fillLight.position.set(5, 3, 5);
    scene.add(fillLight);

    // Underbelly Uplight (Illuminates handles and disc from below)
    const upLight = new THREE.PointLight(0x38bdf8, 6, 15);
    upLight.position.set(0, -3, 3);
    scene.add(upLight);

    // Back Light (Soft rim lighting if dragged around)
    const backLight = new THREE.DirectionalLight(0x818cf8, 1.2);
    backLight.position.set(0, 3, -6);
    scene.add(backLight);

    // Master Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 3. THE HOLLOW HOLOGRAPHIC HALO DISC (Elevated & Non-Clipping)
    // -------------------------------------------------------------
    // Placed at y = -0.32, wrapping around the controller like a glowing sci-fi pedestal
    const discGroup = new THREE.Group();
    discGroup.position.set(0, -0.32, 0);
    discGroup.rotation.x = 0.32; // Tilted towards viewer
    rootGroup.add(discGroup);

    // Holographic Translucent Ring (HOLLOW CENTER: radius 1.55 to 2.45)
    // The controller handles pass freely through the center hole!
    const ringGeo = new THREE.RingGeometry(1.55, 2.45, 64);
    const ringMat = new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6, // Violet-blue
        emissive: 0x6366f1,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const ringPlane = new THREE.Mesh(ringGeo, ringMat);
    ringPlane.rotation.x = Math.PI / 2;
    discGroup.add(ringPlane);

    // Outer Glowing Neon Fuchsia / Violet Rim
    const outerRimGeo = new THREE.TorusGeometry(2.45, 0.035, 16, 64);
    const outerRimMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.95
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    discGroup.add(outerRim);

    // Middle Radiant Cyan Laser Track
    const midRimGeo = new THREE.TorusGeometry(2.0, 0.024, 16, 64);
    const midRimMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.9
    });
    const midRim = new THREE.Mesh(midRimGeo, midRimMat);
    midRim.rotation.x = Math.PI / 2;
    discGroup.add(midRim);

    // Inner Hole Glowing Cyan Rim (Frames the controller handles)
    const innerRimGeo = new THREE.TorusGeometry(1.55, 0.03, 16, 64);
    const innerRimMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.95
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    discGroup.add(innerRim);

    // Radial Holographic Energy Spokes
    const spokeMat = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.5
    });
    for (let i = 0; i < 4; i++) {
        const spokeGeo = new THREE.BoxGeometry(4.7, 0.015, 0.03);
        const spoke = new THREE.Mesh(spokeGeo, spokeMat);
        spoke.rotation.y = (i * Math.PI) / 4;
        discGroup.add(spoke);
    }

    // -------------------------------------------------------------
    // 4. THE 3D DESIGNER GAMING CONTROLLER
    // -------------------------------------------------------------
    const controllerGroup = new THREE.Group();
    controllerGroup.position.set(0, 0.05, 0);
    rootGroup.add(controllerGroup);

    // --- Materials Matching Reference Image ---
    // Deep Midnight Purple-Indigo Chassis (Smooth satin clay finish)
    const purpleChassisMat = new THREE.MeshPhysicalMaterial({
        color: 0x242042, // Rich dark purple-indigo
        roughness: 0.3,
        metalness: 0.2,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2
    });

    // Dark Sunken Well Floor (Interior cavity)
    const wellFloorMat = new THREE.MeshStandardMaterial({
        color: 0x141129,
        roughness: 0.5,
        metalness: 0.1
    });

    // Pastel Baby-Blue / Off-White for D-Pad
    const dpadMat = new THREE.MeshPhysicalMaterial({
        color: 0xdbeafe, // Soft sky white
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 0.85
    });

    // Pearl White for Thumbstick Caps & Top Bracket
    const pearlWhiteMat = new THREE.MeshPhysicalMaterial({
        color: 0xf8fafc,
        roughness: 0.12,
        metalness: 0.05,
        clearcoat: 0.95,
        clearcoatRoughness: 0.1
    });

    // Candy Action Buttons (Exact colors from reference)
    const btnLimeMat = new THREE.MeshPhysicalMaterial({ color: 0xbef264, roughness: 0.15, clearcoat: 0.95 });   // North (Lime)
    const btnYellowMat = new THREE.MeshPhysicalMaterial({ color: 0xfacc15, roughness: 0.15, clearcoat: 0.95 }); // West (Golden)
    const btnCoralMat = new THREE.MeshPhysicalMaterial({ color: 0xf97316, roughness: 0.15, clearcoat: 0.95 });  // East (Coral)
    const btnCyanMat = new THREE.MeshPhysicalMaterial({ color: 0x06b6d4, roughness: 0.15, clearcoat: 0.95 });   // South (Cyan)

    // 4A. Central Body Bridge
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.75, 1.2, 0.62), purpleChassisMat);
    controllerGroup.add(mainBody);

    // Top Curved Chamfer Bridge
    const topBridge = new THREE.Mesh(new THREE.CylinderGeometry(0.87, 0.87, 0.62, 32, 1, false, 0, Math.PI), purpleChassisMat);
    topBridge.rotation.z = Math.PI / 2;
    topBridge.rotation.y = Math.PI / 2;
    topBridge.position.y = 0.6;
    controllerGroup.add(topBridge);

    // 4B. Chunky Curved Handles
    const gripGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.55, 32);

    const leftGrip = new THREE.Mesh(gripGeo, purpleChassisMat);
    leftGrip.position.set(-1.15, -0.42, 0.05);
    leftGrip.rotation.z = -0.38;
    leftGrip.rotation.x = 0.14;
    controllerGroup.add(leftGrip);

    const rightGrip = new THREE.Mesh(gripGeo, purpleChassisMat);
    rightGrip.position.set(1.15, -0.42, 0.05);
    rightGrip.rotation.z = 0.38;
    rightGrip.rotation.x = 0.14;
    controllerGroup.add(rightGrip);

    // Bulbous Handle Bottom Tips
    const podGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const leftPod = new THREE.Mesh(podGeo, purpleChassisMat);
    leftPod.position.set(-1.38, -1.05, 0.1);
    controllerGroup.add(leftPod);

    const rightPod = new THREE.Mesh(podGeo, purpleChassisMat);
    rightPod.position.set(1.38, -1.05, 0.1);
    controllerGroup.add(rightPod);

    // 4C. Left Sunken Well & Bevelled Rim (for D-Pad)
    const leftRim = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.07, 16, 48), purpleChassisMat);
    leftRim.position.set(-0.66, 0.35, 0.31);
    controllerGroup.add(leftRim);

    const leftWell = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 32), wellFloorMat);
    leftWell.rotation.x = Math.PI / 2;
    leftWell.position.set(-0.66, 0.35, 0.27);
    controllerGroup.add(leftWell);

    // White Puffy 3D Cross D-Pad
    const dpadGroup = new THREE.Group();
    dpadGroup.position.set(-0.66, 0.35, 0.35);

    const dpadArmH = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.48, 16, 16), dpadMat);
    dpadArmH.rotation.z = Math.PI / 2;
    dpadGroup.add(dpadArmH);

    const dpadArmV = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.48, 16, 16), dpadMat);
    dpadGroup.add(dpadArmV);
    controllerGroup.add(dpadGroup);

    // 4D. Right Sunken Well & Bevelled Rim (for Action Buttons)
    const rightRim = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.07, 16, 48), purpleChassisMat);
    rightRim.position.set(0.66, 0.35, 0.31);
    controllerGroup.add(rightRim);

    const rightWell = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 32), wellFloorMat);
    rightWell.rotation.x = Math.PI / 2;
    rightWell.position.set(0.66, 0.35, 0.27);
    controllerGroup.add(rightWell);

    // 4 Spherical Candy Action Buttons
    const candyGroup = new THREE.Group();
    candyGroup.position.set(0.66, 0.35, 0.35);

    const btnRadius = 0.11;
    const btnConfigs = [
        { x: 0, y: 0.21, mat: btnLimeMat },     // North: Lime
        { x: -0.21, y: 0, mat: btnYellowMat },  // West: Yellow
        { x: 0.21, y: 0, mat: btnCoralMat },    // East: Coral
        { x: 0, y: -0.21, mat: btnCyanMat }     // South: Cyan
    ];

    btnConfigs.forEach((cfg) => {
        const btn = new THREE.Mesh(new THREE.SphereGeometry(btnRadius, 24, 24), cfg.mat);
        btn.position.set(cfg.x, cfg.y, 0.05);
        btn.scale.z = 0.8;
        candyGroup.add(btn);
    });
    controllerGroup.add(candyGroup);

    // 4E. Lower Chin with Dual White Mushroom Thumbsticks
    const chin = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.48, 0.32), purpleChassisMat);
    chin.position.set(0, -0.3, 0.26);
    chin.rotation.x = 0.22;
    controllerGroup.add(chin);

    function createThumbstick(x, y) {
        const stickSub = new THREE.Group();
        stickSub.position.set(x, y, 0.36);

        // Angled Base Collar
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.16, 32), purpleChassisMat);
        collar.rotation.x = Math.PI / 2 + 0.22;
        stickSub.add(collar);

        // Inner Stem
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.2, 16), wellFloorMat);
        stem.rotation.x = Math.PI / 2 + 0.22;
        stem.position.set(0, -0.02, 0.1);
        stickSub.add(stem);

        // White Mushroom Cap
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), pearlWhiteMat);
        cap.position.set(0, -0.03, 0.22);
        cap.scale.z = 0.72;
        stickSub.add(cap);

        return stickSub;
    }

    const leftStick = createThumbstick(-0.36, -0.24);
    controllerGroup.add(leftStick);

    const rightStick = createThumbstick(0.36, -0.24);
    controllerGroup.add(rightStick);

    // 4F. Top White Accent Bracket & Coiled Purple Cable Loop
    const whiteBracket = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.13, 0.45), pearlWhiteMat);
    whiteBracket.position.set(0, 0.78, 0);
    controllerGroup.add(whiteBracket);

    // Coiled Purple Cable Loop standing atop the controller
    const cableLoop = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.075, 16, 48), purpleChassisMat);
    cableLoop.position.set(0, 1.08, -0.04);
    cableLoop.rotation.x = 0.2;
    controllerGroup.add(cableLoop);

    const plugStem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.18, 16), purpleChassisMat);
    plugStem.position.set(0, 0.88, -0.02);
    controllerGroup.add(plugStem);

    // 4G. Shoulder Bumpers (Top L1 / R1)
    const bumperGeo = new THREE.BoxGeometry(0.68, 0.16, 0.32);
    const leftBumper = new THREE.Mesh(bumperGeo, purpleChassisMat);
    leftBumper.position.set(-0.88, 0.7, -0.05);
    leftBumper.rotation.z = -0.16;
    controllerGroup.add(leftBumper);

    const rightBumper = new THREE.Mesh(bumperGeo, purpleChassisMat);
    rightBumper.position.set(0.88, 0.7, -0.05);
    rightBumper.rotation.z = 0.16;
    controllerGroup.add(rightBumper);

    // -------------------------------------------------------------
    // 5. INITIAL SHOWCASE ORIENTATION (Matches Reference Image Exactly)
    // -------------------------------------------------------------
    // Front face prominently displays D-pad, candy buttons, and top loop!
    const HERO_ROT_X = 0.22;
    const HERO_ROT_Y = -0.42;

    rootGroup.rotation.x = HERO_ROT_X;
    rootGroup.rotation.y = HERO_ROT_Y;
    rootGroup.rotation.z = -0.04;

    // -------------------------------------------------------------
    // 6. Interactive Drag & Showcase Sway Controls
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = HERO_ROT_Y;
    let targetRotX = HERO_ROT_X;

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
            targetRotX = Math.max(-0.6, Math.min(0.8, targetRotX));

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
            targetRotX = Math.max(-0.6, Math.min(0.8, targetRotX));

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
    // 7. Animation Render Loop (Hero Showcase Sway)
    // -------------------------------------------------------------
    function animate(now) {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = now * 0.001;

        // When user is not dragging:
        // Gentle Showcase Sway keeping the front face ALWAYS in prime view!
        if (!isDragging) {
            const swayY = HERO_ROT_Y + Math.sin(elapsedTime * 1.2) * 0.28;
            const swayX = HERO_ROT_X + Math.cos(elapsedTime * 1.5) * 0.08;
            targetRotY = swayY;
            targetRotX = swayX;
        }

        // Smooth spring damping
        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

        // The holographic halo disc spins continuously around its own center
        discGroup.rotation.y += 0.022;

        // Floating hover physics on the controller
        controllerGroup.position.y = 0.05 + Math.sin(elapsedTime * 2.2) * 0.06;
        controllerGroup.rotation.z = Math.sin(elapsedTime * 1.6) * 0.025;

        // Subtle alive twitch on thumbsticks
        leftStick.rotation.x = Math.sin(elapsedTime * 3) * 0.08;
        leftStick.rotation.y = Math.cos(elapsedTime * 2.5) * 0.08;

        rightStick.rotation.x = Math.cos(elapsedTime * 2.7) * 0.06;
        rightStick.rotation.y = Math.sin(elapsedTime * 3.1) * 0.06;

        renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);
}
