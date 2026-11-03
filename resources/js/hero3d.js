import * as THREE from 'three';

export function initHero3D() {
    const container = document.getElementById('hero-3d-container');
    const canvas = document.getElementById('hero-3d-canvas');
    if (!container || !canvas) return;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.05);

    // Camera with cinematic low-angle perspective
    const camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );
    camera.position.set(0, 3.4, 7.2);
    camera.lookAt(0, -0.6, -1.5);

    // WebGL Renderer with Alpha & Antialiasing
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // GLSL Simplex Noise + Wave Shader
    const vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseSpeed;

        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vPosition;

        // Optimized 2D Simplex Noise for procedural liquid
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
            vUv = uv;
            vec3 pos = position;

            // Multi-frequency organic liquid swells
            float wave1 = snoise(vec2(pos.x * 0.16 + uTime * 0.22, pos.y * 0.16 + uTime * 0.18)) * 0.95;
            float wave2 = snoise(vec2(pos.x * 0.32 - uTime * 0.3, pos.y * 0.28 + uTime * 0.25)) * 0.4;
            float swell = sin(pos.x * 0.65 + uTime * 1.4) * cos(pos.y * 0.65 + uTime * 1.1) * 0.25;

            // Interactive mouse ripple & fluid distortion
            vec2 mouseWorld = (uMouse - 0.5) * vec2(28.0, 18.0);
            float dist = length(pos.xy - mouseWorld);
            float ripple = sin(dist * 3.8 - uTime * 7.5) * exp(-dist * 0.38);
            float interactiveDistortion = ripple * (uMouseSpeed * 1.6 + 0.35);

            pos.z += wave1 + wave2 + swell + interactiveDistortion;
            vElevation = pos.z;
            vPosition = pos;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform vec3 uBgColor;

        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vPosition;

        void main() {
            // High-Tech Cyber Grid Matrix lines
            vec2 grid = fract(vUv * vec2(70.0, 45.0));
            vec2 gridDist = abs(grid - 0.5);
            float lineX = smoothstep(0.44, 0.49, gridDist.x);
            float lineY = smoothstep(0.44, 0.49, gridDist.y);
            float matrixLine = max(lineX, lineY);

            // Dynamic Elevation Color Interpolation
            float normElev = smoothstep(-1.2, 1.8, vElevation);
            vec3 liquidColor = mix(uColorA, uColorB, normElev);
            liquidColor = mix(liquidColor, uColorC, smoothstep(0.5, 1.6, vElevation));

            // Blend dark cyber surface with glowing matrix lines & wave crests
            vec3 finalColor = mix(uBgColor * 0.3, liquidColor, 0.45);
            finalColor += liquidColor * matrixLine * 1.75;

            // Specular wave crest sparkle
            float crest = pow(smoothstep(0.65, 1.5, vElevation), 3.0);
            finalColor += vec3(1.0, 1.0, 1.0) * crest * 0.75;

            // Radial Vignette / Atmospheric Fog Blend
            float distFromCenter = length(vUv - vec2(0.5, 0.5)) * 1.5;
            float alpha = smoothstep(1.15, 0.25, distFromCenter);

            // Far horizon fade to blend into background
            float horizonFade = smoothstep(1.0, 0.15, vUv.y);
            alpha *= horizonFade;

            gl_FragColor = vec4(finalColor, alpha * 0.95);
        }
    `;

    // Uniforms
    const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseSpeed: { value: 0 },
        uColorA: { value: new THREE.Color(0x4f46e5) }, // Indigo / Electric Violet
        uColorB: { value: new THREE.Color(0xec4899) }, // Neon Pink / Fuchsia
        uColorC: { value: new THREE.Color(0x06b6d4) }, // Vivid Cyan
        uBgColor: { value: new THREE.Color(0x050505) }  // Deep Space Dark
    };

    // 1. High-Density Liquid Wave Mesh (36 x 22 units)
    const waveGeo = new THREE.PlaneGeometry(36, 22, 180, 120);
    const waveMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
    });

    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 2.3;
    waveMesh.position.y = -1.2;
    waveMesh.position.z = -1.0;
    scene.add(waveMesh);

    // 2. Floating Ambient 3D Particle Cloud hovering over the matrix
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePos[i] = (Math.random() - 0.5) * 26;
        particlePos[i + 1] = (Math.random() - 0.5) * 8 + 0.5;
        particlePos[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Mouse Tracking & Dynamic Velocity Physics
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let currentMouse = new THREE.Vector2(0.5, 0.5);
    let targetSpeed = 0;
    let currentSpeed = 0;
    let prevMouse = { x: 0, y: 0 };
    let lastMoveTime = performance.now();

    window.addEventListener('mousemove', (e) => {
        const now = performance.now();
        const dt = Math.max((now - lastMoveTime) / 1000, 0.001);

        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / (dt * 1000);

        targetSpeed = Math.min(speed * 0.45, 2.5);

        prevMouse = { x: e.clientX, y: e.clientY };
        lastMoveTime = now;

        // Normalized mouse position (0 to 1 across window)
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetMouse.x = e.touches[0].clientX / window.innerWidth;
            targetMouse.y = 1.0 - (e.touches[0].clientY / window.innerHeight);
            targetSpeed = 1.2;
        }
    }, { passive: true });

    // Expose preset color theme switcher to window for HUD buttons
    window.setWaveTheme = function (theme) {
        if (theme === 'cyber') {
            uniforms.uColorA.value.set(0x4f46e5);
            uniforms.uColorB.value.set(0xec4899);
            uniforms.uColorC.value.set(0x06b6d4);
        } else if (theme === 'neon') {
            uniforms.uColorA.value.set(0x10b981);
            uniforms.uColorB.value.set(0x06b6d4);
            uniforms.uColorC.value.set(0xa855f7);
        } else if (theme === 'inferno') {
            uniforms.uColorA.value.set(0xf59e0b);
            uniforms.uColorB.value.set(0xef4444);
            uniforms.uColorC.value.set(0xd946ef);
        }
    };

    // Window Resize Handling
    function onResize() {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Performance: Pause when scrolled off screen
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    // Animation Render Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();
        uniforms.uTime.value = elapsedTime;

        // Smooth Lerp Mouse Position & Speed
        currentMouse.lerp(targetMouse, 0.08);
        uniforms.uMouse.value.copy(currentMouse);

        targetSpeed *= 0.94; // Decays over time
        currentSpeed += (targetSpeed - currentSpeed) * 0.1;
        uniforms.uMouseSpeed.value = currentSpeed;

        // Subtle camera swaying
        camera.position.x = (currentMouse.x - 0.5) * 1.5;
        camera.position.y = 3.4 + (currentMouse.y - 0.5) * 0.6;
        camera.lookAt(0, -0.6, -1.5);

        // Particle floating
        particleField.rotation.y = elapsedTime * 0.015;

        renderer.render(scene, camera);
    }

    animate();
}
