/**
 * High-End Interactive Liquid Ribbed Mesh & Viscous Fluid Gel Distortion
 * Styled for DQUAD Theme: Stealth Obsidian Void, Royal Indigo, Cyber Violet & Fuchsia.
 *
 * Features:
 * - Real-time WebGL fragment shader solving organic fluid refraction
 * - Subdued, dark-satin vertical pleated fabric (Deep Indigo, Cyber Violet, Obsidian Black - NO green)
 * - Trailing viscous liquid gel droplet that refracts and bends the background mesh around the cursor
 * - Subtle 3D specular light reflections, violet Fresnel rim, and soft ambient gel shadows
 * - Interactive click/tap shockwave water ripples
 * - Full touch support on mobile & tablet devices
 * - High-performance Canvas2D fallback matching the dark cybernetic aesthetic
 */

export function initAmbientBackground() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;

    // Check for WebGL support
    const gl = canvas.getContext('webgl', { alpha: false, depth: false, antialias: false, powerPreference: 'high-performance' }) 
            || canvas.getContext('experimental-webgl', { alpha: false, depth: false, antialias: false });

    if (!gl) {
        initCanvas2DFallback(canvas);
        return;
    }

    // -------------------------------------------------------------
    // 1. Shaders (Vertex + Fragment)
    // -------------------------------------------------------------
    const vsSource = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main() {
            v_uv = (a_position + 1.0) * 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fsSource = `
        precision highp float;
        varying vec2 v_uv;

        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec3 u_trail[16];  // xy = uv pos (y flipped), z = intensity
        uniform vec4 u_ripples[3]; // xy = pos, z = elapsed_time, w = strength

        void main() {
            // st: [0..1] with (0,0) at top-left
            vec2 st = vec2(v_uv.x, 1.0 - v_uv.y);
            float aspect = u_resolution.x / u_resolution.y;

            // Aspect-corrected space for circular metaballs
            vec2 stAspect = vec2(st.x * aspect, st.y);

            vec2 totalGrad = vec2(0.0);
            float totalHeight = 0.0;

            // 1. Compute Viscous Liquid Gel Distortion from Mouse Trail
            for (int i = 0; i < 16; i++) {
                vec3 p = u_trail[i];
                if (p.z <= 0.005) continue;

                vec2 pAspect = vec2(p.x * aspect, p.y);
                vec2 delta = stAspect - pAspect;
                float r2 = dot(delta, delta);

                float radius = 0.20 + p.z * 0.08;
                float rMax2 = radius * radius;

                if (r2 < rMax2) {
                    float t = 1.0 - r2 / rMax2;
                    float h = t * t * p.z;
                    totalHeight += h;

                    // Exact analytical gradient
                    vec2 grad = -4.0 * t * p.z * (delta / rMax2);
                    totalGrad += grad;
                }
            }

            // 2. Compute Click / Tap Shockwave Ripples
            for (int j = 0; j < 3; j++) {
                vec4 rip = u_ripples[j];
                if (rip.z > 0.0 && rip.z < 2.5) {
                    vec2 ripAspect = vec2(rip.x * aspect, rip.y);
                    vec2 delta = stAspect - ripAspect;
                    float dist = length(delta);
                    float waveFront = rip.z * 0.65;
                    float waveDist = abs(dist - waveFront);
                    float waveWidth = 0.12;

                    if (waveDist < waveWidth) {
                        float waveFactor = sin((waveDist / waveWidth) * 3.14159265);
                        float decay = exp(-rip.z * 1.6) * exp(-dist * 1.5) * rip.w;
                        float ripH = waveFactor * decay * 0.20;
                        totalHeight += ripH;
                        
                        vec2 waveDir = (dist > 0.0001) ? (delta / dist) : vec2(0.0);
                        totalGrad += waveDir * waveFactor * decay * 3.5;
                    }
                }
            }

            // Smooth displacement to warp UVs (convex lens effect)
            vec2 displacement = totalGrad * 0.0055;
            vec2 warpedSt = st + displacement;

            // 3. Color Palette: DQUAD Stealth Obsidian, Royal Indigo & Cyber Violet
            // Zero greenish tones. Deep, moody, premium studio dark aesthetic.
            vec3 cObsidian   = vec3(0.016, 0.016, 0.028); // #040407 Deep Obsidian Void
            vec3 cIndigoDeep = vec3(0.032, 0.028, 0.100); // #08071a Midnight Indigo
            vec3 cRoyalBlue  = vec3(0.050, 0.045, 0.170); // #0d0b2b Royal Indigo
            vec3 cVioletDeep = vec3(0.080, 0.030, 0.155); // #140827 Cyber Violet
            vec3 cFuchsiaSub = vec3(0.105, 0.025, 0.145); // #1b0625 Subtle Fuchsia undertone

            // Base gradient curve
            float curve = warpedSt.x + sin(warpedSt.y * 3.14159) * 0.06;
            vec3 leftColor = mix(cIndigoDeep, cVioletDeep, warpedSt.y * 0.6 + 0.1);
            leftColor = mix(leftColor, cRoyalBlue, sin(warpedSt.y * 3.5 + u_time * 0.25) * 0.25 + 0.5);

            vec3 rightColor = mix(cObsidian, cIndigoDeep, (1.0 - warpedSt.y) * 0.6);
            rightColor = mix(rightColor, cFuchsiaSub, warpedSt.y * 0.45);

            vec3 baseColor = mix(leftColor, rightColor, smoothstep(0.15, 0.85, curve));

            // 4. Vertical Ribbed Fabric Pleats (Ultra-Subtle Stealth Satin Mesh)
            float pleatFreq = 48.0;
            float pleatWarp = sin(warpedSt.y * 3.8 + u_time * 0.35) * 0.022 
                            + cos(warpedSt.y * 7.5 - u_time * 0.20) * 0.010;
            float pleatPhase = (warpedSt.x + pleatWarp) * pleatFreq;
            float pleatVal = sin(pleatPhase * 3.14159265 * 2.0);

            // Shading of ribs (subtle, non-distracting)
            float pleatShade = pleatVal * 0.065;
            vec3 finalColor = baseColor * (1.0 + pleatShade);

            // 5. Specular Highlights & 3D Glass Refraction on Gel Bubble
            if (totalHeight > 0.005) {
                // Continuous 3D surface normal from gradient
                vec3 normal = normalize(vec3(-totalGrad.x * 0.08, -totalGrad.y * 0.08, 1.0));

                // Studio key light from top-left
                vec3 lightDir = normalize(vec3(-0.4, 0.5, 0.75));
                vec3 viewDir = vec3(0.0, 0.0, 1.0);
                vec3 halfVec = normalize(lightDir + viewDir);

                // Sharp, subtle pin-point specular sheen
                float spec = pow(max(dot(normal, halfVec), 0.0), 56.0);
                float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

                // Refined violet-white sheen
                vec3 specColor = vec3(0.92, 0.88, 1.0) * spec * 0.42;

                // Subtle deep violet/indigo internal refraction (NO green)
                vec3 coreGlow = mix(vec3(0.18, 0.06, 0.32), vec3(0.06, 0.12, 0.30), st.x) * totalHeight * 0.24;

                // Soft ambient drop-shadow under the liquid edge
                float rimShadow = smoothstep(0.01, 0.12, totalHeight) * (1.0 - totalHeight) * 0.30;

                finalColor = (finalColor * (1.0 - rimShadow)) + coreGlow + specColor + (fresnel * vec3(0.35, 0.18, 0.55) * 0.28);
            }

            // Cinematic Vignette
            vec2 vCoord = (st - 0.5) * 1.35;
            float vignette = 1.0 - dot(vCoord, vCoord) * 0.55;
            finalColor *= clamp(vignette, 0.30, 1.0);

            gl_FragColor = vec4(finalColor, 0.96);
        }
    `;

    // -------------------------------------------------------------
    // 2. WebGL Program Compilation Helper
    // -------------------------------------------------------------
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn('Shader compilation error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
        initCanvas2DFallback(canvas);
        return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('Program link error:', gl.getProgramInfoLog(program));
        initCanvas2DFallback(canvas);
        return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0,
        ]),
        gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uTrailLoc = gl.getUniformLocation(program, 'u_trail');
    const uRipplesLoc = gl.getUniformLocation(program, 'u_ripples');

    // -------------------------------------------------------------
    // 3. State Management (Mouse Trail & Shockwave Ripples)
    // -------------------------------------------------------------
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    const TRAIL_LENGTH = 16;
    const trail = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
        trail.push({ x: 0.5, y: 0.35, intensity: 0 });
    }

    const ripples = [
        { x: 0.5, y: 0.5, time: -1, strength: 0 },
        { x: 0.5, y: 0.5, time: -1, strength: 0 },
        { x: 0.5, y: 0.5, time: -1, strength: 0 }
    ];
    let nextRippleIdx = 0;

    function triggerRipple(clientX, clientY, strength = 1.0) {
        const r = ripples[nextRippleIdx];
        r.x = clientX / width;
        r.y = clientY / height;
        r.time = 0.001;
        r.strength = strength;
        nextRippleIdx = (nextRippleIdx + 1) % ripples.length;
    }

    let targetX = 0.5;
    let targetY = 0.35;
    let currentX = 0.5;
    let currentY = 0.35;
    let isMoving = false;
    let moveTimeout = null;

    function onPointerMove(clientX, clientY) {
        targetX = Math.max(0, Math.min(1, clientX / width));
        targetY = Math.max(0, Math.min(1, clientY / height));
        isMoving = true;
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => { isMoving = false; }, 120);
    }

    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY), { passive: true });
    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    // Click / Tap shockwave ripple
    window.addEventListener('pointerdown', (e) => {
        triggerRipple(e.clientX, e.clientY, 1.0);
    }, { passive: true });

    // Drag-over liquid surge
    window.addEventListener('dragover', (e) => {
        onPointerMove(e.clientX, e.clientY);
        if (Math.random() < 0.2) {
            triggerRipple(e.clientX, e.clientY, 0.5);
        }
    }, { passive: true });

    // Initial subtle ambient ripple to invite the user
    setTimeout(() => {
        triggerRipple(width * 0.45, height * 0.30, 0.6);
    }, 800);

    // -------------------------------------------------------------
    // 4. Render Loop (60 FPS)
    // -------------------------------------------------------------
    let lastTime = performance.now();
    const trailFlatArray = new Float32Array(TRAIL_LENGTH * 3);
    const ripplesFlatArray = new Float32Array(3 * 4);

    function render(now) {
        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // Smooth lerp of primary cursor
        currentX += (targetX - currentX) * 0.28;
        currentY += (targetY - currentY) * 0.28;

        // Update trail nodes
        trail[0].x = currentX;
        trail[0].y = currentY;
        trail[0].intensity = isMoving 
            ? Math.min(trail[0].intensity + delta * 5.0, 1.0) 
            : Math.max(trail[0].intensity - delta * 1.5, 0.12);

        for (let i = 1; i < TRAIL_LENGTH; i++) {
            const prev = trail[i - 1];
            const curr = trail[i];
            curr.x += (prev.x - curr.x) * 0.40;
            curr.y += (prev.y - curr.y) * 0.40;
            curr.intensity = prev.intensity * 0.88;
        }

        // Pack trail array
        for (let i = 0; i < TRAIL_LENGTH; i++) {
            trailFlatArray[i * 3 + 0] = trail[i].x;
            trailFlatArray[i * 3 + 1] = trail[i].y;
            trailFlatArray[i * 3 + 2] = trail[i].intensity;
        }

        // Update ripples
        for (let j = 0; j < ripples.length; j++) {
            const rip = ripples[j];
            if (rip.time > 0) {
                rip.time += delta;
                if (rip.time > 2.5) rip.time = -1;
            }
            ripplesFlatArray[j * 4 + 0] = rip.x;
            ripplesFlatArray[j * 4 + 1] = rip.y;
            ripplesFlatArray[j * 4 + 2] = rip.time;
            ripplesFlatArray[j * 4 + 3] = rip.strength;
        }

        // Bind uniforms & render
        gl.useProgram(program);
        gl.uniform2f(uResLoc, canvas.width, canvas.height);
        gl.uniform1f(uTimeLoc, now * 0.001);
        gl.uniform3fv(uTrailLoc, trailFlatArray);
        gl.uniform4fv(uRipplesLoc, ripplesFlatArray);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

/**
 * High-Performance Canvas2D Fallback
 * Styled for DQUAD Theme: Obsidian Midnight, Indigo & Violet.
 */
function initCanvas2DFallback(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let mouseX = width / 2;
    let mouseY = height / 3;
    let targetX = mouseX;
    let targetY = mouseY;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    function render(time) {
        mouseX += (targetX - mouseX) * 0.06;
        mouseY += (targetY - mouseY) * 0.06;

        ctx.clearRect(0, 0, width, height);

        // Background Deep Obsidian to Indigo Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#0a081a');
        bgGrad.addColorStop(0.45, '#120e29');
        bgGrad.addColorStop(0.8, '#080814');
        bgGrad.addColorStop(1, '#04040a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Vertical ribbed bands
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
        ctx.lineWidth = 1.2;
        const spacing = width / 44;
        for (let x = 0; x < width; x += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Mouse fluid spotlight (Violet / Indigo)
        const gelGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 260);
        gelGlow.addColorStop(0, 'rgba(168, 85, 247, 0.14)');
        gelGlow.addColorStop(0.4, 'rgba(99, 102, 241, 0.06)');
        gelGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gelGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 260, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
