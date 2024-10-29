import { Bubble } from './entities/Bubble';
import { Projectile } from './entities/Projectile';
import { Background } from './effects/Background';

interface GameConfig {
  onScoreUpdate: (score: number) => void;
  onGameOver: () => void;
}

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private background: Background;
  private bubbles: Bubble[] = [];
  private projectile: Projectile | null = null;
  private animationFrame: number | null = null;
  private lastSpawn = 0;
  private spawnInterval = 2000;
  private score = 0;
  private paused = false;
  private config: GameConfig;

  private readonly BUBBLE_COLORS = [
    { main: '#0891b2', glow: '#06b6d4' }, // Cyan
    { main: '#7c3aed', glow: '#8b5cf6' }, // Purple
    { main: '#059669', glow: '#10b981' }, // Emerald
    { main: '#db2777', glow: '#ec4899' }  // Pink
  ];

  constructor(private canvas: HTMLCanvasElement, config: GameConfig) {
    this.ctx = canvas.getContext('2d')!;
    this.background = new Background(this.ctx, canvas.width, canvas.height);
    this.config = config;
    this.setupEventListeners();
    this.start();
  }

  private setupEventListeners() {
    this.canvas.addEventListener('click', this.handleClick);
  }

  private handleClick = (e: MouseEvent) => {
    if (this.paused || this.projectile) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
    
    this.shoot(x, y);
  };

  private shoot(targetX: number, targetY: number) {
    const startX = this.canvas.width / 2;
    const startY = this.canvas.height - 20;
    
    const angle = Math.atan2(targetY - startY, targetX - startX);
    const velocity = {
      x: Math.cos(angle) * 7,
      y: Math.sin(angle) * 7
    };

    this.projectile = new Projectile(startX, startY, velocity);
  }

  private spawnBubble() {
    const now = Date.now();
    if (now - this.lastSpawn >= this.spawnInterval) {
      const color = this.BUBBLE_COLORS[Math.floor(Math.random() * this.BUBBLE_COLORS.length)];
      const x = Math.random() * (this.canvas.width - 40) + 20;
      const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: Math.random() * 2 + 1
      };
      
      this.bubbles.push(new Bubble(x, -20, velocity, color.main, color.glow));
      this.lastSpawn = now;
      this.spawnInterval = Math.max(500, this.spawnInterval - 50);
    }
  }

  private update() {
    if (this.paused) return;

    // Update bubbles
    this.bubbles = this.bubbles.filter(bubble => {
      bubble.update();
      if (bubble.y > this.canvas.height + 20) {
        this.config.onGameOver();
        this.stop();
        return false;
      }
      return true;
    });

    // Update projectile
    if (this.projectile) {
      this.projectile.update();

      // Check collision with bubbles
      this.bubbles = this.bubbles.filter(bubble => {
        if (this.projectile && this.checkCollision(bubble, this.projectile)) {
          this.score += 10;
          this.config.onScoreUpdate(this.score);
          return false;
        }
        return true;
      });

      // Remove projectile if out of bounds
      if (
        this.projectile.x < 0 ||
        this.projectile.x > this.canvas.width ||
        this.projectile.y < 0 ||
        this.projectile.y > this.canvas.height
      ) {
        this.projectile = null;
      }
    }

    this.spawnBubble();
  }

  private checkCollision(bubble: Bubble, projectile: Projectile) {
    const dx = bubble.x - projectile.x;
    const dy = bubble.y - projectile.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < bubble.radius + projectile.radius;
  }

  private render() {
    this.background.draw();

    // Draw bubbles
    this.bubbles.forEach(bubble => bubble.draw(this.ctx));

    // Draw projectile
    if (this.projectile) {
      this.projectile.draw(this.ctx);
    }

    // Draw pause indicator
    if (this.paused) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '48px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
    }
  }

  private gameLoop = () => {
    this.update();
    this.render();
    this.animationFrame = requestAnimationFrame(this.gameLoop);
  };

  public start() {
    if (this.animationFrame === null) {
      this.gameLoop();
    }
  }

  public stop() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  public pause() {
    this.paused = true;
  }

  public resume() {
    this.paused = false;
  }

  public restart() {
    this.bubbles = [];
    this.projectile = null;
    this.score = 0;
    this.spawnInterval = 2000;
    this.lastSpawn = 0;
    this.paused = false;
    this.start();
  }

  public cleanup() {
    this.stop();
    this.canvas.removeEventListener('click', this.handleClick);
  }
}