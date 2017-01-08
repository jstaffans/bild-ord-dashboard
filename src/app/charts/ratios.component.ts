import { Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as highcharts from 'highcharts';

type GroupTitle = string;
type EventLabel = string;
type NumEvents = string;

type GroupRow = [GroupTitle, EventLabel, NumEvents];

type Order = 'ascending' | 'descending';

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

  @Input() order: Order;

  @Input() title: string;

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
    let sortFn: (a, b) => number;

    if (this.order === 'descending') {
      sortFn = (a, b) => {
        return (a[1] / a[2]) - (b[1] / b[2]);
      }
    } else {
      sortFn = (a, b) => {
        return (b[1] / b[2]) - (a[1] / a[2]);
      }
    }

    data.forEach(([title, event, numEvents]) => {
      const shortTitle = title.replace('Bild och ord - grupp', 'Grupp');
      const acc = lookup[shortTitle] || [];
      acc[event === 'Rätt' ? 0 : 1] = parseInt(numEvents);
      lookup[shortTitle] = acc;
    });

    const stacked = Object.keys(lookup).map(key => {
      return [key, lookup[key][0], lookup[key][1]];
    }).sort(sortFn);

    return stacked;
  }


  updateChart() {
    const _data = this.stack(this.data).slice(0, 10);

    this.options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: this.title
      },
      xAxis: {
        categories: _data.map(row => row[0])
      },
      yAxis: {
        min: 0,
        type: 'linear',
        tickInterval: 5,
        title: {
          text: 'Percentage of word interactions'
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
        name: 'Right',
        data: _data.map(row => row[1]),
        color: '#00CD00'
      }, {
        name: 'Wrong',
        data: _data.map(row => row[2]),
        color: '#FC1501'
      }]
    };
  }

  ngOnChanges() {
    this.updateChart();
  }
}
