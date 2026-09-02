// Web Audio API Synthesizer for Crisp Crystal & Gemstone Sound Effects
class CrystalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Play crisp, pure crystal bell chime when 2 gems merge
  public playGemMergeSound(tierValue: number, comboCount: number = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Base frequencies mapped to gemstone tiers
      const baseFreqMap: Record<number, number> = {
        2: 523.25, // C5 (Amethyst)
        4: 587.33, // D5 (Aquamarine)
        8: 659.25, // E5 (Emerald)
        16: 698.46, // F5 (Topaz)
        32: 783.99, // G5 (Ruby)
        64: 880.0, // A5 (Diamond)
        128: 987.77, // B5 (Tanzanite)
        256: 1046.5, // C6 (Star Sapphire)
        512: 1174.66, // D6 (Obsidian)
        1024: 1318.51, // E6 (Target 1024 Sunstone!)
        2048: 1567.98, // G6 (Mythic 2048 Genesis!)
        4096: 1760.0, // A6 (Astral Core)
      };

      const baseFreq = baseFreqMap[tierValue] || 523.25 * Math.pow(1.06, comboCount * 2);

      // 1. Crystal Fundamental Tone (Pure Sine Bell)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      // Subtle pitch envelope for a glass strike impact
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.01, now + 0.02);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.15);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.28, now + 0.008); // Sharp crystal attack
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.65); // Shimmering decay

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.7);

      // 2. High Overtone Harmonics (Crystalline Shimmer - 2.76x and 5.4x glass resonance)
      const oscHarmonic = this.ctx.createOscillator();
      const gainHarmonic = this.ctx.createGain();
      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(baseFreq * 2.76, now);

      gainHarmonic.gain.setValueAtTime(0.001, now);
      gainHarmonic.gain.linearRampToValueAtTime(0.15, now + 0.004);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      oscHarmonic.connect(gainHarmonic);
      gainHarmonic.connect(this.ctx.destination);
      oscHarmonic.start(now);
      oscHarmonic.stop(now + 0.5);

      // 3. High Sparkling Chime overtone (for higher tiers >= 64)
      if (tierValue >= 64) {
        const oscSparkle = this.ctx.createOscillator();
        const gainSparkle = this.ctx.createGain();
        oscSparkle.type = 'sine';
        oscSparkle.frequency.setValueAtTime(baseFreq * 4.0, now + 0.03);

        gainSparkle.gain.setValueAtTime(0.001, now + 0.03);
        gainSparkle.gain.linearRampToValueAtTime(0.12, now + 0.04);
        gainSparkle.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

        oscSparkle.connect(gainSparkle);
        gainSparkle.connect(this.ctx.destination);
        oscSparkle.start(now + 0.03);
        oscSparkle.stop(now + 0.6);
      }

      // 4. Special Celestial Arpeggio for 1024 or 2048 Milestone!
      if (tierValue >= 1024) {
        this.playMilestoneFanfare(tierValue);
      }
    } catch (e) {
      console.warn('Audio playback not permitted yet:', e);
    }
  }

  // Soft glass slide whoosh on tile movement
  public playSlideSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      // ignore
    }
  }

  // Milestone Celebration Chimes (1024 / 2048)
  public playMilestoneFanfare(tierValue: number = 1024) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chord = tierValue >= 2048 
        ? [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98] // Grand Major 9th
        : [659.25, 783.99, 1046.5, 1318.51]; // E-G-C-E Sparkling Fanfare

      chord.forEach((freq, index) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + index * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.3);
      });
    } catch (e) {
      // ignore
    }
  }
}

export const crystalAudio = new CrystalAudioEngine();
