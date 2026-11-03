import * as THREE from 'three';

/**
 * 3D Metallic Blue Gaming Controller & Holographic Rotating Disc
 * Matches the reference image:
 * - Electric Cobalt / Metallic Blue chassis with gradient specular reflections
 * - Left raised circular platform with puffy 4-way D-Pad
 * - Right raised circular platform with 4 pearl-white spherical action buttons
 * - Dual collar-mounted pearl-white analog thumbsticks
 * - Dual middle pill buttons and top shoulder bumpers
 * - Holographic rotating disc elevated right beneath/around the controller
 * - Full interactive 360° mouse drag + floating hover physics
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
    camera.position.set(0, 1.1, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. High-Fidelity Studio Lighting (To match reference image highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // Key Light (Crisp specular gloss on top-left of controller)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(-4, 7, 6);
    scene.add(keyLight);

    // Sky Blue Rim Light (Left flank cyan sheen)
    const rimCyan = new THREE.PointLight(0x38bdf8, 8, 20);
    rimCyan.position.set(-5, 2, 4);
    scene.add(rimCyan);

    // Deep Cobalt / Violet Rim Light (Right & bottom depth)
    const rimBlue = new THREE.PointLight(0x1d4ed8, 9, 20);
    rimBlue.position.set(5, -2, 4);
    scene.add(rimBlue);

    // Subtle Under-glow for the disc
    const discGlow = new THREE.PointLight(0x06b6d4, 6, 12);
    discGlow.position.set(0, -1.2, 1);
    scene.add(discGlow);

    // Master Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 3. THE ROTATING DISC (Moved Higher to frame the controller)
    // -------------------------------------------------------------
    const discGroup = new THREE.Group();
    // Elevated higher as requested: -0.55 instead of -1.2
    discGroup.position.set(0, -0.55, 0);
    discGroup.rotation.x = 0.35; // tilted towards viewer
    rootGroup.add(discGroup);

    // Main Disc Base Platter
    const platterGeo = new THREE.CylinderGeometry(2.35, 2.45, 0.08, 64);
    const platterMat = new THREE.MeshPhysicalMaterial({
        color: 0x0b1120, // Deep dark navy metallic
        roughness: 0.18,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    discGroup.add(platter);

    // Outer Glowing Electric Cyan Rim
    const outerRimGeo = new THREE.TorusGeometry(2.45, 0.04, 16, 64);
    const outerRimMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4, // Cyan
        transparent: true,
        opacity: 0.95
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    discGroup.add(outerRim);

    // Middle Royal Blue Track
    const midRimGeo = new THREE.TorusGeometry(1.75, 0.028, 16, 64);
    const midRimMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6, // Electric Blue
        transparent: true,
        opacity: 0.85
    });
    const midRim = new THREE.Mesh(midRimGeo, midRimMat);
    midRim.rotation.x = Math.PI / 2;
    discGroup.add(midRim);

    // Inner Radiant Neon Violet Core Ring
    const innerRimGeo = new THREE.TorusGeometry(1.0, 0.032, 16, 64);
    const innerRimMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7, // Violet
        transparent: true,
        opacity: 0.95
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    discGroup.add(innerRim);

    // Holographic Radial Spokes
    const spokeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45
    });
    for (let i = 0; i < 4; i++) {
        const spokeGeo = new THREE.BoxGeometry(4.6, 0.02, 0.04);
        const spoke = new THREE.Mesh(spokeGeo, spokeMat);
        spoke.rotation.y = (i * Math.PI) / 4;
        discGroup.add(spoke);
    }

    // -------------------------------------------------------------
    // 4. THE 3D METALLIC BLUE GAMING CONTROLLER
    // -------------------------------------------------------------
    const controllerGroup = new THREE.Group();
    // Positioned gracefully above the elevated disc
    controllerGroup.position.set(0, 0.12, 0);
    rootGroup.add(controllerGroup);

    // Materials Matching the Reference Image:
    // Electric Cobalt Blue Chassis with Satin Clearcoat
    const blueChassisMat = new THREE.MeshPhysicalMaterial({
        color: 0x1d4ed8, // Vibrant Cobalt Blue
        emissive: 0x0284c7, // Sky Blue ambient sheen
        emissiveIntensity: 0.18,
        roughness: 0.22,
        metalness: 0.65,
        clearcoat: 1.0,
        clearcoatRoughness: 0.12
    });

    // Darker Blue Shadow / Underbelly Material
    const darkBlueMat = new THREE.MeshPhysicalMaterial({
        color: 0x172554, // Deep Navy Blue
        roughness: 0.35,
        metalness: 0.6
    });

    // Accent Sky Blue Material for D-Pad & Plates
    const skyBlueMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        roughness: 0.25,
        metalness: 0.5,
        clearcoat: 0.8
    });

    // Pearl / Cream White Glossy Material for Buttons & Sticks
    const pearlWhiteMat = new THREE.MeshPhysicalMaterial({
        color: 0xf8fafc,
        roughness: 0.12,
        metalness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08
    });

    // 4A. Controller Central Body Housing
    const mainBodyGeo = new THREE.BoxGeometry(1.65, 1.05, 0.55);
    const mainBody = new THREE.Mesh(mainBodyGeo, blueChassisMat);
    controllerGroup.add(mainBody);

    // Smooth Curved Top Bridge
    const bridgeGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.55, 32, 1, false, 0, Math.PI);
    const bridge = new THREE.Mesh(bridgeGeo, blueChassisMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.rotation.y = Math.PI / 2;
    bridge.position.y = 0.52;
    controllerGroup.add(bridge);

    // 4B. Ergonomic Left & Right Curved Handles
    const gripGeo = new THREE.CylinderGeometry(0.34, 0.44, 1.65, 32);

    const leftGrip = new THREE.Mesh(gripGeo, blueChassisMat);
    leftGrip.position.set(-1.12, -0.48, 0.06);
    leftGrip.rotation.z = -0.36;
    leftGrip.rotation.x = 0.14;
    controllerGroup.add(leftGrip);

    const rightGrip = new THREE.Mesh(gripGeo, blueChassisMat);
    rightGrip.position.set(1.12, -0.48, 0.06);
    rightGrip.rotation.z = 0.36;
    rightGrip.rotation.x = 0.14;
    controllerGroup.add(rightGrip);

    // Bulbous Handle Bottom Pods
    const podGeo = new THREE.SphereGeometry(0.44, 24, 24);
    const leftPod = new THREE.Mesh(podGeo, blueChassisMat);
    leftPod.position.set(-1.38, -1.12, 0.1);
    controllerGroup.add(leftPod);

    const rightPod = new THREE.Mesh(podGeo, blueChassisMat);
    rightPod.position.set(1.38, -1.12, 0.1);
    controllerGroup.add(rightPod);

    // 4C. Left Raised Circular Dish Platform (for D-Pad)
    const leftDishGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.18, 32);
    const leftDish = new THREE.Mesh(leftDishGeo, blueChassisMat);
    leftDish.rotation.x = Math.PI / 2;
    leftDish.position.set(-0.68, 0.38, 0.28);
    controllerGroup.add(leftDish);

    // Puffy 3D 4-Way D-Pad (as seen in reference image)
    const dpadGroup = new THREE.Group();
    dpadGroup.position.set(-0.68, 0.38, 0.38);

    const dpadArmGeoH = new THREE.CapsuleGeometry(0.14, 0.48, 16, 16);
    const dpadArmH = new THREE.Mesh(dpadArmGeoH, skyBlueMat);
    dpadArmH.rotation.z = Math.PI / 2;
    dpadGroup.add(dpadArmH);

    const dpadArmGeoV = new THREE.CapsuleGeometry(0.14, 0.48, 16, 16);
    const dpadArmV = new THREE.Mesh(dpadArmGeoV, skyBlueMat);
    dpadGroup.add(dpadArmV);

    const dpadCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24), darkBlueMat);
    dpadCenter.rotation.x = Math.PI / 2;
    dpadGroup.add(dpadCenter);
    controllerGroup.add(dpadGroup);

    // 4D. Right Raised Circular Dish Platform (for Action Buttons)
    const rightDishGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.18, 32);
    const rightDish = new THREE.Mesh(rightDishGeo, blueChassisMat);
    rightDish.rotation.x = Math.PI / 2;
    rightDish.position.set(0.68, 0.38, 0.28);
    controllerGroup.add(rightDish);

    // 4 Pearl-White Spherical Action Buttons (Diamond layout)
    const buttonGroup = new THREE.Group();
    buttonGroup.position.set(0.68, 0.38, 0.38);

    const btnRadius = 0.12;
    const btnOffsets = [
        { x: 0, y: 0.22 },   // North
        { x: 0.22, y: 0 },   // East
        { x: 0, y: -0.22 },  // South
        { x: -0.22, y: 0 }   // West
    ];

    btnOffsets.forEach((pos) => {
        const btnMesh = new THREE.Mesh(new THREE.SphereGeometry(btnRadius, 24, 24), pearlWhiteMat);
        btnMesh.position.set(pos.x, pos.y, 0.04);
        btnMesh.scale.z = 0.75; // slightly flattened dome
        buttonGroup.add(btnMesh);
    });
    controllerGroup.add(buttonGroup);

    // 4E. Dual Collar-Mounted Pearl-White Analog Thumbsticks
    function createStick(x, y) {
        const stickSub = new THREE.Group();
        stickSub.position.set(x, y, 0.28);

        // Raised Cylindrical Base Collar
        const collarGeo = new THREE.CylinderGeometry(0.36, 0.4, 0.2, 32);
        const collar = new THREE.Mesh(collarGeo, blueChassisMat);
        collar.rotation.x = Math.PI / 2;
        stickSub.add(collar);

        // Thin Inner Stem
        const stemGeo = new THREE.CylinderGeometry(0.09, 0.1, 0.22, 16);
        const stem = new THREE.Mesh(stemGeo, darkBlueMat);
        stem.rotation.x = Math.PI / 2;
        stem.position.z = 0.12;
        stickSub.add(stem);

        // Signature Pearl-White Mushroom Cap
        const capGeo = new THREE.SphereGeometry(0.24, 32, 32);
        const cap = new THREE.Mesh(capGeo, pearlWhiteMat);
        cap.position.z = 0.24;
        cap.scale.z = 0.72;
        stickSub.add(cap);

        return stickSub;
    }

    const leftStick = createStick(-0.42, -0.16);
    controllerGroup.add(leftStick);

    const rightStick = createStick(0.42, -0.16);
    controllerGroup.add(rightStick);

    // 4F. Center Control Buttons (Two small pill buttons)
    const centerBtnGeo = new THREE.CapsuleGeometry(0.06, 0.12, 12, 12);
    const leftCenterBtn = new THREE.Mesh(centerBtnGeo, skyBlueMat);
    leftCenterBtn.rotation.x = Math.PI / 2;
    leftCenterBtn.position.set(-0.16, 0.26, 0.28);
    controllerGroup.add(leftCenterBtn);

    const rightCenterBtn = new THREE.Mesh(centerBtnGeo, skyBlueMat);
    rightCenterBtn.rotation.x = Math.PI / 2;
    rightCenterBtn.position.set(0.16, 0.26, 0.28);
    controllerGroup.add(rightCenterBtn);

    // 4G. Top Shoulder Bumpers (L1 / R1)
    const bumperGeo = new THREE.BoxGeometry(0.72, 0.18, 0.32);
    const leftBumper = new THREE.Mesh(bumperGeo, blueChassisMat);
    leftBumper.position.set(-0.88, 0.65, -0.06);
    leftBumper.rotation.z = -0.16;
    controllerGroup.add(leftBumper);

    const rightBumper = new THREE.Mesh(bumperGeo, blueChassisMat);
    rightBumper.position.set(0.88, 0.65, -0.06);
    rightBumper.rotation.z = 0.16;
    controllerGroup.add(rightBumper);

    // Initial 3D Display Angle (Matching the iconic perspective angle in reference image)
    rootGroup.rotation.x = 0.36;
    rootGroup.rotation.y = -0.32;
    rootGroup.rotation.z = -0.04;

    // -------------------------------------------------------------
    // 5. Interactive Drag & Rotation Controls
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let autoRotateSpeed = 0.012;
    let targetRotY = -0.32;
    let targetRotX = 0.36;

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

    // Resize Handler
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

    // Performance Visibility Check
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

        // Auto spin when user is not dragging
        if (!isDragging) {
            targetRotY += autoRotateSpeed;
        }

        // Smooth spring damping
        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

        // Disc rotates continuously around its own axis
        discGroup.rotation.y += 0.018;

        // Subtle floating / breathing hover physics on the controller
        controllerGroup.position.y = 0.12 + Math.sin(elapsedTime * 2.2) * 0.08;
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
