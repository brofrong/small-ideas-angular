import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandelbrotSetComponent } from './mandelbrot-set.component';

describe('MandelbrotSetComponent', () => {
  let component: MandelbrotSetComponent;
  let fixture: ComponentFixture<MandelbrotSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandelbrotSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandelbrotSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
