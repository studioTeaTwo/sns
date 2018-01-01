import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export enum DisplayState {
  HEALTH,
  PICTURE,
  BACK,
}

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {
  readonly DisplayState = DisplayState;
  displayState: DisplayState;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.displayState = DisplayState.HEALTH;
  }

  onCompleted(displayState: DisplayState) {
    if (displayState === DisplayState.BACK) {
      this.router.navigate(['/home']);
      return;
    }
    this.displayState = displayState;
  }
}
