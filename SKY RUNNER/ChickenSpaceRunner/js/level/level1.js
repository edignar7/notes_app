import { Platform } from '../platform.js'; export function loadLevel() { return { platforms: [new Platform(0,500,10000)], goalX: 10000, speedCurve: x => 300 + 0.00008 * x * x }; }
import { Platform } from '../platform.js';
import { Pendulum } from '../hazards.js';
import { Powerup } from '../powerup.js';

export function loadLevel() {
  return {
    platforms: [
      new Platform(0, 500, 3500),
      new Platform(3700, 450, 700, 'collapse'),
      new Platform(4500, 500, 3000),
      new Platform(7600, 400, 900, 'grip'),
      new Platform(8600, 550, 5000),
    ],
    hazards: [
      new Pendulum(5800, 280, 240, 3.2),
    ],
    powerups: [
      new Powerup(6800, 320, 'dash'),
    ],
    goalX: 13500,
    speedCurve: x => 290 + 0.00007 * x * x
  };
}