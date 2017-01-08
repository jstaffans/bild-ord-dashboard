import { Component, OnChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as highcharts from 'highcharts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'popular',
  styles: [`
    chart {
      display: block;
    }
`],
  template: `<chart [options]="options"></chart>`
})
export class PopularComponent implements OnChanges {

  @Input() data: Array<[string, string]>;

  options: Object;

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 2000);
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    const _data = this.data.slice(0, 20);

    console.log(_data);

    this.options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Popular groups'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45
        }
      },
      yAxis: {
        min: 0,
        type: 'linear',
        tickInterval: 5,
        title: {
          text: 'Number of views'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Views',
        data: _data.map(([group, views]) => [group.replace('Bild och ord - grupp', 'Grupp'), parseInt(views)]),
        color: '#00CD00'
      }]
    };
  }
}
