import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {Point} from "./class/point";

@Component({
  selector: 'app-conjoining-lines',
  templateUrl: './conjoining-lines.component.html',
  styleUrls: ['./conjoining-lines.component.css']
})
export class ConjoiningLinesComponent implements AfterViewInit {
  @Input() numberOfPoints: number = 200;
  @Input() pointsRadius: number = 3;
  @Input() pointsColor: string = '#3434c9';
  @Input() lineColor: string = '#424bce';
  @Input() minPointsSpeed: number = 0.05;
  @Input() maxPointsSpeed: number = 1.5;
  @Input() minLineDistance: number = 80;

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setCanvasSize()
  }

  private ctx!: CanvasRenderingContext2D;
  private points: Point[] = [];

  private canvasSize = {width: 0, height: 0};

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.canvas === undefined) {
      throw new Error('canvas is undefined');
    }
    const ctx = this.canvas.nativeElement.getContext('2d');

    if (ctx === null || ctx === undefined) {
      throw new Error('2d ctx is unsupported');
    }
    this.ctx = ctx;
    this.setCanvasSize();
    this.points = this.generatePoints();
    setInterval(() => this.loop(), 1000 / 60);

  }

  private setCanvasSize() {
    if (this.canvas === undefined) {
      throw new Error('canvas is undefined');
    }
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.canvasSize = {width: this.canvas.nativeElement.width, height: this.canvas.nativeElement.height}
  }

  private loop() {

    this.render();

    console.time('update');
    this.update();
    console.timeEnd('update');
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    console.time('render-line');
    this.renderLines();
    console.timeEnd('render-line');
    console.time('render-points');
    this.renderPoints();
    console.timeEnd('render-points');
  }

  private renderLines() {
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const distance = this.points[i].distance(this.points[j])
        if (distance < this.minLineDistance) {
          this.drawLine(this.points[i], this.points[j], distance);
        }
      }
    }
  }

  private update() {
    this.points.forEach((point) => {
      if (point.x > this.canvasSize.width || point.x < 0) {
        point.changeVelocityX();
      }
      if (point.y > this.canvasSize.height || point.y < 0) {
        point.changeVelocityY();
      }

      point.x += point.velocity.x;
      point.y += point.velocity.y;
    });
  }

  private generatePoints(): Point[] {
    const points = [];

    for (let i = 0; i < this.numberOfPoints; i++) {
      points.push(new Point(this.canvasSize.width, this.canvasSize.height, this.minPointsSpeed, this.maxPointsSpeed));
    }

    return points;
  }

  private renderPoints() {
    this.ctx.fillStyle = this.pointsColor;
    for (let point of this.points) {
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, this.pointsRadius, 0, 2 * Math.PI, false);
      this.ctx.fill();
    }
  }

  private drawLine(a: Point, b: Point, distance: number) {
    this.ctx.lineWidth = 1 - Math.pow(distance / this.minLineDistance, 2);
    this.ctx.beginPath();
    this.ctx.moveTo(a.x, a.y);
    this.ctx.lineTo(b.x, b.y);
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.stroke();
  }
}
