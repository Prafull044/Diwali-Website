import { playLaunchSound, playExplosionSound, playCrackleSound, playSparkleSound } from './soundEffects';

export const FIREWORK_TYPES = {
  ROCKET: 'rocket',
  FLOWER: 'flower',
  CHRYSANTHEMUM: 'chrysanthemum',
  WILLOW: 'willow',
  CRACKLING: 'crackling',
  PEONY: 'peony',
  RING: 'ring',
  FOUNTAIN: 'fountain',
  COMET: 'comet',
  MULTICOLOR: 'multicolor',
};

export const COLOR_PALETTES = {
  GOLD: ['#F5C75E', '#FFE18E', '#FFDF70', '#E5A93B', '#FFF9E6'],
  ROYAL: ['#9D4EDD', '#F5C75E', '#E0AAFF', '#FFB703', '#C77DFF'],
  FESTIVE_WARM: ['#F28C28', '#F5C75E', '#FF4500', '#FFD166', '#FF8500'],
  EMERALD_RUBY: ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627', '#20BF55'],
  PEACOCK: ['#0077B6', '#00B4D8', '#90E0EF', '#F5C75E', '#06D6A0'],
  RAINBOW: ['#FF0054', '#9E0059', '#FF5400', '#FFBD00', '#00F5D4', '#7B2CBF'],
};

class Particle {
  constructor(x, y, color, type = 'peony', options = {}) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;

    // Movement & physics
    const speed = (options.speed || (Math.random() * 4 + 2)) * (options.sizeMultiplier || 1);
    const angle = options.angle !== undefined ? options.angle : Math.random() * Math.PI * 2;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.012;
    this.gravity = 0.06;
    this.friction = 0.96;

    // Trail history for motion blur
    this.trail = [];
    this.trailLength = 4;

    // Type specifics
    if (type === FIREWORK_TYPES.WILLOW) {
      this.gravity = 0.09;
      this.decay = Math.random() * 0.008 + 0.007; // lingers longer
      this.friction = 0.94;
      this.trailLength = 7;
    } else if (type === FIREWORK_TYPES.CHRYSANTHEMUM) {
      this.decay = Math.random() * 0.01 + 0.009;
      this.friction = 0.97;
      this.trailLength = 8;
    } else if (type === FIREWORK_TYPES.CRACKLING) {
      this.decay = Math.random() * 0.02 + 0.015;
      this.isCrackler = true;
      this.crackleTriggered = false;
    } else if (type === FIREWORK_TYPES.FOUNTAIN) {
      this.vy = -(Math.random() * 6 + 4);
      this.vx = (Math.random() - 0.5) * 3;
      this.gravity = 0.15;
      this.decay = Math.random() * 0.02 + 0.018;
    } else if (type === FIREWORK_TYPES.COMET) {
      this.decay = 0.015;
      this.trailLength = 10;
    }
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.trail.length > this.trailLength) {
      this.trail.shift();
    }

    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;

    this.alpha -= this.decay;

    // Handle crackle secondary pops
    if (this.isCrackler && !this.crackleTriggered && this.alpha < 0.45 && Math.random() < 0.2) {
      this.crackleTriggered = true;
      this.alpha += 0.2;
      this.vx += (Math.random() - 0.5) * 2;
      this.vy += (Math.random() - 0.5) * 2;
    }
  }

  draw(ctx) {
    if (this.alpha <= 0) return;

    ctx.save();
    // Draw motion trail
    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.strokeStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.alpha * 0.7);
      ctx.lineWidth = this.type === FIREWORK_TYPES.WILLOW ? 2.5 : 1.5;
      ctx.stroke();
    }

    // Sparkle head
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const radius = this.type === FIREWORK_TYPES.WILLOW ? 1.8 : 2.2;
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Shimmer glow
    if (this.alpha > 0.4) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
    ctx.restore();
  }
}

class Rocket {
  constructor(startX, startY, targetX, targetY, type, paletteKey, soundEnabled = true, options = {}) {
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.type = type || FIREWORK_TYPES.PEONY;
    this.paletteKey = paletteKey || 'GOLD';
    this.soundEnabled = soundEnabled;
    this.options = options;

    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = (options.launchSpeed || 11);

    this.vx = (dx / dist) * speed;
    this.vy = (dy / dist) * speed;

    this.trail = [];
    this.exploded = false;

    if (this.soundEnabled) {
      playLaunchSound();
    }
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 6) {
      this.trail.shift();
    }

    this.x += this.vx;
    this.y += this.vy;

    // Check if target height reached
    if (this.y <= this.targetY || (this.vy > 0 && this.y >= this.targetY)) {
      this.exploded = true;
    }
  }

  draw(ctx) {
    ctx.save();
    // Rocket trail
    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.strokeStyle = '#F5C75E';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#F28C28';
      ctx.shadowBlur = 8;
      ctx.stroke();
    }

    // Rocket head spark
    ctx.fillStyle = '#FFF4DD';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class FireworksEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.rockets = [];
    this.animationId = null;
    this.soundEnabled = options.soundEnabled ?? true;
    this.autoLaunch = options.autoLaunch ?? true;
    this.launchInterval = options.launchInterval || 1600;
    this.timer = null;
    this.isRunning = false;
    this.isPaused = false;
    this.selectedTypes = options.selectedTypes || Object.values(FIREWORK_TYPES);
    this.selectedPalette = options.palette || 'GOLD';
    this.sizeMultiplier = options.sizeMultiplier || 1;
    this.speedMultiplier = options.speedMultiplier || 1;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.autoLaunchStep = this.autoLaunchStep.bind(this);

    this.resize();
    window.addEventListener('resize', this.resize);
  }

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = w;
    this.height = h;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.loop();
    if (this.autoLaunch && !this.reducedMotion) {
      this.timer = setInterval(this.autoLaunchStep, this.launchInterval);
      // Launch initial fireworks immediately
      this.launchRandom();
    }
  }

  pause() {
    this.isPaused = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resume() {
    if (!this.isRunning) return this.start();
    this.isPaused = false;
    if (this.autoLaunch && !this.reducedMotion && !this.timer) {
      this.timer = setInterval(this.autoLaunchStep, this.launchInterval);
    }
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.particles = [];
    this.rockets = [];
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  setAutoLaunch(enabled) {
    this.autoLaunch = enabled;
    if (enabled && this.isRunning && !this.timer) {
      this.timer = setInterval(this.autoLaunchStep, this.launchInterval);
    } else if (!enabled && this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  autoLaunchStep() {
    if (this.isPaused || !this.isRunning) return;
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.launchRandom();
      }, i * 350);
    }
  }

  launchRandom() {
    if (!this.width || !this.height) return;
    const startX = this.width * (0.2 + Math.random() * 0.6);
    const startY = this.height;
    const targetX = startX + (Math.random() - 0.5) * (this.width * 0.35);
    const targetY = this.height * (0.15 + Math.random() * 0.45);

    const types = this.selectedTypes.length > 0 ? this.selectedTypes : Object.values(FIREWORK_TYPES);
    const type = types[Math.floor(Math.random() * types.length)];
    const palette = this.selectedPalette === 'RANDOM'
      ? Object.keys(COLOR_PALETTES)[Math.floor(Math.random() * Object.keys(COLOR_PALETTES).length)]
      : this.selectedPalette;

    this.launch(startX, startY, targetX, targetY, type, palette);
  }

  launch(startX, startY, targetX, targetY, type = FIREWORK_TYPES.PEONY, palette = 'GOLD') {
    if (this.reducedMotion) {
      // Direct explosion without dizzying rocket motion
      this.explode(targetX, targetY, type, palette);
      return;
    }

    const rocket = new Rocket(startX, startY, targetX, targetY, type, palette, this.soundEnabled, {
      launchSpeed: 10 * this.speedMultiplier,
    });
    this.rockets.push(rocket);
  }

  explode(x, y, type, paletteKey) {
    const palette = COLOR_PALETTES[paletteKey] || COLOR_PALETTES.GOLD;
    const colors = palette.length > 0 ? palette : ['#F5C75E', '#F28C28', '#FFF4DD'];

    if (this.soundEnabled) {
      playExplosionSound(this.sizeMultiplier);
      if (type === FIREWORK_TYPES.CRACKLING) {
        setTimeout(() => playCrackleSound(), 250);
      } else if (type === FIREWORK_TYPES.CHRYSANTHEMUM || type === FIREWORK_TYPES.WILLOW) {
        setTimeout(() => playSparkleSound(), 150);
      }
    }

    const baseCount = Math.min(80 * this.sizeMultiplier, 140);

    switch (type) {
      case FIREWORK_TYPES.RING: {
        const ringCount = Math.floor(40 * this.sizeMultiplier);
        const radiusSpeed = 4 * this.sizeMultiplier;
        for (let i = 0; i < ringCount; i++) {
          const angle = (i / ringCount) * Math.PI * 2;
          const color = colors[i % colors.length];
          this.particles.push(new Particle(x, y, color, type, {
            angle,
            speed: radiusSpeed,
            sizeMultiplier: this.sizeMultiplier,
          }));
        }
        break;
      }

      case FIREWORK_TYPES.FLOWER: {
        const petals = 6;
        const perPetal = 12;
        for (let p = 0; p < petals; p++) {
          const petalBaseAngle = (p / petals) * Math.PI * 2;
          for (let i = 0; i < perPetal; i++) {
            const spread = (Math.random() - 0.5) * 0.45;
            const angle = petalBaseAngle + spread;
            const speed = (2.5 + Math.random() * 3.5) * this.sizeMultiplier;
            const color = colors[p % colors.length];
            this.particles.push(new Particle(x, y, color, type, { angle, speed }));
          }
        }
        break;
      }

      case FIREWORK_TYPES.MULTICOLOR: {
        const rainbow = COLOR_PALETTES.RAINBOW;
        const count = Math.floor(baseCount * 1.3);
        for (let i = 0; i < count; i++) {
          const color = rainbow[Math.floor(Math.random() * rainbow.length)];
          this.particles.push(new Particle(x, y, color, type, {
            sizeMultiplier: this.sizeMultiplier,
          }));
        }
        break;
      }

      case FIREWORK_TYPES.FOUNTAIN: {
        const fountainCount = Math.floor(50 * this.sizeMultiplier);
        for (let i = 0; i < fountainCount; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          this.particles.push(new Particle(x, y, color, type, {
            sizeMultiplier: this.sizeMultiplier,
          }));
        }
        break;
      }

      case FIREWORK_TYPES.WILLOW:
      case FIREWORK_TYPES.CHRYSANTHEMUM:
      case FIREWORK_TYPES.CRACKLING:
      case FIREWORK_TYPES.COMET:
      case FIREWORK_TYPES.PEONY:
      default: {
        const count = Math.floor(baseCount);
        for (let i = 0; i < count; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          this.particles.push(new Particle(x, y, color, type, {
            sizeMultiplier: this.sizeMultiplier,
          }));
        }
        break;
      }
    }
  }

  loop() {
    if (!this.isRunning || this.isPaused) return;

    // Semi-transparent night black clear for realistic trailing persistence
    this.ctx.fillStyle = 'rgba(5, 5, 5, 0.22)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Update & draw rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const rocket = this.rockets[i];
      rocket.update();
      rocket.draw(this.ctx);

      if (rocket.exploded) {
        this.explode(rocket.x, rocket.y, rocket.type, rocket.paletteKey);
        this.rockets.splice(i, 1);
      }
    }

    // Update & draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    this.animationId = requestAnimationFrame(this.loop);
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resize);
  }
}

