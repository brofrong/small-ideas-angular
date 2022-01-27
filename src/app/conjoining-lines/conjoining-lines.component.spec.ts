import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjoiningLinesComponent } from './conjoining-lines.component';

describe('ConjoiningLinesComponent', () => {
  let component: ConjoiningLinesComponent;
  let fixture: ComponentFixture<ConjoiningLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjoiningLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjoiningLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
