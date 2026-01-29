import { Platform } from '../platform.js';
import { Pendulum } from '../hazards.js';
import { Powerup } from '../powerup.js';

export function loadLevel() {
  return {
    platforms: [
      new Platform(0, 500, 2500),
      new Platform(2700, 420, 500, 'collapse'),
      new Platform(3300, 380, 400, 'collapse'),
      new Platform(3800, 500, 1200),
      new Platform(5100, 430, 800, 'grip'),
      new Platform(6000, 550, 2000),
      new Platform(8100, 480, 600, 'collapse'),
      new Platform(8800, 520, 5000),
    ],
    hazards: [
      new Pendulum(6500, 250, 280, -4),
      new Pendulum(9800, 200, 320, 4.5),
    ],
    powerups: [
      new Powerup(4400, 280, 'slowmo'),
      new Powerup(10800, 350, 'dash'),
    ],
    goalX: 16500,
    speedCurve: x => 340 + 0.00009 * x * x
  };
}