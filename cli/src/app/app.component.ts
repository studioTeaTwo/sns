import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private currentLocation;

  constructor(
    private location: Location,
  ) {
    this.currentLocation = location;
  }

  isDisplayHeader() {
    return !this.currentLocation.path().match(/(signup|chat)/);
  }

  isLogin() {
    return localStorage.getItem('allergylog');
  }
}
