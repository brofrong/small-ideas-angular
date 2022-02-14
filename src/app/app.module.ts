import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConjoiningLinesComponent } from './conjoining-lines/conjoining-lines.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'lines', component: ConjoiningLinesComponent},
  {path: '', loadChildren: () => import('./mandelbrot-set/mandelbrot-set.module').then(m => m.MandelbrotSetModule)},
]

@NgModule({
  declarations: [
    AppComponent,
    ConjoiningLinesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
