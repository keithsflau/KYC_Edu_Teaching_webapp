class AudioService {
  private ctx: AudioContext | null = null;
  private enabled = true;

  private context(): AudioContext | null {
    const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) this.ctx = new AudioCtx();
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  private tone(ctx: AudioContext, freq: number, offset: number, dur: number, type: OscillatorType, peak: number) {
    const start = ctx.currentTime + offset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + dur + 0.03);
  }

  private noise(ctx: AudioContext, offset: number, dur: number, peak: number) {
    const start = ctx.currentTime + offset;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(900, start);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(peak, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(start);
    source.stop(start + dur);
  }

  play(type: 'roll' | 'buy' | 'pay' | 'win' | 'jail' | 'card') {
    if (!this.enabled) return;
    try {
    const ctx = this.context();
    if (!ctx) return;
    if (type === 'roll') {
      this.noise(ctx, 0, 0.09, 0.22);
      this.noise(ctx, 0.12, 0.1, 0.18);
      this.tone(ctx, 520, 0.02, 0.06, 'square', 0.05);
      return;
    }
    if (type === 'buy') {
      this.tone(ctx, 523.25, 0, 0.12, 'triangle', 0.18);
      this.tone(ctx, 659.25, 0.1, 0.14, 'triangle', 0.18);
      this.tone(ctx, 783.99, 0.2, 0.2, 'triangle', 0.16);
      return;
    }
    if (type === 'pay') {
      this.tone(ctx, 392, 0, 0.12, 'sawtooth', 0.07);
      this.tone(ctx, 311, 0.1, 0.14, 'sawtooth', 0.06);
      this.tone(ctx, 233, 0.2, 0.18, 'sine', 0.08);
      return;
    }
    if (type === 'win') {
      this.tone(ctx, 523.25, 0, 0.12, 'sine', 0.2);
      this.tone(ctx, 659.25, 0.1, 0.12, 'sine', 0.2);
      this.tone(ctx, 783.99, 0.2, 0.12, 'sine', 0.18);
      this.tone(ctx, 1046.5, 0.3, 0.24, 'sine', 0.16);
      return;
    }
    if (type === 'jail') {
      this.tone(ctx, 110, 0, 0.28, 'square', 0.08);
      this.tone(ctx, 82, 0.18, 0.32, 'square', 0.07);
      return;
    }
    this.tone(ctx, 660, 0, 0.08, 'sine', 0.12);
    this.tone(ctx, 880, 0.09, 0.1, 'sine', 0.1);
    } catch {
      return;
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export const audioService = new AudioService();
