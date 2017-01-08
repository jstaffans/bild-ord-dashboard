import { Component, OnChanges, DoCheck, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as highcharts from 'highcharts';

import * as moment from 'moment';

type SessionRow = [string, string, string];

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
export class SessionsComponent implements OnChanges {

  @Input() data: Array<SessionRow>;

  @Input() fromTimestamp: moment.Moment;

  options: Object;

  constructor(private ref: ChangeDetectorRef) {
    // TODO: better way of detecting changes than polling every few seconds
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 2000);
  }

  ngOnChanges() {
    const self = this;

    const _data = [
      this.linearize(this.data, this.fromTimestamp, "Finland"),
      this.linearize(this.data, this.fromTimestamp, "Sweden"),
    ];

    const labels = ["Finland", "Sweden"];

    const series = labels.map((label, i) => {
      return {name: label, data: _data[i]}
    });

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
      yAxis: {
        tickInterval: 5
      },
      series
    }
  }

  linearize(data: Array<SessionRow>, fromTimestamp: moment.Moment, country: string) {
    if (data.length === 0) {
      return [];
    }

    const lookup = {};
    const dateCounter = fromTimestamp.clone();
    const today = moment();
    const result = [];

    data.forEach(([dayOfMonth, c, sessions]) => {
      if (c == country) {
        lookup[parseInt(dayOfMonth)] = parseInt(sessions);
      }
    });

    while (dateCounter.isBefore(today)) {
      result.push(lookup[dateCounter.date()] || 0);
      dateCounter.add(1, "days");
    }

    return result;
  }
}
