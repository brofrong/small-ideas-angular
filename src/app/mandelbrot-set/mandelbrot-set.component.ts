import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Mandelbrot} from "./class/mandelbrot";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-mandelbrot-set',
  templateUrl: './mandelbrot-set.component.html',
  styleUrls: ['./mandelbrot-set.component.css']
})
export class MandelbrotSetComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

  public form = this.fb.group({
    'maxIterations': [100],
    'x': [-2.5],
    'y': [-1.5],
    'scale': [250],
  })

  private ctx!: CanvasRenderingContext2D;
  private canvasData!: ImageData;
  private canvasSize = {width: 0, height: 0};
  private mandelbrot: Mandelbrot = new Mandelbrot(800, 600);

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  public submit() {
    this.mandelbrot.setConfig(this.form.value);
    this.draw();
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
    this.canvasSize = this.setCanvasSize(this.canvas);
    this.canvasData = ctx.getImageData(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.draw();
  }

  private setCanvasSize(canvas:  ElementRef<HTMLCanvasElement>): {width: number, height: number} {
    // this.ctx.canvas.width = window.innerWidth;
    // this.ctx.canvas.height = window.innerHeight;
    return {width: canvas.nativeElement.width, height: canvas.nativeElement.height}
  }

  private draw() {
    console.time('calc');
    this.mandelbrot.calc();
    console.timeEnd('calc');
    console.time('setData');
    this.setData()
    console.timeEnd('setData');
    console.time('draw');
    this.ctx.putImageData(this.canvasData, 0 ,0);
    console.timeEnd('draw');
    // requestAnimationFrame(() => this.draw());
  }

  private setData() {
    for (let x = 0; x < this.canvasSize.width; x++) {
      for (let y = 0; y < this.canvasSize.height; y++) {
        this.drawPixel(x, y, this.mandelbrot.points[x][y]);
      }
    }
  }


  private drawPixel(x: number, y: number, color: number) {
    const index = (x + y * this.canvasSize.width) * 4;

    this.canvasData.data[index + 0] = color;
    this.canvasData.data[index + 1] = color;
    this.canvasData.data[index + 2] = color;
    this.canvasData.data[index + 3] = 255;
  }
}
