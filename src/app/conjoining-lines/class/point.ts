export class Point {

  public get velocity(): { x: number, y: number } {
    return this._velocity;
  }

  public x: number = 0;
  public y: number = 0;

  protected _velocity: { x: number, y: number }

  constructor(maxX: number, maxY: number, minVelocity: number, maxVelocity: number) {
    this.x = Math.random() * maxX;
    this.y = Math.random() * maxY;

    const velocityX = (minVelocity + (Math.random() * (maxVelocity - minVelocity))) * (Math.random() > 0.5 ? -1 : 1);
    const velocityY = (minVelocity + (Math.random() * (maxVelocity - minVelocity))) * (Math.random() > 0.5 ? -1 : 1);
    this._velocity = {x: velocityX, y: velocityY}
  }

  public distance(nextPoint: Point): number {
    return Math.hypot(nextPoint.x - this.x, nextPoint.y - this.y);
  }

  public randomVelocity( minVelocity: number, maxVelocity: number) {
    if (Math.random() < 0.005) {
      this._velocity.x = (minVelocity + (Math.random() * (maxVelocity - minVelocity))) * (Math.random() > 0.5 ? -1 : 1);
    }
    if (Math.random() < 0.005) {
      this._velocity.y = (minVelocity + (Math.random() * (maxVelocity - minVelocity))) * (Math.random() > 0.5 ? -1 : 1);
    }
  }

  public update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  public checkChangeDirection(canvasWidth: number, canvasHeight: number) {
    if (this.x > canvasWidth  && this.velocity.x > 0) {
      this._velocity.x = -this.velocity.x;
    }

    if (this.x < 0  && this.velocity.x < 0) {
      this._velocity.x = -this.velocity.x;
    }

    if (this.y > canvasHeight  && this.velocity.y > 0) {
      this._velocity.y = -this.velocity.y;
    }

    if (this.y < 0  && this.velocity.y < 0) {
      this._velocity.y = -this.velocity.y;
    }
  }
}
