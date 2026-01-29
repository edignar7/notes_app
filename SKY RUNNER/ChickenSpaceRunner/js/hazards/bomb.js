export class Bomb {
  constructor(x, warningTime = 1.2) {
    this.x = x;
    this.y = -150;
    this.vy = 0;
    this.warning = warningTime;
    this.exploded = false;
  }

  update(dt) {
    if (this.warning > 0) {
      this.warning -= dt;
    } else {
      this.vy += 1200 * dt;
      this.y += this.vy * dt;
    }
  }

  draw(ctx) {
    if (this.warning > 0) {
      ctx.globalAlpha = 0.4 + 0.4 * Math.sin(performance.now() * 0.01);
      ctx.fillStyle = '#ff0088';
      ctx.beginPath();
      ctx.arc(this.x, 620, 90, 0, 6.28);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (!this.exploded) {
      ctx.fillStyle = '#880000';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 40, 0, 6.28);
      ctx.fill();
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 8;
      ctx.stroke();
    }
  }
}