import { Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as highcharts from 'highcharts';

type GroupTitle = string;
type EventLabel = string;
type NumEvents = string;

type GroupRow = [GroupTitle, EventLabel, NumEvents];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ratios',
  styles: [`
    chart {
      display: block;
    }
`],
  template: `<chart [options]="options"></chart>`
})
export class RatiosComponent implements OnChanges {

  @Input() data: Array<GroupRow>;

  options: Object;

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 2000);
  }

  stack(data: Array<GroupRow>) {
    const lookup = {};

    data.forEach(([title, event, numEvents]) => {
      let acc = lookup[title] || [];
      acc[event === 'Rätt' ? 0 : 1] = parseInt(numEvents);
      lookup[title] = acc;
    });

    const stacked = Object.keys(lookup).map(key => {
      return [key, lookup[key][0], lookup[key][1]];
    });

    return stacked;
  }

  updateChart() {
    const self = this;

    const _data = this.stack(this.data);
    console.log(_data.map(row => row[0]))

    this.options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Most difficult groups'
      },
      xAxis: {
        categories: _data.map(row => row[0])
      },
      yAxis: {
        min: 0,
        type: 'linear',
        tickInterval: 5,
        title: {
          text: 'Number of word interactions'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'percent'
        }
      },
      series: [{
        name: 'Ratt',
        data: _data.map(row => row[1]),
        color: '#00CD00'
      }, {
        name: 'Fel',
        data: _data.map(row => row[2]),
        color: '#FC1501'
      }]
    };
  }

  ngOnChanges() {
    this.updateChart();
  }

}
