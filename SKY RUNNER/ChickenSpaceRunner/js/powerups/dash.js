export class DashPowerup { constructor(x, y) { this.x = x; this.y = y; } }
export class DashPowerup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.t = 0;
  }

  update(dt) {
    this.t += dt;
  }

  draw(ctx) {
    const py = this.y + Math.sin(this.t * 7) * 12;
    ctx.save();
    ctx.translate(this.x, py);
    ctx.rotate(this.t * 5);
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-35, -35, 70, 70);
    ctx.restore();
  }
}