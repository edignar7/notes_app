export class SlowmoPowerup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.t = 0;
  }

  update(dt) {
    this.t += dt;
  }

  draw(ctx) {
    const py = this.y + Math.sin(this.t * 6) * 15;
    ctx.fillStyle = '#ffff88';
    ctx.beginPath();
    ctx.arc(this.x, py, 36, 0, 6.28);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', this.x, py);
  }
}