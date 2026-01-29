// Game entry point
import { Player } from './player.js';
import { loadLevel } from './level/level1.js';
// Game loop starts here
console.log('Chicken Space Runner v1.0 - Ready to code!');
import { Player } from './player.js';
import { Camera } from './camera.js';
import { loadLevel } from './level/level1.js';  // Change to level2.js, level3.js later

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = 1280; canvas.height = 720;

let player = new Player();
let camera = new Camera();
let { platforms, hazards, powerups, goalX, speedCurve } = loadLevel();

let keys = {};
window.onkeydown = e => keys[e.key.toLowerCase()] = true;
window.onkeyup = e => keys[e.key.toLowerCase()] = false;

let last = performance.now();
function loop(t) {
  let dt = Math.min((t - last)/1000, 0.1);
  last = t;
  if (player.slowmo > 0) dt *= 0.25;

  player.update(dt, keys, speedCurve, platforms, hazards, powerups, camera);
  camera.update(player);

  ctx.fillStyle = '#0b1a2e';
  ctx.fillRect(0,0,1280,720);

  // Stars
  for(let i=0;i<180;i++){
    let x = (i*237 + t*0.03) % 1400 - 80;
    let y = (i*149) % 720;
    ctx.fillStyle = `hsl(${i%60},100%,${70+i%80}%)`;
    ctx.fillRect(x,y,3,3);
  }

  ctx.save();
  ctx.translate(640 - camera.x + camera.shakeX, 360 + camera.shakeY);

  platforms.forEach(p => p.draw(ctx));
  hazards.forEach(h => h.draw(ctx));
  powerups.forEach(p => p.draw(ctx));
  player.draw(ctx);

  // Goal
  ctx.fillStyle = '#88f';
  ctx.fillRect(goalX, 400, 80, 200);
  ctx.fillStyle = '#ff0';
  ctx.beginPath(); ctx.moveTo(goalX+80,400); ctx.lineTo(goalX+160,450); ctx.lineTo(goalX+80,500); ctx.fill();

  ctx.restore();

  // UI
  ctx.fillStyle = '#fff';
  ctx.font = '32px monospace';
  ctx.fillText(`Distance: ${Math.floor(player.x/100)}m`, 30, 60);
  if (player.dashReady) ctx.fillText('DASH READY', 30, 110);

  if (player.dead) {
    ctx.fillStyle = 'rgba(120,0,0,0.9)';
    ctx.fillRect(0,0,1280,720);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 90px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('FELL INTO SPACE', 640, 360);
  }

  if (player.x > goalX + 200) {
    ctx.fillStyle = 'rgba(0,50,0,0.9)';
    ctx.fillRect(0,0,1280,720);
    ctx.fillStyle = '#ff0';
    ctx.font = 'bold 90px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('LEVEL COMPLETE!', 640, 360);
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);