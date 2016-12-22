import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  template: `
<li>
{{ group }}
</li>
  `,
  styles: []
})
export class GroupComponent implements OnInit {

  @Input() group;

  constructor() {
  }

  ngOnInit() {
  }

}
