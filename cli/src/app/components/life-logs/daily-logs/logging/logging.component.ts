import { Component, OnInit } from '@angular/core';

enum DisplayState {
  HEALTH,
  PICTURE,
}

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {
  readonly DisplayState = DisplayState;
  displayState: DisplayState;

  constructor() { }

  ngOnInit() {
    this.displayState = DisplayState.HEALTH;
  }

  onCompleted(displayState) {
    this.displayState = displayState;
  }
}
