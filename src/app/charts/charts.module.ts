import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { SessionsComponent } from './sessions.component';
import { RatiosComponent } from './ratios.component';
import { PopularComponent } from './popular.component';

@NgModule({
  imports: [CommonModule, BrowserModule, ChartModule],
  exports: [SessionsComponent, RatiosComponent, PopularComponent],
  declarations: [SessionsComponent, RatiosComponent, PopularComponent]
})
export class ChartsModule { }
