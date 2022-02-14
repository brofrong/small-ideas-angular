export class Mandelbrot {

  public points: number[][] = [];

  public maxIterations: number = 50;
  public scale = 200;
  public x = -2.5;
  public y = -1.5;


  constructor(public width: number, public height: number) {
    for (let i = 0; i < this.width; i++) {
      this.points[i] = [];
    }

    this.calc();
  }

  public setConfig(config: { maxIterations: number, scale: number, x: number, y: number }) {
    console.log(config);
    this.maxIterations = +config.maxIterations;
    this.scale = +config.scale;
    this.x = +config.x;
    this.y = +config.y;
  }

  public calc() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.points[i][j] = Math.sqrt(this.isInSet(this.x + i / this.scale, this.y + j / this.scale) / this.maxIterations) * 255;
      }
    }
  }

  private isInSet(x0: number, y0: number): number {
    let x = 0, y = 0;
    let n = 0
    for (; n < this.maxIterations; n++) {
      const xNew = x * x - y * y + x0;
      const yNew = 2 * x * y + y0;
      if (xNew*xNew + yNew*yNew > 4) {
        return n;
      }
      x = xNew;
      y = yNew;
    }
    return n
  }

}
