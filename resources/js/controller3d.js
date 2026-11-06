import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * DQUAD CUSTOM 3D APEX WIRELESS CONTROLLER
 * 
 * Renders the authentic official 3D CAD mesh customized with DQUAD's Cybernetic Insignia:
 * - Authentic ergonomic unibody shell & textured palm grip edges
 * - Asymmetrical concave rubber thumbsticks with knurled grip rings
 * - 8-way faceted gunmetal metallic hybrid D-Pad dish
 * - Translucent glossy action buttons with official colored letters (Green A, Red B, Blue X, Yellow Y)
 * - Custom glowing neon cyan DQUAD "D" Apex Emblem (with illuminated circuit core) replacing standard Xbox jewel
 * - Dual-tone studio rim lighting (Vibrant Cool Cyan Left Rim + Warm Golden-Amber Right Rim)
 * - View (⧉), Share (↑), Menu (☰) center auxiliary buttons
 * - LB/RB shoulder bumpers & LT/RT ergonomic triggers
 * - Raycast interactive clicking with tactile sound & HUD telemetry
 * - Full 360° mouse/touch orbit inspection & Gamepad API hardware integration
 * - Ultra-resilient multi-tier CDN + local fallback binary loader (immune to 404 / HTML SPA redirects)
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

    if (telemetryText) {
        telemetryText.textContent = 'VIEWPORT // LOADING 3D CONTROLLER...';
        telemetryText.classList.remove('text-emerald-400');
        telemetryText.classList.add('text-cyan-400');
    }

    function triggerInputFeedback(label, isHardware = false) {
        if (telemetryText) {
            telemetryText.textContent = isHardware ? 'DQUAD // HARDWARE ACTIVE' : 'DQUAD // INPUT DETECTED';
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

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.08, 4.4);
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
    renderer.toneMappingExposure = 1.20;

    // -------------------------------------------------------------
    // 2. Dual-Tone Studio Lighting (Matching User's Reference)
    // Left: Vibrant Cool Cyan Rim Light
    // Right: Warm Golden-Amber / Orange Rim Light
    // Center-Top: Soft Neutral Studio Key Fill
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x121420, 1.3);
    scene.add(ambientLight);

    // Front-Top Key Fill
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    keyLight.position.set(0, 3.8, 4.5);
    scene.add(keyLight);

    // Left Rim Light - Vibrant Cyan / Ice Blue (matches reference left edge)
    const leftCyanRim = new THREE.DirectionalLight(0x00f5ff, 4.2);
    leftCyanRim.position.set(-5.0, 1.5, -1.2);
    scene.add(leftCyanRim);

    // Right Rim Light - Warm Amber / Orange (matches reference right edge)
    const rightAmberRim = new THREE.DirectionalLight(0xf59e0b, 4.5);
    rightAmberRim.position.set(5.0, 1.5, -1.2);
    scene.add(rightAmberRim);

    // Top Bumper / Trigger Edge Highlight
    const topRimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    topRimLight.position.set(0, 5.0, -2.5);
    scene.add(topRimLight);

    // Subtle Ground Glow
    const floorBounce = new THREE.PointLight(0x9333ea, 1.5, 10);
    floorBounce.position.set(0, -3.5, 2.5);
    scene.add(floorBounce);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const interactiveMeshes = [];

    // -------------------------------------------------------------
    // 3. Subtle Cybernetic Gimbal Ring
    // -------------------------------------------------------------
    const discGroup = new THREE.Group();
    discGroup.position.set(0, -0.32, -0.30);
    discGroup.rotation.x = 0.35;
    rootGroup.add(discGroup);

    const outerRimGeo = new THREE.TorusGeometry(2.35, 0.016, 16, 64);
    const outerRimMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.35
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    outerRim.rotation.x = Math.PI / 2;
    discGroup.add(outerRim);

    const innerRimGeo = new THREE.TorusGeometry(1.85, 0.014, 16, 64);
    const innerRimMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    innerRim.rotation.x = Math.PI / 2;
    discGroup.add(innerRim);

    // -------------------------------------------------------------
    // 4. LOAD THE OFFICIAL 3D XBOX WIRELESS CONTROLLER MODEL
    // -------------------------------------------------------------
    const controllerGroup = new THREE.Group();
    controllerGroup.scale.set(0.235, 0.235, 0.235);
    controllerGroup.position.set(0, 0.02, 0);
    rootGroup.add(controllerGroup);

    // PBR Materials calibrated directly against official DQUAD Controller Photography
    const chassisMat = new THREE.MeshPhysicalMaterial({
        color: 0x141417,
        roughness: 0.60,
        metalness: 0.05,
        clearcoat: 0.08,
        clearcoatRoughness: 0.45,
        reflectivity: 0.25
    });

    const rearGripMat = new THREE.MeshStandardMaterial({
        color: 0x111114,
        roughness: 0.80,
        metalness: 0.04
    });

    const dpadMat = new THREE.MeshPhysicalMaterial({
        color: 0x222228,
        roughness: 0.38,
        metalness: 0.60,
        clearcoat: 0.30,
        clearcoatRoughness: 0.25
    });

    const stickGripMat = new THREE.MeshStandardMaterial({
        color: 0x16161c,
        roughness: 0.90,
        metalness: 0.03
    });

    const stickBaseMat = new THREE.MeshStandardMaterial({
        color: 0x101014,
        roughness: 0.28,
        metalness: 0.12
    });

    const bumperMat = new THREE.MeshPhysicalMaterial({
        color: 0x16161c,
        roughness: 0.40,
        metalness: 0.10,
        clearcoat: 0.20
    });

    const buttonExteriorMat = new THREE.MeshPhysicalMaterial({
        color: 0x08080c,
        transparent: true,
        opacity: 0.55,
        roughness: 0.08,
        metalness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03
    });

    const auxBtnMat = new THREE.MeshStandardMaterial({
        color: 0x202026,
        roughness: 0.42,
        metalness: 0.15
    });

    let dpadMesh = null;
    let jewelMesh = null;
    let abxyMesh = null;
    let sticksGripMesh = null;
    let bumpersMesh = null;

    // Load high-resolution DQUAD "D" Cybernetic Emblem textures
    const texLoader = new THREE.TextureLoader();
    const emblemTex = texLoader.load('./models/dquad_emblem.png');
    const glowTex = texLoader.load('./models/dquad_emblem_glow.png');
    emblemTex.colorSpace = THREE.SRGBColorSpace;
    glowTex.colorSpace = THREE.SRGBColorSpace;

    function setupControllerModel(model) {
        const toRemove = [];

        model.traverse((child) => {
            if (!child.isMesh) return;
            const name = child.name || '';

            if (name === 'body-top-case' || name === 'back-case' || name === 'battery-door' || name === 'battery-door-gloss') {
                child.material = chassisMat;
            } else if (name === 'body-side-caps') {
                child.material = chassisMat;
                // Eliminate the 1522 vertices inside the guide sphere that form the Xbox cutout logo
                const pos = child.geometry.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    const x = pos.getX(i);
                    const y = pos.getY(i);
                    const z = pos.getZ(i);
                    const d = Math.sqrt(x * x + (y - 4.214) * (y - 4.214) + (z - 0.792) * (z - 0.792));
                    if (d < 0.65) {
                        pos.setXYZ(i, 0, -100, 0);
                    }
                }
                pos.needsUpdate = true;
                child.geometry.computeVertexNormals();
            } else if (name === 'ports' || name === 'nexus-quads') {
                // Completely destroy and detach Xbox logo geometry & guide housing
                child.visible = false;
                child.geometry = new THREE.BufferGeometry();
                toRemove.push(child);
            } else if (name === 'side-grip-edges' || name === 'back-grip-edges') {
                child.material = rearGripMat;
            } else if (name === 'd-pad') {
                child.material = dpadMat;
                child.userData = { id: 'DPAD', label: 'DQUAD // HYBRID D-PAD', type: 'dpad' };
                interactiveMeshes.push(child);
                dpadMesh = child;
            } else if (name === 'thumbsticks-grip') {
                child.material = stickGripMat;
                child.userData = { id: 'STICKS', label: 'DQUAD // PRECISION THUMBSTICKS', type: 'stick' };
                interactiveMeshes.push(child);
                sticksGripMesh = child;
            } else if (name === 'thumbsticks-base') {
                child.material = stickBaseMat;
            } else if (name === 'bumpers' || name === 'triggers') {
                child.material = bumperMat;
                child.userData = { id: name.toUpperCase(), label: `DQUAD // ${name.toUpperCase()}`, type: 'bumper' };
                interactiveMeshes.push(child);
                if (name === 'bumpers') bumpersMesh = child;
            } else if (name === 'view-menu-share-buttons') {
                child.material = auxBtnMat;
                child.userData = { id: 'AUX_BTNS', label: 'DQUAD // VIEW • SHARE • MENU', type: 'aux' };
                interactiveMeshes.push(child);
            } else if (name === 'abxy-buttons') {
                // Exact Action Button Colors matching reference photo
                const pos = child.geometry.attributes.position;
                const colors = new Float32Array(pos.count * 3);
                const centerY = (1.168 + 4.097) / 2;
                const centerX = (2.383 + 5.462) / 2;

                for (let i = 0; i < pos.count; i++) {
                    const x = pos.getX(i);
                    const y = pos.getY(i);
                    const dx = x - centerX;
                    const dy = y - centerY;

                    if (dy > Math.abs(dx)) {
                        // Y = Golden Yellow (#facc15)
                        colors[i * 3] = 0.98; colors[i * 3 + 1] = 0.82; colors[i * 3 + 2] = 0.08;
                    } else if (-dy > Math.abs(dx)) {
                        // A = Emerald Green (#22c55e)
                        colors[i * 3] = 0.13; colors[i * 3 + 1] = 0.80; colors[i * 3 + 2] = 0.35;
                    } else if (-dx > Math.abs(dy)) {
                        // X = Sky Blue (#38bdf8)
                        colors[i * 3] = 0.20; colors[i * 3 + 1] = 0.74; colors[i * 3 + 2] = 0.98;
                    } else {
                        // B = Crimson Red (#ef4444)
                        colors[i * 3] = 0.94; colors[i * 3 + 1] = 0.22; colors[i * 3 + 2] = 0.22;
                    }
                }

                child.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                child.material = new THREE.MeshStandardMaterial({
                    vertexColors: true,
                    roughness: 0.15,
                    metalness: 0.10,
                    emissive: 0x181820
                });
                child.userData = { id: 'ABXY', label: 'DQUAD // ACTION BUTTONS (ABXY)', type: 'abxy' };
                interactiveMeshes.push(child);
                abxyMesh = child;
            } else if (name === 'abxy-buttons-exterior') {
                child.material = buttonExteriorMat;
                child.userData = { id: 'ABXY_CAP', label: 'DQUAD // ACTION BUTTONS (ABXY)', type: 'abxy' };
                interactiveMeshes.push(child);
            }
        });

        toRemove.forEach(c => {
            if (c.parent) c.parent.remove(c);
        });

        // ---------------------------------------------------------
        // CUSTOM DQUAD "D" APEX EMBLEM
        // Replaces the Xbox jewel with the exact custom cybernetic D badge
        // ---------------------------------------------------------
        const dquadEmblemGroup = new THREE.Group();
        dquadEmblemGroup.position.set(0, 4.214, 0.792);
        dquadEmblemGroup.rotation.x = -0.360;

        // Dark flat patch seamlessly sealing the chassis housing hole (no bevel rim)
        const buttonPlateGeo = new THREE.CircleGeometry(0.57, 32);
        const buttonPlate = new THREE.Mesh(buttonPlateGeo, chassisMat);
        dquadEmblemGroup.add(buttonPlate);

        // High-res DQUAD "D" Badge Plane with diffuse + cyan neon emissive glow
        // Scaled to fit comfortably inside the guide dish without edge clipping
        const badgeGeo = new THREE.PlaneGeometry(1.10, 1.00);
        const badgeMat = new THREE.MeshStandardMaterial({
            map: emblemTex,
            emissive: 0x00f5ff,
            emissiveMap: glowTex,
            emissiveIntensity: 2.2,
            transparent: true,
            roughness: 0.22,
            metalness: 0.20,
            depthWrite: false
        });
        const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
        badgeMesh.position.z = 0.055;
        dquadEmblemGroup.add(badgeMesh);

        badgeMesh.userData = {
            id: 'BTN_DQUAD_EMBLEM',
            label: 'DQUAD // APEX EMBLEM',
            type: 'jewel',
            group: dquadEmblemGroup,
            mat: badgeMat
        };
        buttonPlate.userData = badgeMesh.userData;
        interactiveMeshes.push(badgeMesh);
        interactiveMeshes.push(buttonPlate);
        jewelMesh = badgeMesh;

        model.add(dquadEmblemGroup);
        controllerGroup.add(model);

        if (telemetryText) {
            telemetryText.textContent = 'VIEWPORT // READY';
            telemetryText.classList.remove('text-cyan-400');
            telemetryText.classList.add('text-emerald-400');
        }
    }

    // Ultra-resilient multi-tier binary loader
    async function loadControllerGLB() {
        const candidateUrls = [
            'https://cdn.jsdelivr.net/gh/hellstackdev/R3F-Xbox-Wireless-Controller@main/public/models/xbox-wireless-controller.glb',
            './models/xbox-wireless-controller.glb',
            '/models/xbox-wireless-controller.glb',
            'https://raw.githubusercontent.com/hellstackdev/R3F-Xbox-Wireless-Controller/main/public/models/xbox-wireless-controller.glb'
        ];

        const loader = new GLTFLoader();

        for (const url of candidateUrls) {
            try {
                const resp = await fetch(url, { mode: 'cors' });
                if (!resp.ok) continue;
                const buffer = await resp.arrayBuffer();
                // Validate glTF binary magic number: 0x46546C67 ("glTF")
                if (buffer.byteLength < 12) continue;
                const header = new DataView(buffer, 0, 4).getUint32(0, true);
                if (header !== 0x46546C67) {
                    // Not valid glTF binary (e.g. Netlify returned index.html SPA redirect)
                    continue;
                }
                loader.parse(buffer, '', (gltf) => {
                    setupControllerModel(gltf.scene);
                }, (err) => {
                    console.warn('GLTFLoader parse error from', url, err);
                });
                return;
            } catch (err) {
                console.warn('Failed candidate GLB URL:', url, err);
            }
        }
    }

    loadControllerGLB();

    // -------------------------------------------------------------
    // 5. SHOWCASE ORIENTATION (Facing Forward, matching Reference Photo)
    // -------------------------------------------------------------
    const HERO_ROT_X = 0.04;
    const HERO_ROT_Y = -0.02;

    rootGroup.rotation.x = HERO_ROT_X;
    rootGroup.rotation.y = HERO_ROT_Y;
    rootGroup.rotation.z = 0.0;

    // -------------------------------------------------------------
    // 6. RAYCASTING & BUTTON PRESS PHYSICS
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    function pressMesh(mesh, hit = null) {
        if (!mesh || !mesh.userData) return;
        const u = mesh.userData;
        if (u.isPressed) return;
        u.isPressed = true;

        if (u.type === 'jewel') {
            if (u.group) {
                u.group.position.z -= 0.06;
            }
            if (u.mat) {
                u.mat.emissiveIntensity = 3.6;
            }
            setTimeout(() => {
                if (u.group) {
                    u.group.position.z += 0.06;
                }
                if (u.mat) {
                    u.mat.emissiveIntensity = 2.2;
                }
                u.isPressed = false;
            }, 140);
        } else if (u.type === 'dpad') {
            mesh.position.z -= 0.12;
            setTimeout(() => {
                mesh.position.z += 0.12;
                u.isPressed = false;
            }, 140);
        } else if (u.type === 'abxy') {
            mesh.position.z -= 0.10;
            setTimeout(() => {
                mesh.position.z += 0.10;
                u.isPressed = false;
            }, 140);
        } else if (u.type === 'stick') {
            mesh.position.z -= 0.08;
            setTimeout(() => {
                mesh.position.z += 0.08;
                u.isPressed = false;
            }, 140);
        } else if (u.type === 'bumper') {
            mesh.position.y -= 0.10;
            setTimeout(() => {
                mesh.position.y += 0.10;
                u.isPressed = false;
            }, 140);
        } else {
            u.isPressed = false;
        }

        triggerInputFeedback(u.label);
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playControllerButton(u.label);
        }

        if (window.DQUAD_KONAMI) {
            if (u.type === 'abxy') {
                window.DQUAD_KONAMI.pushInput('a');
            } else if (u.type === 'dpad') {
                window.DQUAD_KONAMI.pushInput('up');
            }
        }
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

        const dist = Math.hypot(e.clientX - startDownX, e.clientY - startDownY);
        if (dist < 6) {
            const coords = getCanvasCoordinates(e);
            mouseVec.set(coords.x, coords.y);
            raycaster.setFromCamera(mouseVec, camera);
            const hits = raycaster.intersectObjects(interactiveMeshes, true);
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
            const hits = raycaster.intersectObjects(interactiveMeshes, true);
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
                const hits = raycaster.intersectObjects(interactiveMeshes, true);
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
    // 8. PHYSICAL GAMEPAD API POLLING
    // -------------------------------------------------------------
    const prevGpButtons = new Map();
    let lastGamepadInput = 0;
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
            hasPhysicalGamepad = false;
            return;
        }
        hasPhysicalGamepad = true;

        const DEADZONE = 0.22;

        const ax0 = activeGp.axes[0] || 0;
        const ax1 = activeGp.axes[1] || 0;
        if (Math.hypot(ax0, ax1) > DEADZONE) {
            const now = performance.now();
            if (now - lastGamepadInput > 350) {
                const sX = (ax0 > 0 ? '+' : '') + ax0.toFixed(1);
                const sY = (ax1 > 0 ? '+' : '') + ax1.toFixed(1);
                triggerInputFeedback(`L-STICK [${sX}, ${sY}]`, true);
                lastGamepadInput = now;
            }
        }

        const ax2 = activeGp.axes[2] || 0;
        const ax3 = activeGp.axes[3] || 0;
        if (Math.hypot(ax2, ax3) > DEADZONE) {
            targetRotY += ax2 * 0.035;
            targetRotX = Math.max(-0.5, Math.min(0.65, targetRotX + ax3 * 0.025));

            const now = performance.now();
            if (now - lastGamepadInput > 350) {
                const sX = (ax2 > 0 ? '+' : '') + ax2.toFixed(1);
                const sY = (ax3 > 0 ? '+' : '') + ax3.toFixed(1);
                triggerInputFeedback(`R-STICK [${sX}, ${sY}]`, true);
                lastGamepadInput = now;
            }
        }

        const buttonMappings = [
            { btn: activeGp.buttons[0], mesh: abxyMesh, konami: 'a' },
            { btn: activeGp.buttons[1], mesh: abxyMesh, konami: 'b' },
            { btn: activeGp.buttons[2], mesh: abxyMesh, konami: null },
            { btn: activeGp.buttons[3], mesh: abxyMesh, konami: null },
            { btn: activeGp.buttons[4], mesh: bumpersMesh, konami: null },
            { btn: activeGp.buttons[5], mesh: bumpersMesh, konami: null },
            { btn: activeGp.buttons[12], mesh: dpadMesh, konami: 'up' },
            { btn: activeGp.buttons[13], mesh: dpadMesh, konami: 'down' },
            { btn: activeGp.buttons[14], mesh: dpadMesh, konami: 'left' },
            { btn: activeGp.buttons[15], mesh: dpadMesh, konami: 'right' },
            { btn: activeGp.buttons[16], mesh: jewelMesh, konami: null },
        ];

        buttonMappings.forEach((entry, idx) => {
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
    // 9. Animation Loop (Showcase Hover & Orbit)
    // -------------------------------------------------------------
    function animate(now) {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = now * 0.001;

        pollPhysicalGamepad();

        if (!isDragging) {
            const swayY = HERO_ROT_Y + Math.sin(elapsedTime * 1.1) * 0.16;
            const swayX = HERO_ROT_X + Math.cos(elapsedTime * 1.4) * 0.04;
            targetRotY += (swayY - targetRotY) * 0.02;
            targetRotX += (swayX - targetRotX) * 0.02;
        }

        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

        discGroup.rotation.y += 0.012;

        controllerGroup.position.y = 0.02 + Math.sin(elapsedTime * 2.0) * 0.03;
        controllerGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.012;

        renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);
}
