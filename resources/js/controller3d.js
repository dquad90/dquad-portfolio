import * as THREE from 'three';

/**
 * AUTHENTIC 3D XBOX SERIES X|S WIRELESS CONTROLLER (ROBOT BLACK)
 * 
 * Accurately engineered to match the official Xbox Wireless Controller reference:
 * - Seamless ergonomic unibody chassis with curved contouring & satin Robot Black finish
 * - Iconic asymmetrical analog stick layout (Upper-Left & Lower-Right) with concave knurled rubber pads
 * - Authentic 8-way faceted metallic gunmetal hybrid D-Pad dish (Lower-Left)
 * - Authentic 4 diamond face buttons with Xbox colors:
 *     * A: Vibrant Green (#22c55e)
 *     * B: Crimson Red (#ef4444)
 *     * X: Sky Blue (#38bdf8)
 *     * Y: Golden Yellow (#facc15)
 * - Glowing white illuminated Xbox Jewel / Guide Button (Top-Center)
 * - Auxiliary buttons: View (⧉), Share (↑), Menu (☰)
 * - Ergonomic shoulder bumpers (LB / RB) & curved triggers (LT / RT)
 * - Raycast interactive buttons: Click/tap to press with physical deflection & audio
 * - Full Gamepad API hardware integration & 360° drag rotation
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
            telemetryText.textContent = isHardware ? 'XBOX // HARDWARE ACTIVE' : 'XBOX // INPUT DETECTED';
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

    // -------------------------------------------------------------
    // 1. Scene, Camera, Renderer
    // -------------------------------------------------------------
    const scene = new THREE.Scene();

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Face-on camera positioning with perfect framing
    camera.position.set(0, 0.05, 4.6);
    camera.lookAt(0, 0.0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // -------------------------------------------------------------
    // 2. High-End Studio Lighting (Satin Robot Black Ergonomics)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Key Light (Crisp front-top-left directional light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(-3.5, 5, 6);
    scene.add(keyLight);

    // Front Center Fill Light (Directly illuminates buttons & controller face)
    const frontFill = new THREE.DirectionalLight(0xf8fafc, 3.0);
    frontFill.position.set(2.5, 2.0, 6.0);
    scene.add(frontFill);

    // Top Rim Light (Defines shoulder curves & bumpers)
    const topRim = new THREE.DirectionalLight(0x38bdf8, 2.8);
    topRim.position.set(0, 6, -2);
    scene.add(topRim);

    // Bottom Ambient Bounce Light
    const floorBounce = new THREE.PointLight(0xa855f7, 4.5, 12);
    floorBounce.position.set(0, -3.5, 3.0);
    scene.add(floorBounce);

    // Master Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Interactive clickable meshes for raycasting
    const interactiveMeshes = [];

    // -------------------------------------------------------------
    // 3. Subtle Cybernetic Gimbal Ring (Futuristic accent)
    // -------------------------------------------------------------
    const discGroup = new THREE.Group();
    discGroup.position.set(0, -0.30, -0.30);
    discGroup.rotation.x = 0.35;
    rootGroup.add(discGroup);

    const outerRimGeo = new THREE.TorusGeometry(2.35, 0.02, 16, 64);
    const outerRimMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.45
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    discGroup.add(outerRim);

    const innerRimGeo = new THREE.TorusGeometry(1.85, 0.016, 16, 64);
    const innerRimMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    discGroup.add(innerRim);

    // -------------------------------------------------------------
    // 4. HIGH-RESOLUTION CANVAS TEXTURE GENERATORS
    // -------------------------------------------------------------
    
    // 4A. ABXY Button Face Texture
    function createButtonTexture(letter, colorHex) {
        const can = document.createElement('canvas');
        can.width = 256;
        can.height = 256;
        const ctx = can.getContext('2d');

        // Dark obsidian domed button body
        const grad = ctx.createRadialGradient(85, 75, 10, 128, 128, 120);
        grad.addColorStop(0, '#363640');
        grad.addColorStop(0.5, '#1a1a20');
        grad.addColorStop(1, '#0c0c10');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(128, 128, 120, 0, Math.PI * 2);
        ctx.fill();

        // Subtle specular perimeter ring
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(128, 128, 114, 0, Math.PI * 2);
        ctx.stroke();

        // High-contrast bold letter
        ctx.fillStyle = colorHex;
        ctx.font = '900 152px "Jost", "Helvetica Neue", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = colorHex;
        ctx.shadowBlur = 18;
        ctx.fillText(letter, 128, 134);

        const tex = new THREE.CanvasTexture(can);
        tex.anisotropy = 4;
        return tex;
    }

    // 4B. Illuminated Xbox Jewel / Guide Button Texture
    function createXboxJewelTexture() {
        const can = document.createElement('canvas');
        can.width = 256;
        can.height = 256;
        const ctx = can.getContext('2d');

        // Dark perimeter bezel
        ctx.fillStyle = '#08080a';
        ctx.beginPath();
        ctx.arc(128, 128, 124, 0, Math.PI * 2);
        ctx.fill();

        // Chrome ring
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(128, 128, 116, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing white Xbox sphere emblem
        const jewelGrad = ctx.createRadialGradient(100, 90, 15, 128, 128, 105);
        jewelGrad.addColorStop(0, '#ffffff');
        jewelGrad.addColorStop(0.85, '#f8fafc');
        jewelGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = jewelGrad;
        ctx.beginPath();
        ctx.arc(128, 128, 102, 0, Math.PI * 2);
        ctx.fill();

        // The iconic stylized black "X" cutout
        ctx.fillStyle = '#0a0a0e';
        ctx.beginPath();
        // Top cut
        ctx.moveTo(104, 26);
        ctx.quadraticCurveTo(128, 108, 128, 128);
        ctx.quadraticCurveTo(128, 108, 152, 26);
        ctx.lineTo(104, 26);
        ctx.fill();

        // Bottom cut
        ctx.beginPath();
        ctx.moveTo(92, 230);
        ctx.quadraticCurveTo(128, 148, 128, 128);
        ctx.quadraticCurveTo(128, 148, 164, 230);
        ctx.lineTo(92, 230);
        ctx.fill();

        // Left curved wing cut
        ctx.beginPath();
        ctx.moveTo(26, 128);
        ctx.quadraticCurveTo(98, 128, 128, 128);
        ctx.quadraticCurveTo(86, 74, 48, 52);
        ctx.quadraticCurveTo(28, 86, 26, 128);
        ctx.fill();

        // Right curved wing cut
        ctx.beginPath();
        ctx.moveTo(230, 128);
        ctx.quadraticCurveTo(158, 128, 128, 128);
        ctx.quadraticCurveTo(170, 74, 208, 52);
        ctx.quadraticCurveTo(228, 86, 230, 128);
        ctx.fill();

        const tex = new THREE.CanvasTexture(can);
        tex.anisotropy = 4;
        return tex;
    }

    // 4C. View Button Texture (Two overlapping windows)
    function createViewIconTexture() {
        const can = document.createElement('canvas');
        can.width = 128;
        can.height = 128;
        const ctx = can.getContext('2d');
        ctx.fillStyle = '#18181e';
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 5;
        ctx.strokeRect(34, 34, 42, 34);
        ctx.fillStyle = '#18181e';
        ctx.fillRect(52, 52, 42, 34);
        ctx.strokeRect(52, 52, 42, 34);

        const tex = new THREE.CanvasTexture(can);
        tex.anisotropy = 4;
        return tex;
    }

    // 4D. Menu Button Texture (Three horizontal hamburger lines)
    function createMenuIconTexture() {
        const can = document.createElement('canvas');
        can.width = 128;
        can.height = 128;
        const ctx = can.getContext('2d');
        ctx.fillStyle = '#18181e';
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(38, 46); ctx.lineTo(90, 46);
        ctx.moveTo(38, 64); ctx.lineTo(90, 64);
        ctx.moveTo(38, 82); ctx.lineTo(90, 82);
        ctx.stroke();

        const tex = new THREE.CanvasTexture(can);
        tex.anisotropy = 4;
        return tex;
    }

    // 4E. Share Button Texture (Rounded capsule with upload arrow)
    function createShareIconTexture() {
        const can = document.createElement('canvas');
        can.width = 128;
        can.height = 128;
        const ctx = can.getContext('2d');
        ctx.fillStyle = '#16161c';
        ctx.beginPath();
        ctx.arc(64, 64, 58, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Up arrow
        ctx.beginPath();
        ctx.moveTo(64, 36); ctx.lineTo(64, 76);
        ctx.moveTo(46, 54); ctx.lineTo(64, 36); ctx.lineTo(82, 54);
        // Base tray
        ctx.moveTo(42, 84); ctx.lineTo(42, 92); ctx.lineTo(86, 92); ctx.lineTo(86, 84);
        ctx.stroke();

        const tex = new THREE.CanvasTexture(can);
        tex.anisotropy = 4;
        return tex;
    }

    // -------------------------------------------------------------
    // 5. PBR MATERIALS MATCHING XBOX SERIES ROBOT BLACK
    // -------------------------------------------------------------
    
    // Main Satin Carbon Black Body Plastic
    const xboxChassisMat = new THREE.MeshPhysicalMaterial({
        color: 0x18181c,
        roughness: 0.44,
        metalness: 0.08,
        clearcoat: 0.35,
        clearcoatRoughness: 0.32,
        reflectivity: 0.5
    });

    // Darker underbelly & rear grip texture
    const xboxRearGripMat = new THREE.MeshStandardMaterial({
        color: 0x111114,
        roughness: 0.75,
        metalness: 0.04
    });

    // Recessed Stick/D-pad wells
    const xboxWellMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0e,
        roughness: 0.5,
        metalness: 0.1
    });

    // Thumbstick rubber grip material
    const stickRubberMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a20,
        roughness: 0.8,
        metalness: 0.04
    });

    // Thumbstick stem (smooth dark plastic)
    const stickStemMat = new THREE.MeshStandardMaterial({
        color: 0x101014,
        roughness: 0.22,
        metalness: 0.18
    });

    // Hybrid D-Pad metallic gunmetal dish
    const dpadFacetedMat = new THREE.MeshPhysicalMaterial({
        color: 0x363642,
        roughness: 0.22,
        metalness: 0.68,
        clearcoat: 0.6,
        clearcoatRoughness: 0.16
    });

    // Shoulder bumpers (LB / RB)
    const bumperMat = new THREE.MeshPhysicalMaterial({
        color: 0x1c1c22,
        roughness: 0.32,
        metalness: 0.14,
        clearcoat: 0.4
    });

    // -------------------------------------------------------------
    // 6. SCULPTED 3D XBOX SERIES UNIBODY CHASSIS
    // -------------------------------------------------------------
    const controllerGroup = new THREE.Group();
    // Centered with optimal scale for viewport
    controllerGroup.scale.set(0.85, 0.85, 0.85);
    controllerGroup.position.set(0, 0.04, 0);
    rootGroup.add(controllerGroup);

    // 6A. Authentic Xbox Unibody Shape (Extruded & Beveled)
    const xboxShape = new THREE.Shape();
    xboxShape.moveTo(0, -0.42);
    // Left inner arch
    xboxShape.bezierCurveTo(-0.35, -0.46, -0.75, -0.85, -1.05, -1.25);
    // Left grip bottom rounded tip
    xboxShape.bezierCurveTo(-1.22, -1.48, -1.48, -1.42, -1.52, -1.18);
    // Left grip outer flare
    xboxShape.bezierCurveTo(-1.56, -0.82, -1.44, -0.15, -1.30, 0.35);
    // Left shoulder transition
    xboxShape.bezierCurveTo(-1.20, 0.65, -0.98, 0.86, -0.60, 0.92);
    // Top center peak (housing Xbox button & bumpers)
    xboxShape.bezierCurveTo(-0.32, 0.96, -0.15, 0.98, 0, 1.0);
    // Right top peak to shoulder
    xboxShape.bezierCurveTo(0.15, 0.98, 0.32, 0.96, 0.60, 0.92);
    // Right shoulder transition
    xboxShape.bezierCurveTo(0.98, 0.86, 1.20, 0.65, 1.30, 0.35);
    // Right grip outer flare
    xboxShape.bezierCurveTo(1.44, -0.15, 1.56, -0.82, 1.52, -1.18);
    // Right grip bottom rounded tip
    xboxShape.bezierCurveTo(1.48, -1.42, 1.22, -1.48, 1.05, -1.25);
    // Right lower inner arch back to chin
    xboxShape.bezierCurveTo(0.75, -0.85, 0.35, -0.46, 0, -0.42);

    const extrudeSettings = {
        steps: 2,
        depth: 0.28,
        bevelEnabled: true,
        bevelThickness: 0.20,
        bevelSize: 0.16,
        bevelSegments: 16,
        curveSegments: 36
    };

    const chassisGeom = new THREE.ExtrudeGeometry(xboxShape, extrudeSettings);
    chassisGeom.center();
    const unibodyChassis = new THREE.Mesh(chassisGeom, xboxChassisMat);
    controllerGroup.add(unibodyChassis);

    // Front face sits at z ≈ +0.34
    const FACE_Z = 0.35;

    // Ergonomic Rear Palm Swells on Handles
    const rearSwellGeo = new THREE.SphereGeometry(0.46, 24, 24);
    const leftSwell = new THREE.Mesh(rearSwellGeo, xboxRearGripMat);
    leftSwell.position.set(-1.24, -0.92, -0.18);
    leftSwell.scale.set(0.85, 1.4, 0.65);
    controllerGroup.add(leftSwell);

    const rightSwell = new THREE.Mesh(rearSwellGeo, xboxRearGripMat);
    rightSwell.position.set(1.24, -0.92, -0.18);
    rightSwell.scale.set(0.85, 1.4, 0.65);
    controllerGroup.add(rightSwell);

    // 6B. Thumbstick Factory Function
    function createXboxThumbstick(x, y, labelId, labelText) {
        const baseGroup = new THREE.Group();
        baseGroup.position.set(x, y, FACE_Z);

        // Sunken circular collar in chassis
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.39, 0.12, 32), xboxWellMat);
        collar.rotation.x = Math.PI / 2;
        baseGroup.add(collar);

        // Deflectable stick pivot group (stem + concave cap)
        const pivotGroup = new THREE.Group();
        pivotGroup.position.set(0, 0, 0.08);

        // Stem
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 16), stickStemMat);
        stem.rotation.x = Math.PI / 2;
        pivotGroup.add(stem);

        // Cap Group
        const capGroup = new THREE.Group();
        capGroup.position.set(0, 0, 0.14);

        // Concave thumbpad bowl
        const padBowl = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), stickRubberMat);
        padBowl.scale.z = 0.30;
        capGroup.add(padBowl);

        // Knurled textured outer rim ring
        const outerRimRing = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.034, 16, 40), stickRubberMat);
        capGroup.add(outerRimRing);

        // Inner center dimple
        const centerDimple = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), stickRubberMat);
        centerDimple.position.z = -0.04;
        capGroup.add(centerDimple);

        // Hit detector mesh for click events
        const hitSphere = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), new THREE.MeshBasicMaterial({ visible: false }));
        hitSphere.userData = { id: labelId, label: labelText, pivotGroup: pivotGroup, capGroup: capGroup, origZ: 0.14, type: 'stick' };
        capGroup.add(hitSphere);
        interactiveMeshes.push(hitSphere);

        pivotGroup.add(capGroup);
        baseGroup.add(pivotGroup);

        return { baseGroup, pivotGroup, capGroup, hitSphere };
    }

    // Left Stick (Asymmetrical: UPPER-LEFT)
    const leftStickObj = createXboxThumbstick(-0.66, 0.40, 'STICK_L', 'XBOX // L-THUMBSTICK');
    controllerGroup.add(leftStickObj.baseGroup);

    // Right Stick (Asymmetrical: LOWER-RIGHT)
    const rightStickObj = createXboxThumbstick(0.38, -0.16, 'STICK_R', 'XBOX // R-THUMBSTICK');
    controllerGroup.add(rightStickObj.baseGroup);

    // 6C. Authentic Xbox Series Faceted Hybrid D-Pad (Lower-Left)
    const dpadGroup = new THREE.Group();
    dpadGroup.position.set(-0.38, -0.16, FACE_Z);

    // Sunken D-Pad Well
    const dpadWell = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.10, 32), xboxWellMat);
    dpadWell.rotation.x = Math.PI / 2;
    dpadGroup.add(dpadWell);

    // Faceted Hybrid Metallic Dish
    const dishMesh = new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), dpadFacetedMat);
    dishMesh.scale.z = 0.22;
    dishMesh.rotation.x = Math.PI;
    dishMesh.position.z = 0.06;
    dpadGroup.add(dishMesh);

    // Raised Cross Facets (Up, Down, Left, Right)
    const crossArmH = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.2, 0.08), dpadFacetedMat);
    crossArmH.position.z = 0.09;
    crossArmH.userData = { id: 'DPAD_LR', label: 'XBOX // D-PAD [LEFT / RIGHT]', type: 'dpad', group: dpadGroup };
    dpadGroup.add(crossArmH);
    interactiveMeshes.push(crossArmH);

    const crossArmV = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.66, 0.08), dpadFacetedMat);
    crossArmV.position.z = 0.09;
    crossArmV.userData = { id: 'DPAD_UD', label: 'XBOX // D-PAD [UP / DOWN]', type: 'dpad', group: dpadGroup };
    dpadGroup.add(crossArmV);
    interactiveMeshes.push(crossArmV);

    // Center faceted depression
    const dpadCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.06, 16), dpadFacetedMat);
    dpadCenter.rotation.x = Math.PI / 2;
    dpadCenter.position.z = 0.08;
    dpadGroup.add(dpadCenter);

    controllerGroup.add(dpadGroup);

    // 6D. Authentic Xbox 4 Face Buttons (ABXY Diamond, Upper-Right)
    const abxyGroup = new THREE.Group();
    abxyGroup.position.set(0.66, 0.42, FACE_Z);

    const btnRadius = 0.12;
    const btnDepth = 0.08;
    const btnConfigs = [
        { letter: 'Y', color: '#facc15', x: 0, y: 0.24, id: 'BTN_Y', label: 'XBOX // BUTTON [Y / YELLOW]' },
        { letter: 'X', color: '#38bdf8', x: -0.24, y: 0, id: 'BTN_X', label: 'XBOX // BUTTON [X / BLUE]' },
        { letter: 'B', color: '#ef4444', x: 0.24, y: 0, id: 'BTN_B', label: 'XBOX // BUTTON [B / RED]' },
        { letter: 'A', color: '#22c55e', x: 0, y: -0.24, id: 'BTN_A', label: 'XBOX // BUTTON [A / GREEN]' },
    ];

    const abxyMeshes = [];
    btnConfigs.forEach((cfg) => {
        const tex = createButtonTexture(cfg.letter, cfg.color);
        const btnFaceMat = new THREE.MeshPhysicalMaterial({
            map: tex,
            roughness: 0.16,
            metalness: 0.06,
            clearcoat: 0.90,
            clearcoatRoughness: 0.10
        });
        const btnSideMat = new THREE.MeshStandardMaterial({ color: 0x141418, roughness: 0.3 });

        const btnGeom = new THREE.CylinderGeometry(btnRadius, btnRadius, btnDepth, 32);
        const materials = [btnSideMat, btnFaceMat, btnSideMat];

        const btnMesh = new THREE.Mesh(btnGeom, materials);
        btnMesh.rotation.x = Math.PI / 2;
        btnMesh.position.set(cfg.x, cfg.y, 0.04);
        btnMesh.userData = { id: cfg.id, label: cfg.label, origZ: 0.04, type: 'face_btn', letter: cfg.letter };
        
        abxyGroup.add(btnMesh);
        interactiveMeshes.push(btnMesh);
        abxyMeshes.push(btnMesh);
    });

    controllerGroup.add(abxyGroup);

    // 6E. Illuminated Xbox Jewel / Guide Button (Top-Center)
    const xboxJewelTex = createXboxJewelTexture();
    const jewelFaceMat = new THREE.MeshPhysicalMaterial({
        map: xboxJewelTex,
        roughness: 0.10,
        metalness: 0.06,
        emissive: 0xffffff,
        emissiveMap: xboxJewelTex,
        emissiveIntensity: 0.95,
        clearcoat: 0.98,
        clearcoatRoughness: 0.08
    });

    const jewelGeom = new THREE.CylinderGeometry(0.20, 0.20, 0.07, 32);
    const jewelMesh = new THREE.Mesh(jewelGeom, [stickStemMat, jewelFaceMat, stickStemMat]);
    jewelMesh.rotation.x = Math.PI / 2;
    jewelMesh.position.set(0, 0.68, FACE_Z);
    jewelMesh.userData = { id: 'BTN_XBOX_GUIDE', label: 'XBOX GUIDE // HOME', origZ: FACE_Z, type: 'jewel' };
    controllerGroup.add(jewelMesh);
    interactiveMeshes.push(jewelMesh);

    // 6F. Auxiliary Navigation Buttons (View, Share, Menu)
    const auxRadius = 0.075;
    const auxDepth = 0.05;
    const auxGeom = new THREE.CylinderGeometry(auxRadius, auxRadius, auxDepth, 24);

    // View Button (Left of center)
    const viewTex = createViewIconTexture();
    const viewMat = new THREE.MeshStandardMaterial({ map: viewTex, roughness: 0.25 });
    const viewBtn = new THREE.Mesh(auxGeom, [stickStemMat, viewMat, stickStemMat]);
    viewBtn.rotation.x = Math.PI / 2;
    viewBtn.position.set(-0.25, 0.38, FACE_Z);
    viewBtn.userData = { id: 'BTN_VIEW', label: 'XBOX // VIEW [⧉]', origZ: FACE_Z, type: 'aux' };
    controllerGroup.add(viewBtn);
    interactiveMeshes.push(viewBtn);

    // Menu Button (Right of center)
    const menuTex = createMenuIconTexture();
    const menuMat = new THREE.MeshStandardMaterial({ map: menuTex, roughness: 0.25 });
    const menuBtn = new THREE.Mesh(auxGeom, [stickStemMat, menuMat, stickStemMat]);
    menuBtn.rotation.x = Math.PI / 2;
    menuBtn.position.set(0.25, 0.38, FACE_Z);
    menuBtn.userData = { id: 'BTN_MENU', label: 'XBOX // MENU [☰]', origZ: FACE_Z, type: 'aux' };
    controllerGroup.add(menuBtn);
    interactiveMeshes.push(menuBtn);

    // Share Button (Centered below Xbox logo)
    const shareTex = createShareIconTexture();
    const shareMat = new THREE.MeshStandardMaterial({ map: shareTex, roughness: 0.25 });
    const shareBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, auxDepth, 24), [stickStemMat, shareMat, stickStemMat]);
    shareBtn.rotation.x = Math.PI / 2;
    shareBtn.position.set(0, 0.22, FACE_Z);
    shareBtn.userData = { id: 'BTN_SHARE', label: 'XBOX // SHARE [↑]', origZ: FACE_Z, type: 'aux' };
    controllerGroup.add(shareBtn);
    interactiveMeshes.push(shareBtn);

    // 6G. Shoulder Bumpers (LB & RB) & Triggers (LT & RT)
    const bumperGeo = new THREE.BoxGeometry(0.70, 0.15, 0.32);

    const leftBumper = new THREE.Mesh(bumperGeo, bumperMat);
    leftBumper.position.set(-0.70, 1.08, 0.08);
    leftBumper.rotation.z = -0.16;
    leftBumper.rotation.x = 0.14;
    leftBumper.userData = { id: 'BUMPER_LB', label: 'XBOX // BUMPER [LB]', origZ: 0.08, type: 'bumper' };
    interactiveMeshes.push(leftBumper);
    controllerGroup.add(leftBumper);

    const rightBumper = new THREE.Mesh(bumperGeo, bumperMat);
    rightBumper.position.set(0.70, 1.08, 0.08);
    rightBumper.rotation.z = 0.16;
    rightBumper.rotation.x = 0.14;
    rightBumper.userData = { id: 'BUMPER_RB', label: 'XBOX // BUMPER [RB]', origZ: 0.08, type: 'bumper' };
    interactiveMeshes.push(rightBumper);
    controllerGroup.add(rightBumper);

    // Triggers (LT & RT behind bumpers)
    const triggerGeo = new THREE.BoxGeometry(0.48, 0.26, 0.30);
    const leftTrigger = new THREE.Mesh(triggerGeo, bumperMat);
    leftTrigger.position.set(-0.76, 1.14, -0.18);
    leftTrigger.rotation.x = -0.24;
    leftTrigger.rotation.z = -0.16;
    controllerGroup.add(leftTrigger);

    const rightTrigger = new THREE.Mesh(triggerGeo, bumperMat);
    rightTrigger.position.set(0.76, 1.14, -0.18);
    rightTrigger.rotation.x = -0.24;
    rightTrigger.rotation.z = 0.16;
    controllerGroup.add(rightTrigger);

    // -------------------------------------------------------------
    // 7. SHOWCASE ORIENTATION (Facing Forward with Subtle 3D Angle)
    // -------------------------------------------------------------
    const HERO_ROT_X = 0.04;
    const HERO_ROT_Y = -0.12;

    rootGroup.rotation.x = HERO_ROT_X;
    rootGroup.rotation.y = HERO_ROT_Y;
    rootGroup.rotation.z = -0.01;

    // -------------------------------------------------------------
    // 8. RAYCASTING & BUTTON PRESS PHYSICS
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    function pressMesh(mesh, hit = null) {
        if (!mesh || !mesh.userData) return;
        const u = mesh.userData;
        if (u.isPressed) return;
        u.isPressed = true;

        if (u.type === 'face_btn' || u.type === 'aux' || u.type === 'jewel') {
            mesh.position.z = u.origZ - 0.04;
            setTimeout(() => {
                mesh.position.z = u.origZ;
                u.isPressed = false;
            }, 130);
        } else if (u.type === 'dpad') {
            u.group.position.z = FACE_Z - 0.03;
            setTimeout(() => {
                u.group.position.z = FACE_Z;
                u.isPressed = false;
            }, 130);
        } else if (u.type === 'stick') {
            u.capGroup.position.z = u.origZ - 0.04;
            setTimeout(() => {
                u.capGroup.position.z = u.origZ;
                u.isPressed = false;
            }, 130);
        } else if (u.type === 'bumper') {
            mesh.position.y -= 0.04;
            setTimeout(() => {
                mesh.position.y += 0.04;
                u.isPressed = false;
            }, 130);
        } else {
            u.isPressed = false;
        }

        triggerInputFeedback(u.label);
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playControllerButton(u.label);
        }

        if (window.DQUAD_KONAMI) {
            if (u.id === 'BTN_B') {
                window.DQUAD_KONAMI.pushInput('b');
            } else if (u.id === 'BTN_A') {
                window.DQUAD_KONAMI.pushInput('a');
            } else if (u.id === 'DPAD_UD') {
                const dir = (hit && hit.point && hit.point.y > -0.16) ? 'up' : 'down';
                window.DQUAD_KONAMI.pushInput(dir);
            } else if (u.id === 'DPAD_LR') {
                const dir = (hit && hit.point && hit.point.x < -0.38) ? 'left' : 'right';
                window.DQUAD_KONAMI.pushInput(dir);
            }
        }
    }

    // -------------------------------------------------------------
    // 9. Interactive Drag & Click Controls
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

        const dist = Math.hypot(e.clientX - startDownX, e.clientY - startDownY);
        if (dist < 6) {
            const coords = getCanvasCoordinates(e);
            mouseVec.set(coords.x, coords.y);
            raycaster.setFromCamera(mouseVec, camera);
            const hits = raycaster.intersectObjects(interactiveMeshes, false);
            if (hits.length > 0) {
                pressMesh(hits[0].object, hits[0]);
            }
        }
    });

    container.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - prevMouseX;
            const deltaY = e.clientY - prevMouseY;

            targetRotY += deltaX * 0.012;
            targetRotX += deltaY * 0.012;
            targetRotX = Math.max(-0.6, Math.min(0.65, targetRotX));

            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        } else {
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
                    pressMesh(hits[0].object, hits[0]);
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
            targetRotX = Math.max(-0.6, Math.min(0.65, targetRotX));

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
    // 10. PHYSICAL GAMEPAD API POLLING
    // -------------------------------------------------------------
    const prevGpButtons = new Map();
    let lastGamepadInput = 0;
    let targetStickLX = 0;
    let targetStickLY = 0;
    let targetStickRX = 0;
    let targetStickRY = 0;
    let hasPhysicalGamepad = false;

    function pollPhysicalGamepad() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if (!gamepads) return;

        let activeGp = null;
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i] && gamepads[i].connected) {
                activeGp = gamepads[i];
                break;
            }
        }

        if (!activeGp) {
            if (hasPhysicalGamepad) {
                hasPhysicalGamepad = false;
                targetStickLX = targetStickLY = targetStickRX = targetStickRY = 0;
            }
            return;
        }
        hasPhysicalGamepad = true;

        const DEADZONE = 0.22;

        const ax0 = activeGp.axes[0] || 0;
        const ax1 = activeGp.axes[1] || 0;
        const magL = Math.hypot(ax0, ax1);

        if (magL > DEADZONE) {
            targetStickLY = ax0 * 0.32;
            targetStickLX = -ax1 * 0.32;

            const now = performance.now();
            if (now - lastGamepadInput > 350) {
                const sX = (ax0 > 0 ? '+' : '') + ax0.toFixed(1);
                const sY = (ax1 > 0 ? '+' : '') + ax1.toFixed(1);
                triggerInputFeedback(`L-STICK [${sX}, ${sY}]`, true);
                lastGamepadInput = now;
            }
        } else {
            targetStickLX = targetStickLY = 0;
        }

        const ax2 = activeGp.axes[2] || 0;
        const ax3 = activeGp.axes[3] || 0;
        const magR = Math.hypot(ax2, ax3);

        if (magR > DEADZONE) {
            targetStickRY = ax2 * 0.32;
            targetStickRX = -ax3 * 0.32;

            targetRotY += ax2 * 0.035;
            targetRotX = Math.max(-0.5, Math.min(0.65, targetRotX + ax3 * 0.025));

            const now = performance.now();
            if (now - lastGamepadInput > 350) {
                const sX = (ax2 > 0 ? '+' : '') + ax2.toFixed(1);
                const sY = (ax3 > 0 ? '+' : '') + ax3.toFixed(1);
                triggerInputFeedback(`R-STICK [${sX}, ${sY}]`, true);
                lastGamepadInput = now;
            }
        } else {
            targetStickRX = targetStickRY = 0;
        }

        const buttonList = [
            { btn: activeGp.buttons[0], mesh: abxyMeshes[3], konami: 'a' },     // A (Green)
            { btn: activeGp.buttons[1], mesh: abxyMeshes[2], konami: 'b' },     // B (Red)
            { btn: activeGp.buttons[2], mesh: abxyMeshes[1], konami: null },    // X (Blue)
            { btn: activeGp.buttons[3], mesh: abxyMeshes[0], konami: null },    // Y (Yellow)
            { btn: activeGp.buttons[4], mesh: leftBumper, konami: null },        // LB
            { btn: activeGp.buttons[5], mesh: rightBumper, konami: null },       // RB
            { btn: activeGp.buttons[6], mesh: leftTrigger, konami: null },       // LT
            { btn: activeGp.buttons[7], mesh: rightTrigger, konami: null },      // RT
            { btn: activeGp.buttons[8], mesh: viewBtn, konami: null },           // View
            { btn: activeGp.buttons[9], mesh: menuBtn, konami: null },           // Menu
            { btn: activeGp.buttons[10], mesh: leftStickObj.hitSphere, konami: null }, // L3
            { btn: activeGp.buttons[11], mesh: rightStickObj.hitSphere, konami: null },// R3
            { btn: activeGp.buttons[12], mesh: crossArmV, konami: 'up' },        // D-Pad Up
            { btn: activeGp.buttons[13], mesh: crossArmV, konami: 'down' },      // D-Pad Down
            { btn: activeGp.buttons[14], mesh: crossArmH, konami: 'left' },      // D-Pad Left
            { btn: activeGp.buttons[15], mesh: crossArmH, konami: 'right' },     // D-Pad Right
            { btn: activeGp.buttons[16], mesh: jewelMesh, konami: null },        // Xbox Guide Button
        ];

        buttonList.forEach((entry, idx) => {
            if (!entry.btn) return;
            const isPressed = typeof entry.btn === 'object' ? (entry.btn.pressed || entry.btn.value > 0.5) : (entry.btn > 0.5);
            const wasPressed = prevGpButtons.get(idx) || false;

            if (isPressed && !wasPressed) {
                if (entry.mesh) {
                    pressMesh(entry.mesh);
                }
                if (entry.konami && window.DQUAD_KONAMI) {
                    window.DQUAD_KONAMI.pushInput(entry.konami);
                }
            }
            prevGpButtons.set(idx, isPressed);
        });
    }

    // -------------------------------------------------------------
    // 11. Animation Loop (Idle Showcase Sway & Spring Physics)
    // -------------------------------------------------------------
    function animate(now) {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = now * 0.001;

        pollPhysicalGamepad();

        const rightStickActive = Math.abs(targetStickRX) > 0.05 || Math.abs(targetStickRY) > 0.05;
        if (!isDragging && !rightStickActive) {
            const swayY = HERO_ROT_Y + Math.sin(elapsedTime * 1.1) * 0.16;
            const swayX = HERO_ROT_X + Math.cos(elapsedTime * 1.4) * 0.04;
            targetRotY += (swayY - targetRotY) * 0.02;
            targetRotX += (swayX - targetRotX) * 0.02;
        }

        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

        // Slow futuristic gimbal rotation
        discGroup.rotation.y += 0.015;

        // Floating hover
        controllerGroup.position.y = 0.04 + Math.sin(elapsedTime * 2.0) * 0.03;
        controllerGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.012;

        // Stick deflections with snap-back spring physics
        leftStickObj.pivotGroup.rotation.x += (targetStickLX - leftStickObj.pivotGroup.rotation.x) * 0.2;
        leftStickObj.pivotGroup.rotation.y += (targetStickLY - leftStickObj.pivotGroup.rotation.y) * 0.2;

        rightStickObj.pivotGroup.rotation.x += (targetStickRX - rightStickObj.pivotGroup.rotation.x) * 0.2;
        rightStickObj.pivotGroup.rotation.y += (targetStickRY - rightStickObj.pivotGroup.rotation.y) * 0.2;

        renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);
}
