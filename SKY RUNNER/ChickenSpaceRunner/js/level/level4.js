import { Platform } from '../platform.js';
import { Pendulum } from '../hazards/pendulum.js';
import { Bomb } from '../hazards/bomb.js';
import { DashPowerup } from '../powerups/dash.js';
import { SlowmoPowerup } from '../powerups/slowmo.js';

// NEW: Wind gust zone (invisible, pushes player left/right)
class Wind {
  constructor(x, width, strength, directionRight = true) {
    this.x = x;
    this.width = width;
    this.strength = strength;        // pixels per second force
    this.directionRight = directionRight;
    this.t = Math.random() * 100;
  }
  update(dt, player) {
    if (player.x > this.x && player.x < this.x + this.width && player.y > 300) {
      const pulse = 0.7 + 0.3 * Math.sin(this.t * 8);
      player.vx += (this.directionRight ? 1 : -1) * this.strength * pulse * dt;
    }
    this.t += dt;
  }
  draw(ctx) {
    // Visual indicator (remove later for hardcore mode)
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = this.directionRight ? '#00ffff' : '#ff00ff';
    ctx.fillRect(this.x, 0, this.width, 720);
    ctx.globalAlpha = 1;
  }
}

export function loadLevel() {
  const plats = [];
  let x = 0;
  for(let i = 0; i < 45; i++) {
    let gap = 200 + Math.random() * 300;
    let width = 300 + Math.random() * 500;
    let y = 500 + Math.sin(i * 0.8) * 160;
    let type = Math.random() < 0.7 ? 'collapse' : (Math.random() < 0.35 ? 'grip' : 'normal');
    plats.push(new Platform(x + gap, y, width, type));
    x += gap + width;
  }

  const winds = [
    new Wind(6000, 3000, 1800, false),   // massive left push
    new Wind(11000, 2500, 2200, true),   // brutal right push
    new Wind(17000, 2000, 2800, false),
    new Wind(23000, 4000, 3200, true),   // you will cry here
  ];

  return {
    platforms: plats,
    hazards: [
      new Pendulum(8500, 150, 400, 6.8),
      new Pendulum(15000, 120, 420, -7.4),
      new Bomb(13000),
      new Bomb(20000),
    ],
    powerups: [
      new SlowmoPowerup(14000, 250),
      new DashPowerup(21000, 300),
    ],
    winds: winds,                // ← NEW
    goalX: x - 1000,
    speedCurve: x => 500 + 0.00016 * x * x,
    updateExtra: (dt, player) => winds.forEach(w => w.update(dt, player)),
    drawExtra: (ctx) => winds.forEach(w => w.draw(ctx))
  };
}