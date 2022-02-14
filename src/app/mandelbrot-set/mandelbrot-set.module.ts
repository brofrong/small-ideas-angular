import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandelbrotSetComponent } from './mandelbrot-set.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: MandelbrotSetComponent},
]

@NgModule({
  declarations: [
    MandelbrotSetComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class MandelbrotSetModule { }
