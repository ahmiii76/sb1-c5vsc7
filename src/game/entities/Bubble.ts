export class Bubble {
  public radius = 20;
  private glowIntensity = 0;
  private glowDirection = 1;

  constructor(
    public x: number,
    public y: number,
    private velocity: { x: number; y: number },
    public color: string = '#0891b2',
    public glowColor: string = '#06b6d4'
  ) {}

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Bounce off walls
    if (this.x < this.radius || this.x > 800 - this.radius) {
      this.velocity.x = -this.velocity.x;
    }

    // Update glow effect
    this.glowIntensity += 0.05 * this.glowDirection;
    if (this.glowIntensity >= 1) {
      this.glowDirection = -1;
    } else if (this.glowIntensity <= 0) {
      this.glowDirection = 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    
    // Glow effect
    ctx.shadowBlur = 15 + (5 * this.glowIntensity);
    ctx.shadowColor = this.glowColor;
    
    // Main bubble
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    // Bubble outline
    ctx.strokeStyle = this.glowColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Shine effect
    ctx.beginPath();
    ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
    
    ctx.restore();
  }
}