export class Player { constructor() { this.x = 100; this.y = 300; this.vx = 0; this.vy = 0; } update() {} draw() {} }
import { shake } from './camera.js';

export class Player {
  constructor() {
    this.x = 100; this.y = 300;
    this.vx = 0; this.vy = 0;
    this.w = 56; this.h = 72;
    this.onGround = false;
    this.coyote = 0; this.jumpBuffer = 0;
    this.dashReady = false; this.slowmo = 0;
    this.runT = 0; this.dead = false;
  }

  update(dt, keys, speedCurve, platforms, hazards, powerups, camera) {
    if (this.dead) return;
    this.runT += dt;

    let input = (keys['d']||keys['arrowright']?1:0) + (keys['a']||keys['arrowleft']?-1:0);
    this.vx += (input * 2400 - this.vx * 8) * dt;
    if ((keys['shift']||keys[' ']) && this.dashReady) {
      this.vx += 1400;
      this.dashReady = false;
      shake(18);
    }

    this.vx += speedCurve(this.x);
    this.onGround = false;

    for(let p of platforms) {
      if (p.active && this.vy >= 0 && this.x + this.w > p.x && this.x < p.x + p.w &&
          this.y + this.h >= p.y && this.y + this.h <= p.y + 30) {
        this.y = p.y - this.h;
        this.vy = 0;
        this.onGround = true;
        if (p.type === 'collapse' && !p.cracking) p.cracking = 0.6;
        if (p.type === 'grip') this.vx *= 1.4;
      }
    }

    if (this.onGround) this.coyote = 0.1;
    else this.coyote -= dt;

    if (keys[' '] || keys['w'] || keys['arrowup']) this.jumpBuffer = 0.12;
    if (this.jumpBuffer > 0 && this.coyote > 0) {
      this.vy = -720;
      this.coyote = this.jumpBuffer = 0;
      shake(12);
    }
    if (this.jumpBuffer > 0) this.jumpBuffer -= dt;

    this.vy += 1800 * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Powerups
    powerups = powerups.filter(p => {
      if (Math.hypot(this.x+28 - p.x, this.y+36 - p.y) < 80) {
        if (p.type === 'dash') this.dashReady = true;
        if (p.type === 'slowmo') this.slowmo = 3.5;
        return false;
      }
      return true;
    });

    if (this.slowmo > 0) this.slowmo -= dt;

    // Hazards
    for(let h of hazards) {
      if (h.type === 'pendulum') {
        let bx = h.px + Math.sin(h.ang)*h.len;
        let by = h.py + Math.cos(h.ang)*h.len;
        if (Math.hypot(this.x+28 - bx, this.y+36 - by) < 70) this.dead = true;
      }
    }

    if (this.y > 1200) this.dead = true;
  }

  draw(ctx) {
    let cx = this.x + 28;
    let cy = this.y + 36 + (this.onGround ? Math.sin(this.runT*18)*6 : 0);

    ctx.fillStyle = '#ffe666';
    ctx.fillRect(cx-28, cy-20, 56, 80); // body
    ctx.fillRect(cx-30 + Math.sin(this.runT*25)*15, cy-10, 40, 60); // wing

    ctx.beginPath();
    ctx.arc(cx+20, cy-40, 28, 0, 6.28);
    ctx.fill(); // head

    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(cx+30, cy-45, 12, 0, 6.28); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(cx+35, cy-45, 6, 0, 6.28); ctx.fill();

    ctx.fillStyle = '#f80';
    ctx.beginPath(); ctx.moveTo(cx+48,cy-40); ctx.lineTo(cx+68,cy-35); ctx.lineTo(cx+48,cy-30); ctx.fill();

    // Speed lines
    if (this.vx > 900) {
      ctx.strokeStyle = 'rgba(180,240,255,0.7)';
      ctx.lineWidth = 5;
      for(let i=1;i<6;i++){
        ctx.globalAlpha = 1-i/6;
        ctx.beginPath();
        ctx.moveTo(this.x - i*60, this.y + Math.random()*40);
        ctx.lineTo(this.x - i*60 - 100, this.y + Math.random()*40);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }
}