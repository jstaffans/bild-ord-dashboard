import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  sessionData: Array<any>;

  sessionFromTimestamp: Object;

  constructor() {
    this.sessionData = [12, 25, 6, 44, 19];
    this.sessionFromTimestamp = moment();
    console.log(this.sessionFromTimestamp);
  }

  ngOnInit() {
  }

}
