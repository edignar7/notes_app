export class Pendulum { constructor(px, py, len, speed) { this.px = px; this.py = py; this.len = len; this.speed = speed; this.ang = 0; } }
export class Pendulum {
  constructor(px, py, len = 240, speed = 3.2) {
    this.px = px;
    this.py = py;
    this.len = len;
    this.speed = speed;
    this.ang = Math.random() * 6.28;
  }

  update(dt) {
    this.ang += this.speed * dt;
  }

  draw(ctx) {
    const bx = this.px + Math.sin(this.ang) * this.len;
    const by = this.py + Math.cos(this.ang) * this.len;

    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(this.px, this.py);
    ctx.lineTo(bx, by);
    ctx.stroke();

    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(bx, by, 44, 0, 6.28);
    ctx.fill();
  }
}