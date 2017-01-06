import { Component, Inject, AfterViewInit, ElementRef } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'ga-root',
  templateUrl: './ga.component.html',
  styleUrls: ['./ga.component.css']
})
export class GaComponent implements AfterViewInit {

  elementRef: ElementRef;

  scopes: String[];

  sessionData: Array<any>;

  fromTimestamp: Object;

  authorize(clientKey) {
    let authData = {
      client_id: clientKey,
      scope: this.scopes,
      immediate: false
    };

    (<any> window).gapi.auth.authorize(authData, (response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        this.fetchData();
      }
    });
  }

  fetchData() {
    (<any> window).gapi.client.load('analytics', 'v3')
      .then(() => {
        (<any> window).gapi.client.analytics.data.ga.get({
          'ids': 'ga:' + this.profileId,
          'start-date': '30daysAgo',
          'end-date': 'today',
          'dimensions': 'ga:day',
          'metrics': 'ga:sessions'
        })
          .then((response) => {
            this.sessionData = [1, 2, 3, 4, 5];
            console.log(this.sessionData);
          })
          .then(null, function(err) {
            // Log any errors.
            console.log(err);
          })
      });
  }

  constructor(@Inject('client key') private clientKey: String,
              @Inject('profile id') private profileId: number,
              ele: ElementRef) {
    this.fromTimestamp = moment().subtract(30, "days");

    (<any> window).authorize = this.authorize.bind(this, clientKey);
    this.scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
    this.elementRef = ele;

    this.sessionData = [];
  }

  ngAfterViewInit() {
    // Append a script tag, which loads the GA client
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://apis.google.com/js/client.js?onload=authorize';
    this.elementRef.nativeElement.appendChild(s);
  }
}
