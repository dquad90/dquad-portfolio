/**
 * DQUAD Interactive Laravel 13 / PHP 8.4 API Simulator
 * Features:
 * - Live simulated route calls with colored JSON formatting
 * - Clickable route tabs (GET /health, GET /stack, POST /queue)
 * - Micro-typewriter render & dynamic latency jitter
 * - Tactile Web Audio API feedback
 */

export function initApiTerminal() {
    const container = document.getElementById('api-terminal-simulator');
    if (!container) return;

    const outputBody = document.getElementById('api-response-body');
    const metaText = document.getElementById('api-response-meta');
    const retestBtn = document.getElementById('api-run-again-btn');
    const tabs = container.querySelectorAll('.api-tab');

    const routes = {
        health: {
            method: 'GET',
            path: '/api/v1/health',
            status: '200 OK',
            driver: 'Redis 7.2 Cache',
            data: {
                status: "nominal",
                runtime: "PHP 8.4.1 (JIT Active)",
                framework: "Laravel v13.x",
                cache: "Redis 7.2 (Hit: 99.4%)"
            }
        },
        architecture: {
            method: 'GET',
            path: '/api/v1/stack',
            status: '200 OK',
            driver: 'PostgreSQL 16 Multi-AZ',
            data: {
                architecture: "Modular DDD / Clean MVC",
                orm: "Eloquent Prefetch & Indexing",
                auth: "Sanctum + Passkeys",
                api_layer: "RESTful JSON:API Compliant"
            }
        },
        dispatch: {
            method: 'POST',
            path: '/api/v1/queue/dispatch',
            status: '202 ACCEPTED',
            driver: 'Database / Redis Queue',
            data: {
                job: "App\\Jobs\\TelemetrySync",
                queue: "high-priority",
                workers: "4/4 active",
                avg_exec: "14.2ms"
            }
        }
    };

    let activeRouteKey = 'health';
    let isTyping = false;

    function formatJsonHtml(obj) {
        let lines = ['{\n'];
        const entries = Object.entries(obj);
        entries.forEach(([key, val], idx) => {
            const isLast = idx === entries.length - 1;
            const comma = isLast ? '' : ',';
            const valFormatted = typeof val === 'string'
                ? `<span class="text-emerald-400">"${val}"</span>`
                : `<span class="text-amber-400">${val}</span>`;
            lines.push(`  <span class="text-cyan-400">"${key}"</span>: ${valFormatted}${comma}\n`);
        });
        lines.push('}');
        return lines.join('');
    }

    function renderRoute(routeKey) {
        const route = routes[routeKey];
        if (!route || !outputBody) return;

        activeRouteKey = routeKey;

        // Audio feedback
        if (window.DQUAD_AUDIO) {
            window.DQUAD_AUDIO.playClick();
        }

        // Tab UI styling
        tabs.forEach(tab => {
            const matches = tab.dataset.route === routeKey;
            tab.classList.toggle('bg-cyan-500/20', matches);
            tab.classList.toggle('text-cyan-300', matches);
            tab.classList.toggle('border-cyan-500/40', matches);
            tab.classList.toggle('font-semibold', matches);
            tab.classList.toggle('text-gray-400', !matches);
            tab.classList.toggle('border-transparent', !matches);
        });

        // Dynamic realistic latency (10ms - 18ms)
        const latency = Math.floor(10 + Math.random() * 8);
        if (metaText) {
            metaText.innerHTML = `HTTP/2 <span class="text-emerald-400">${route.status}</span> • <span class="text-amber-300">${latency}ms</span> • ${route.driver}`;
        }

        // Animated typewriter-like entry
        outputBody.innerHTML = `<pre class="whitespace-pre font-mono-code text-[10px] sm:text-[11px] leading-relaxed text-gray-300 transition-opacity duration-150">${formatJsonHtml(route.data)}</pre>`;
    }

    // Attach click events to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            const routeKey = tab.dataset.route;
            if (routeKey) renderRoute(routeKey);
        });
    });

    if (retestBtn) {
        retestBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            renderRoute(activeRouteKey);
        });
    }

    // Initial render
    renderRoute('health');
}
