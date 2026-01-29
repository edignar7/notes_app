import { Platform } from '../platform.js';
import { Pendulum } from '../hazards/pendulum.js';
import { Bomb } from '../hazards/bomb.js';
import { DashPowerup } from '../powerups/dash.js';
import { SlowmoPowerup } from '../powerups/slowmo.js';

export function loadLevel() {
  // Generate infinite procedural level
  const platforms = [];
  const hazards = [];
  const powerups = [];
  let x = 0;
  let lastPowerup = 0;

  while (x < 500000) {  // half a million pixels of pure suffering
    let gap = 180 + Math.random() * 340;
    let width = 260 + Math.random() * 580;
    let y = 500 + Math.sin(x * 0.0023) * 190 + Math.cos(x * 0.0017) * 80;
    let type = Math.random() < 0.72 ? 'collapse' : (Math.random() < 0.4 ? 'grip' : 'normal');
    platforms.push(new Platform(x + gap, y, width, type));

    // Dynamic hazards
    if (Math.random() < 0.02 && x > 10000) {
      hazards.push(new Pendulum(x + gap + width/2, 100 + Math.random()*100, 300 + Math.random()*200, (Math.random()<0.5?1:-1) * (4 + x*0.00001)));
    }
    if (Math.random() < 0.015 && x > 15000) {
      hazards.push(new Bomb(x + gap + 400));
    }

    // Rare clutch powerups
    if (x - lastPowerup > 12000 + Math.random()*8000) {
      if (Math.random() < 0.6) {
        powerups.push(new SlowmoPowerup(x + gap + width/2, y - 100));
      } else {
        powerups.push(new DashPowerup(x + gap + width/2, y - 100));
      }
      lastPowerup = x;
    }

    x += gap + width;
  }

  return {
    platforms,
    hazards,
    powerups,
    goalX: Infinity,
    speedCurve: x => 550 + 0.0002 * x * x + Math.sin(x * 0.00005) * 200,
    backgroundColor: () => `hsl(${(performance.now()*0.02)%360}, 70%, 12%)`, // shifting void
    onUpdate: () => {
      document.title = `ABYSS • ${Math.floor(x/1000)}km • NEVER STOP`;
    }
  };
}