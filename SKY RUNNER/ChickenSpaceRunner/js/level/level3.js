import { Platform } from '../platform.js';
import { Pendulum } from '../hazards/pendulum.js';
import { Bomb } from '../hazards/bomb.js';
import { DashPowerup } from '../powerups/dash.js';
import { SlowmoPowerup } from '../powerups/slowmo.js';

export function loadLevel() {
  const plats = [];
  let x = 0;
  for(let i = 0; i < 38; i++) {
    let gap = 220 + Math.random() * 280;
    let width = 320 + Math.random() * 600;
    let y = 500 + Math.sin(i * 0.7) * 140;
    let type = Math.random() < 0.55 ? 'collapse' : (Math.random() < 0.3 ? 'grip' : 'normal');
    plats.push(new Platform(x + gap, y, width, type));
    x += gap + width;
  }

  return {
    platforms: plats,
    hazards: [
      new Pendulum(7200, 180, 340, 5.2),
      new Pendulum(11000, 160, 380, -6.1),
      new Bomb(9200),
      new Bomb(14000),
    ],
    powerups: [
      new SlowmoPowerup(8000, 280),
      new DashPowerup(15500, 320),
    ],
    goalX: x - 800,
    speedCurve: x => 420 + 0.00012 * x * x   // you will be screaming by 20,000m
  };
}