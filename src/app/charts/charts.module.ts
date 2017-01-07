import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { SessionsComponent } from './sessions.component';
import { RatiosComponent } from './ratios.component';

@NgModule({
  imports: [CommonModule, BrowserModule, ChartModule],
  exports: [SessionsComponent, RatiosComponent],
  declarations: [SessionsComponent, RatiosComponent]
})
export class ChartsModule { }
