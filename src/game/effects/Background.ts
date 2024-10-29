export class Background {
  private gridOffset = 0;
  private readonly gridSpeed = 0.5;

  constructor(private ctx: CanvasRenderingContext2D, private width: number, private height: number) {}

  draw() {
    // Background
    this.ctx.fillStyle = '#111827';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Moving grid effect
    this.ctx.strokeStyle = '#1e40af20';
    this.ctx.lineWidth = 1;
    
    const gridSize = 40;
    this.gridOffset = (this.gridOffset + this.gridSpeed) % gridSize;

    // Vertical lines
    for (let x = -gridSize + this.gridOffset; x < this.width + gridSize; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = -gridSize + this.gridOffset; y < this.height + gridSize; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Vignette effect
    const gradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, this.width * 0.7
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}