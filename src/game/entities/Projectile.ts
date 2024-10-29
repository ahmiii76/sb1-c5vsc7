export class Projectile {
  public radius = 5;
  private trail: Array<{ x: number; y: number; alpha: number }> = [];

  constructor(
    public x: number,
    public y: number,
    private velocity: { x: number; y: number }
  ) {}

  update() {
    // Add current position to trail
    this.trail.push({ x: this.x, y: this.y, alpha: 1 });
    if (this.trail.length > 10) {
      this.trail.shift();
    }

    // Update trail alpha
    this.trail.forEach(point => {
      point.alpha *= 0.9;
    });

    // Update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    // Draw trail
    this.trail.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, this.radius * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236, 72, 153, ${point.alpha * 0.5})`;
      ctx.fill();
    });

    // Draw projectile
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ec4899';
    ctx.fillStyle = '#ec4899';
    ctx.fill();

    ctx.restore();
  }
}