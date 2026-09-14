/**
 * Procedural Audio Synthesizer powered by Native Web Audio API.
 * Zero MP3 assets, purely procedural wave synthesis.
 */
class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private thinkingHumOsc: OscillatorNode | null = null;
  private thinkingHumGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.thinkingHumGain && this.ctx) {
      this.thinkingHumGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * High-frequency subtle hover chirp for UI elements
   */
  public playHoverChirp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.04); // E6

    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Resonant wake pulse frequency sweep on activation
   */
  public playWakePulse() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Main tone
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(220, now); // A3
    osc1.frequency.exponentialRampToValueAtTime(587.33, now + 0.35); // D5

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    // Harmonic accent
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.exponentialRampToValueAtTime(0.03, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.ctx.destination);
    gain2.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  /**
   * Low-frequency subtle ambient LFO hum while thinking
   */
  public startThinkingHum() {
    if (this.isMuted || this.thinkingHumOsc) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    this.thinkingHumOsc = this.ctx.createOscillator();
    this.thinkingHumGain = this.ctx.createGain();

    this.thinkingHumOsc.type = 'sine';
    this.thinkingHumOsc.frequency.setValueAtTime(110, now); // A2

    // Low pass filter to make it smooth and ambient
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, now);

    this.thinkingHumGain.gain.setValueAtTime(0.001, now);
    this.thinkingHumGain.gain.exponentialRampToValueAtTime(0.02, now + 0.5);

    this.thinkingHumOsc.connect(filter);
    filter.connect(this.thinkingHumGain);
    this.thinkingHumGain.connect(this.ctx.destination);

    this.thinkingHumOsc.start(now);
  }

  public stopThinkingHum() {
    if (this.thinkingHumOsc && this.thinkingHumGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.thinkingHumGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      setTimeout(() => {
        if (this.thinkingHumOsc) {
          try { this.thinkingHumOsc.stop(); } catch (_) {}
          this.thinkingHumOsc.disconnect();
          this.thinkingHumOsc = null;
        }
      }, 350);
    }
  }

  /**
   * Harmonized notification chime
   */
  public playNotificationPing() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Formant-filtered soft rhythmic tick during companion speech
   */
  public playSpeakingPulse() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Random subtle cadence shift
    const freq = 320 + Math.random() * 80;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.012, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const SoundEngine = new WebAudioEngine();
