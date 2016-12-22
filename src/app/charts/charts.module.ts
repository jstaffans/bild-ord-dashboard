import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { ChartsComponent } from './charts.component';
import { SessionsComponent } from './sessions.component';

@NgModule({
  imports: [CommonModule, BrowserModule, ChartModule],
  exports: [ChartsComponent],
  declarations: [ChartsComponent, SessionsComponent]
})
export class ChartsModule { }
