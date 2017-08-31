import { Component, OnInit } from '@angular/core';

enum DisplayState {
  NAME,
  SYMPTOM,
  EMAIL,
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  readonly DisplayState = DisplayState;
  displayState: DisplayState;

  constructor() { }

  ngOnInit() {
    this.displayState = DisplayState.NAME;
  }

  onCompleted(displayState) {
    this.displayState = displayState;
  }
}
