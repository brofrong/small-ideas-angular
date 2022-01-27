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

  public changeVelocityY() {
    this._velocity.y = -this.velocity.y
  }

  public changeVelocityX() {
    this._velocity.x = -this.velocity.x
  }

}
