import { Component, OnInit, Input } from '@angular/core';

import * as highcharts from 'highcharts';
import * as moment from 'moment';

@Component({
  selector: 'sessions',
  styles: [`
    chart {
      display: block;
    }
`],
  template: `<chart [options]="options"></chart>`
})
export class SessionsComponent implements OnInit {

  @Input() data: Array<any>;

  @Input() fromTimestamp: moment.Moment;

  options: Object;

  constructor() {
  }

  ngOnInit() {
    const self = this;

    this.options = {
      title: {
        text: 'Sessions, last 30 days'
      },
      xAxis: {
        type: 'linear',
        tickInterval: 1,
        labels: {
          formatter: function () {
            let label = self.fromTimestamp.clone();
            label.add(this.value, 'days');
            return label.format('D.M.');
          }
        }
      },
      series: [{
        name: 'Sessions',
        data: this.data
      }]
    }
  }

}
