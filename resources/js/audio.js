/**
 * DQUAD Tactile Sci-Fi Audio Synthesizer
 * Built entirely with Web Audio API (Zero external MP3 assets, zero latency, pure procedural synthesis).
 */

class TacticalAudioEngine {
    constructor() {
        this.ctx = null;
        this.isEnabled = localStorage.getItem('dquad_sfx_enabled') === 'true';
        this.masterGain = null;
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return false;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return true;
    }

    toggle() {
        this.initContext();
        this.isEnabled = !this.isEnabled;
        localStorage.setItem('dquad_sfx_enabled', this.isEnabled ? 'true' : 'false');

        if (this.isEnabled) {
            this.playPowerUp();
        }
        return this.isEnabled;
    }

    setMuted(muted) {
        this.isEnabled = !muted;
        localStorage.setItem('dquad_sfx_enabled', this.isEnabled ? 'true' : 'false');
    }

    /**
     * Subtle tactile tick for hovering interactive chips and navigation pills
     */
    playHover() {
        if (!this.isEnabled || !this.initContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.025);

            gain.gain.setValueAtTime(0.015, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 0.03);
        } catch (e) {
            // Audio context policy guard
        }
    }

    /**
     * Mechanical switch click for buttons and sector dots
     */
    playClick() {
        if (!this.isEnabled || !this.initContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(480, now);
            osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);

            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 0.045);
        } catch (e) {}
    }

    /**
     * 3D Holographic Card 180° Flip Whoosh Chirp
     */
    playCardFlip() {
        if (!this.isEnabled || !this.initContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const filter = this.ctx.createBiquadFilter();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(260, now);
            osc.frequency.exponentialRampToValueAtTime(740, now + 0.16);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(600, now);
            filter.Q.setValueAtTime(2.5, now);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + 0.19);
        } catch (e) {}
    }

    /**
     * Musical melodic feedback for 3D controller buttons
     */
    playControllerButton(name = '') {
        if (!this.isEnabled || !this.initContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            // Distinct harmonic pitches for each candy button & controls
            let freq = 523.25; // C5 default
            let oscType = 'sine';
            let duration = 0.14;

            const n = name.toUpperCase();
            if (n.includes('LIME') || n.includes('Y')) {
                freq = 523.25; // C5
            } else if (n.includes('YELLOW') || n.includes('B')) {
                freq = 659.25; // E5
            } else if (n.includes('CORAL') || n.includes('A')) {
                freq = 783.99; // G5
            } else if (n.includes('CYAN') || n.includes('X')) {
                freq = 1046.50; // C6
            } else if (n.includes('D-PAD') || n.includes('ARM')) {
                freq = 349.23; // F4
                oscType = 'triangle';
                duration = 0.08;
            } else if (n.includes('STICK')) {
                freq = 220.00; // A3
                oscType = 'sine';
                duration = 0.1;
            } else if (n.includes('BUMPER')) {
                freq = 880.00; // A5
                oscType = 'triangle';
                duration = 0.09;
            }

            osc.type = oscType;
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now);
            osc.stop(now + duration + 0.01);
        } catch (e) {}
    }

    /**
     * Uplifting startup chime when audio is toggled ON
     */
    playPowerUp() {
        if (!this.initContext()) return;
        try {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const now = this.ctx.currentTime + idx * 0.07;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.07, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

                osc.connect(gain);
                gain.connect(this.masterGain);

                osc.start(now);
                osc.stop(now + 0.18);
            });
        } catch (e) {}
    }
}

// Global instance
export const audio = new TacticalAudioEngine();
window.DQUAD_AUDIO = audio;

export function initAudioUI() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (!toggleBtn) return;

    const dot = document.getElementById('audio-indicator-dot');
    const label = document.getElementById('audio-toggle-label');
    const iconOff = document.getElementById('audio-icon-off');
    const iconOn = document.getElementById('audio-icon-on');

    function updateUI(active) {
        if (dot) {
            dot.className = active
                ? 'w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse'
                : 'w-1.5 h-1.5 rounded-full bg-gray-500';
        }
        if (label) {
            label.textContent = active ? 'SFX: ON' : 'SFX: OFF';
            label.className = active ? 'hidden sm:inline uppercase tracking-wider text-[10px] text-cyan-300 font-bold' : 'hidden sm:inline uppercase tracking-wider text-[10px] text-gray-400';
        }
        if (iconOff) {
            iconOff.classList.toggle('hidden', active);
        }
        if (iconOn) {
            iconOn.classList.toggle('hidden', !active);
        }
        toggleBtn.classList.toggle('border-cyan-500/40', active);
        toggleBtn.classList.toggle('bg-cyan-500/10', active);
    }

    // Set initial state
    updateUI(audio.isEnabled);

    toggleBtn.addEventListener('click', () => {
        const newState = audio.toggle();
        updateUI(newState);
    });

    // Wire up tactile hover and clicks to interactive UI elements
    const interactiveElements = document.querySelectorAll('button:not(#audio-toggle-btn), .nav-section-link, .sector-link, a[href^="#"], .holo-container');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => audio.playHover());
        el.addEventListener('click', () => audio.playClick());
    });
}
