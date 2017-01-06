import { Component, OnChanges, DoCheck, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as highcharts from 'highcharts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sessions',
  styles: [`
    chart {
      display: block;
    }
`],
  template: `<chart [options]="options"></chart>`
})
export class SessionsComponent implements OnInit {

  @Input()
  set data(data: Array<any>) {
    this._data = data;
  }

  @Input() fromTimestamp: moment.Moment;

  options: Object;

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 2000);
  }

  ngOnChanges() {
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
        data: this._data
      }]
    }
  }

}
