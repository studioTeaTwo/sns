import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-global-menu',
  templateUrl: './global-menu.component.html',
  styleUrls: ['./global-menu.component.scss']
})
export class GlobalMenuComponent implements OnInit {
  private currentLocation;

  constructor(
    private location: Location,
  ) {
    this.currentLocation = location;
  }

  ngOnInit() {
  }

  isDisplay() {
    return !this.currentLocation.path().match(/(signup|chat+\/[0-9-]|life-log\/daily\/create)/);
  }

}
