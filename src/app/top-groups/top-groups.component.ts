import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-top-groups',
  templateUrl: './top-groups.component.html',
  styles: []
})
export class TopGroupsComponent implements OnInit {

  constructor(@Inject('groups') private groups) {
  }

  ngOnInit() {
  }

}
