import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConjoiningLinesComponent } from './conjoining-lines/conjoining-lines.component';

@NgModule({
  declarations: [
    AppComponent,
    ConjoiningLinesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
