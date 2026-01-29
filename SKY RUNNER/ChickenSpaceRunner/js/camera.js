export class Camera { constructor() { this.x = 0; this.shake = 0; } }
let intensity = 0;
export function shake(power) {
  intensity = Math.max(intensity, power);
}

export class Camera {
  constructor() {
    this.x = 0;
    this.shakeX = 0;
    this.shakeY = 0;
  }
  update(player) {
    this.x = player.x - 640;
    intensity *= 0.88;
    this.shakeX = Math.random()*intensity - intensity/2;
    this.shakeY = Math.random()*intensity - intensity/2;
  }
}