export class Platform { constructor(x, y, w, type='normal') { this.x = x; this.y = y; this.w = w; this.type = type; this.active = true; } }
export class Platform {
  constructor(x, y, w, type = 'normal') {
    this.x = x; this.y = y; this.w = w;
    this.type = type; this.active = true;
    this.cracking = 0;
  }
  draw(ctx) {
    if (!this.active) return;
    ctx.fillStyle = this.type === 'grip' ? '#3b8' : '#666';
    ctx.fillRect(this.x, this.y, this.w, 22);
    if (this.cracking > 0) {
      this.cracking -= 0.016;
      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = '#f33';
      ctx.lineWidth = 4;
      for(let i=0;i<12;i++){
        let rx = this.x + Math.random()*this.w;
        ctx.beginPath();
        ctx.moveTo(rx, this.y);
        ctx.lineTo(rx + Math.random()*40-20, this.y+22);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (this.cracking <= 0) this.active = false;
    }
  }
}