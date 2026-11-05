import * as THREE from 'three';

/**
 * EXACT 3D Designer Controller & Holographic Halo Disc
 * Feature Set:
 * - Matte midnight purple-indigo chunky ergonomic chassis
 * - Left sunken circular well with puffy pastel white 4-way cross D-Pad
 * - Right sunken circular well with 4 candy action buttons (Lime, Yellow, Coral, Cyan)
 * - Lower angled chin with dual white mushroom thumbsticks
 * - Top white accent bracket with signature coiled purple cable loop
 * - Hollow glowing holographic halo disc wrapping around the controller
 * - INTERACTIVE CLICKABLE BUTTONS: Click candy buttons, D-pad, sticks or bumpers to visibly press them
 * - LIVE HUD TELEMETRY FEED: Updates viewport status & input chip on every press
 * - Full 360° drag rotation + showcase idle sway
 * - Gamepad API integration for physical gamepads
 */
export function initBentoController() {
    const container = document.getElementById('controller-3d-container');
    const canvas = document.getElementById('controller-3d-canvas');
    if (!container || !canvas) return;

    // HUD Telemetry Elements
    const telemetryText = document.getElementById('controller-telemetry-text');
    const inputChip = document.getElementById('controller-input-chip');
    const inputLabel = document.getElementById('controller-input-label');
    const pingDot = document.getElementById('controller-ping-dot');

    let resetTelemetryTimeout = null;

    function triggerInputFeedback(label, isHardware = false) {
        if (telemetryText) {
            telemetryText.textContent = isHardware ? 'HARDWARE // ACTIVE' : 'INPUT // DETECTED';
            telemetryText.classList.remove('text-cyan-400');
            telemetryText.classList.add('text-emerald-400');
        }
        if (pingDot) {
            pingDot.classList.remove('bg-cyan-400');
            pingDot.classList.add('bg-emerald-400');
        }
        if (inputChip && inputLabel) {
            inputLabel.textContent = label;
            inputChip.classList.remove('opacity-0', 'translate-y-1');
            inputChip.classList.add('opacity-100', 'translate-y-0');
        }

        clearTimeout(resetTelemetryTimeout);
        resetTelemetryTimeout = setTimeout(() => {
            if (telemetryText) {
                telemetryText.textContent = 'VIEWPORT // READY';
                telemetryText.classList.remove('text-emerald-400');
                telemetryText.classList.add('text-cyan-400');
            }
            if (pingDot) {
                pingDot.classList.remove('bg-emerald-400');
                pingDot.classList.add('bg-cyan-400');
            }
            if (inputChip) {
                inputChip.classList.remove('opacity-100', 'translate-y-0');
                inputChip.classList.add('opacity-0', 'translate-y-1');
            }
        }, 1800);
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
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

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(-5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 1.2);
    fillLight.position.set(5, 3, 5);
    scene.add(fillLight);

    const upLight = new THREE.PointLight(0x38bdf8, 6, 15);
    upLight.position.set(0, -3, 3);
    scene.add(upLight);

    const backLight = new THREE.DirectionalLight(0x818cf8, 1.2);
    backLight.position.set(0, 3, -6);
    scene.add(backLight);

    // Master Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 3. THE HOLLOW HOLOGRAPHIC HALO DISC
    // -------------------------------------------------------------
    const discGroup = new THREE.Group();
    discGroup.position.set(0, -0.32, 0);
    discGroup.rotation.x = 0.32;
    rootGroup.add(discGroup);

    const ringGeo = new THREE.RingGeometry(1.55, 2.45, 64);
    const ringMat = new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
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

    const outerRimGeo = new THREE.TorusGeometry(2.45, 0.035, 16, 64);
    const outerRimMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.95
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    discGroup.add(outerRim);

    const midRimGeo = new THREE.TorusGeometry(2.0, 0.024, 16, 64);
    const midRimMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.9
    });
    const midRim = new THREE.Mesh(midRimGeo, midRimMat);
    midRim.rotation.x = Math.PI / 2;
    discGroup.add(midRim);

    const innerRimGeo = new THREE.TorusGeometry(1.55, 0.03, 16, 64);
    const innerRimMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.95
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    discGroup.add(innerRim);

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

    // Interactive clickable meshes for raycasting
    const interactiveMeshes = [];

    // Materials Matching Reference Image
    const purpleChassisMat = new THREE.MeshPhysicalMaterial({
        color: 0x242042,
        roughness: 0.3,
        metalness: 0.2,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2
    });

    const wellFloorMat = new THREE.MeshStandardMaterial({
        color: 0x141129,
        roughness: 0.5,
        metalness: 0.1
    });

    const dpadMat = new THREE.MeshPhysicalMaterial({
        color: 0xdbeafe,
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 0.85
    });

    const pearlWhiteMat = new THREE.MeshPhysicalMaterial({
        color: 0xf8fafc,
        roughness: 0.12,
        metalness: 0.05,
        clearcoat: 0.95,
        clearcoatRoughness: 0.1
    });

    const btnLimeMat = new THREE.MeshPhysicalMaterial({ color: 0xbef264, roughness: 0.15, clearcoat: 0.95 });
    const btnYellowMat = new THREE.MeshPhysicalMaterial({ color: 0xfacc15, roughness: 0.15, clearcoat: 0.95 });
    const btnCoralMat = new THREE.MeshPhysicalMaterial({ color: 0xf97316, roughness: 0.15, clearcoat: 0.95 });
    const btnCyanMat = new THREE.MeshPhysicalMaterial({ color: 0x06b6d4, roughness: 0.15, clearcoat: 0.95 });

    // 4A. Central Body Bridge
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.75, 1.2, 0.62), purpleChassisMat);
    controllerGroup.add(mainBody);

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

    const podGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const leftPod = new THREE.Mesh(podGeo, purpleChassisMat);
    leftPod.position.set(-1.38, -1.05, 0.1);
    controllerGroup.add(leftPod);

    const rightPod = new THREE.Mesh(podGeo, purpleChassisMat);
    rightPod.position.set(1.38, -1.05, 0.1);
    controllerGroup.add(rightPod);

    // 4C. Left Sunken Well & Bevelled Rim
    const leftRim = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.07, 16, 48), purpleChassisMat);
    leftRim.position.set(-0.66, 0.35, 0.31);
    controllerGroup.add(leftRim);

    const leftWell = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 32), wellFloorMat);
    leftWell.rotation.x = Math.PI / 2;
    leftWell.position.set(-0.66, 0.35, 0.27);
    controllerGroup.add(leftWell);

    // Clickable Puffy 3D Cross D-Pad
    const dpadGroup = new THREE.Group();
    dpadGroup.position.set(-0.66, 0.35, 0.35);

    const dpadArmH = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.48, 16, 16), dpadMat);
    dpadArmH.rotation.z = Math.PI / 2;
    dpadArmH.userData = { id: 'DPAD_LR', label: 'D-PAD [LEFT / RIGHT]', origZ: 0, group: dpadGroup };
    dpadGroup.add(dpadArmH);
    interactiveMeshes.push(dpadArmH);

    const dpadArmV = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.48, 16, 16), dpadMat);
    dpadArmV.userData = { id: 'DPAD_UD', label: 'D-PAD [UP / DOWN]', origZ: 0, group: dpadGroup };
    dpadGroup.add(dpadArmV);
    interactiveMeshes.push(dpadArmV);

    controllerGroup.add(dpadGroup);

    // 4D. Right Sunken Well & Bevelled Rim
    const rightRim = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.07, 16, 48), purpleChassisMat);
    rightRim.position.set(0.66, 0.35, 0.31);
    controllerGroup.add(rightRim);

    const rightWell = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 32), wellFloorMat);
    rightWell.rotation.x = Math.PI / 2;
    rightWell.position.set(0.66, 0.35, 0.27);
    controllerGroup.add(rightWell);

    // 4 Clickable Spherical Candy Action Buttons
    const candyGroup = new THREE.Group();
    candyGroup.position.set(0.66, 0.35, 0.35);

    const btnRadius = 0.11;
    const btnConfigs = [
        { x: 0, y: 0.21, mat: btnLimeMat, id: 'BTN_Y_LIME', label: 'ACTION [Y / LIME]' },
        { x: -0.21, y: 0, mat: btnYellowMat, id: 'BTN_X_GOLD', label: 'ACTION [X / GOLD]' },
        { x: 0.21, y: 0, mat: btnCoralMat, id: 'BTN_B_CORAL', label: 'ACTION [B / CORAL]' },
        { x: 0, y: -0.21, mat: btnCyanMat, id: 'BTN_A_CYAN', label: 'ACTION [A / CYAN]' }
    ];

    const candyMeshes = [];
    btnConfigs.forEach((cfg) => {
        const btn = new THREE.Mesh(new THREE.SphereGeometry(btnRadius, 24, 24), cfg.mat);
        btn.position.set(cfg.x, cfg.y, 0.05);
        btn.scale.z = 0.8;
        btn.userData = { id: cfg.id, label: cfg.label, origZ: 0.05, type: 'candy' };
        candyGroup.add(btn);
        interactiveMeshes.push(btn);
        candyMeshes.push(btn);
    });
    controllerGroup.add(candyGroup);

    // 4E. Lower Chin with Dual Clickable White Mushroom Thumbsticks
    const chin = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.48, 0.32), purpleChassisMat);
    chin.position.set(0, -0.3, 0.26);
    chin.rotation.x = 0.22;
    controllerGroup.add(chin);

    function createThumbstick(x, y, labelId, labelText) {
        const stickSub = new THREE.Group();
        stickSub.position.set(x, y, 0.36);

        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.16, 32), purpleChassisMat);
        collar.rotation.x = Math.PI / 2 + 0.22;
        stickSub.add(collar);

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.2, 16), wellFloorMat);
        stem.rotation.x = Math.PI / 2 + 0.22;
        stem.position.set(0, -0.02, 0.1);
        stickSub.add(stem);

        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), pearlWhiteMat);
        cap.position.set(0, -0.03, 0.22);
        cap.scale.z = 0.72;
        cap.userData = { id: labelId, label: labelText, stickGroup: stickSub, origZ: 0.22, type: 'stick' };
        stickSub.add(cap);
        interactiveMeshes.push(cap);

        return { group: stickSub, cap: cap };
    }

    const leftStickObj = createThumbstick(-0.36, -0.24, 'STICK_L', 'L-STICK [MOVE / NAV]');
    controllerGroup.add(leftStickObj.group);

    const rightStickObj = createThumbstick(0.36, -0.24, 'STICK_R', 'R-STICK [LOOK / AIM]');
    controllerGroup.add(rightStickObj.group);

    // 4F. Top White Accent Bracket & Coiled Purple Cable Loop
    const whiteBracket = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.13, 0.45), pearlWhiteMat);
    whiteBracket.position.set(0, 0.78, 0);
    controllerGroup.add(whiteBracket);

    const cableLoop = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.075, 16, 48), purpleChassisMat);
    cableLoop.position.set(0, 1.08, -0.04);
    cableLoop.rotation.x = 0.2;
    controllerGroup.add(cableLoop);

    const plugStem = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.18, 16), purpleChassisMat);
    plugStem.position.set(0, 0.88, -0.02);
    controllerGroup.add(plugStem);

    // 4G. Shoulder Bumpers (Clickable L1 / R1)
    const bumperGeo = new THREE.BoxGeometry(0.68, 0.16, 0.32);
    const leftBumper = new THREE.Mesh(bumperGeo, purpleChassisMat);
    leftBumper.position.set(-0.88, 0.7, -0.05);
    leftBumper.rotation.z = -0.16;
    leftBumper.userData = { id: 'BUMPER_L1', label: 'BUMPER [L1 / FIRE]', origZ: -0.05, type: 'bumper' };
    interactiveMeshes.push(leftBumper);
    controllerGroup.add(leftBumper);

    const rightBumper = new THREE.Mesh(bumperGeo, purpleChassisMat);
    rightBumper.position.set(0.88, 0.7, -0.05);
    rightBumper.rotation.z = 0.16;
    rightBumper.userData = { id: 'BUMPER_R1', label: 'BUMPER [R1 / SPECIAL]', origZ: -0.05, type: 'bumper' };
    interactiveMeshes.push(rightBumper);
    controllerGroup.add(rightBumper);

    // -------------------------------------------------------------
    // 5. INITIAL SHOWCASE ORIENTATION
    // -------------------------------------------------------------
    const HERO_ROT_X = 0.22;
    const HERO_ROT_Y = -0.42;

    rootGroup.rotation.x = HERO_ROT_X;
    rootGroup.rotation.y = HERO_ROT_Y;
    rootGroup.rotation.z = -0.04;

    // -------------------------------------------------------------
    // 6. RAYCASTING & BUTTON PRESS PHYSICS
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    function pressMesh(mesh) {
        if (!mesh || !mesh.userData) return;
        const u = mesh.userData;

        // Visual press deflection
        if (u.type === 'candy') {
            mesh.position.z = u.origZ - 0.06;
            setTimeout(() => { mesh.position.z = u.origZ; }, 160);
        } else if (u.type === 'dpad') {
            u.group.position.z = 0.30;
            setTimeout(() => { u.group.position.z = 0.35; }, 160);
        } else if (u.type === 'stick') {
            u.stickGroup.rotation.x += 0.2;
            mesh.position.z = u.origZ - 0.05;
            setTimeout(() => {
                u.stickGroup.rotation.x -= 0.2;
                mesh.position.z = u.origZ;
            }, 180);
        } else if (u.type === 'bumper') {
            mesh.position.y -= 0.05;
            setTimeout(() => { mesh.position.y += 0.05; }, 160);
        }

        // Trigger telemetry feedback
        triggerInputFeedback(u.label);
    }

    // -------------------------------------------------------------
    // 7. Interactive Drag & Click Controls
    // -------------------------------------------------------------
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let startDownX = 0;
    let startDownY = 0;
    let targetRotY = HERO_ROT_Y;
    let targetRotX = HERO_ROT_X;

    function getCanvasCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
            y: -((e.clientY - rect.top) / rect.height) * 2 + 1
        };
    }

    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        prevMouseX = startDownX = e.clientX;
        prevMouseY = startDownY = e.clientY;
    });

    window.addEventListener('pointerup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        // Check if movement was minimal (Click event!)
        const dist = Math.hypot(e.clientX - startDownX, e.clientY - startDownY);
        if (dist < 6) {
            const coords = getCanvasCoordinates(e);
            mouseVec.set(coords.x, coords.y);
            raycaster.setFromCamera(mouseVec, camera);
            const hits = raycaster.intersectObjects(interactiveMeshes, false);
            if (hits.length > 0) {
                pressMesh(hits[0].object);
            }
        }
    });

    container.addEventListener('pointermove', (e) => {
        // Drag rotation
        if (isDragging) {
            const deltaX = e.clientX - prevMouseX;
            const deltaY = e.clientY - prevMouseY;

            targetRotY += deltaX * 0.012;
            targetRotX += deltaY * 0.012;
            targetRotX = Math.max(-0.6, Math.min(0.8, targetRotX));

            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        } else {
            // Hover cursor detection
            const coords = getCanvasCoordinates(e);
            mouseVec.set(coords.x, coords.y);
            raycaster.setFromCamera(mouseVec, camera);
            const hits = raycaster.intersectObjects(interactiveMeshes, false);
            container.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
        }
    });

    // Touch support for mobile devices
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            prevMouseX = startDownX = e.touches[0].clientX;
            prevMouseY = startDownY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        isDragging = false;
        if (e.changedTouches && e.changedTouches[0]) {
            const touch = e.changedTouches[0];
            const dist = Math.hypot(touch.clientX - startDownX, touch.clientY - startDownY);
            if (dist < 8) {
                const coords = getCanvasCoordinates(touch);
                mouseVec.set(coords.x, coords.y);
                raycaster.setFromCamera(mouseVec, camera);
                const hits = raycaster.intersectObjects(interactiveMeshes, false);
                if (hits.length > 0) {
                    pressMesh(hits[0].object);
                }
            }
        }
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
    // 8. PHYSICAL GAMEPAD API POLLING (Bonus Pro Feature)
    // -------------------------------------------------------------
    let lastGamepadInput = 0;
    function pollPhysicalGamepad() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if (!gamepads || !gamepads[0]) return;
        const gp = gamepads[0];
        if (gp) {
            // Deflect 3D left stick based on physical stick
            if (Math.abs(gp.axes[0]) > 0.12 || Math.abs(gp.axes[1]) > 0.12) {
                leftStickObj.group.rotation.y = gp.axes[0] * 0.45;
                leftStickObj.group.rotation.x = (Math.PI / 2 + 0.22) + gp.axes[1] * 0.45;
                const now = performance.now();
                if (now - lastGamepadInput > 300) {
                    triggerInputFeedback(`JOYSTICK [${gp.axes[0].toFixed(1)}, ${gp.axes[1].toFixed(1)}]`, true);
                    lastGamepadInput = now;
                }
            }
            // Check button presses
            if (gp.buttons && gp.buttons[0] && gp.buttons[0].pressed) {
                pressMesh(candyMeshes[3]); // South (A/Cyan)
            } else if (gp.buttons && gp.buttons[1] && gp.buttons[1].pressed) {
                pressMesh(candyMeshes[2]); // East (B/Coral)
            } else if (gp.buttons && gp.buttons[2] && gp.buttons[2].pressed) {
                pressMesh(candyMeshes[1]); // West (X/Gold)
            } else if (gp.buttons && gp.buttons[3] && gp.buttons[3].pressed) {
                pressMesh(candyMeshes[0]); // North (Y/Lime)
            }
        }
    }

    // -------------------------------------------------------------
    // 9. Animation Render Loop (Hero Showcase Sway & Physics)
    // -------------------------------------------------------------
    function animate(now) {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = now * 0.001;

        // Poll connected hardware gamepads if available
        pollPhysicalGamepad();

        // Idle showcase sway when not dragging
        if (!isDragging) {
            const swayY = HERO_ROT_Y + Math.sin(elapsedTime * 1.2) * 0.28;
            const swayX = HERO_ROT_X + Math.cos(elapsedTime * 1.5) * 0.08;
            targetRotY = swayY;
            targetRotX = swayX;
        }

        // Smooth spring damping
        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

        // Disc rotates continuously
        discGroup.rotation.y += 0.022;

        // Floating hover physics on the controller
        controllerGroup.position.y = 0.05 + Math.sin(elapsedTime * 2.2) * 0.06;
        controllerGroup.rotation.z = Math.sin(elapsedTime * 1.6) * 0.025;

        // Subtle alive twitch on thumbsticks when idle
        leftStickObj.cap.rotation.x = Math.sin(elapsedTime * 3) * 0.06;
        rightStickObj.cap.rotation.y = Math.cos(elapsedTime * 2.8) * 0.06;

        renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);
}
