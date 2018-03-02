import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export enum DisplayState {
  NAME,
  TYPE,
  SYMPTOM,
  EMAIL,
  GOAL,
  BACK,
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  readonly DisplayState = DisplayState;
  displayState: DisplayState;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    ga('send', 'event', 'Signup', 'start');
    this.displayState = DisplayState.NAME;
  }

  onCompleted(displayState: DisplayState) {
    if (displayState === DisplayState.BACK) {
      ga('send', 'event', 'Signup', 'end');
      this.router.navigate(['/home']);
      return;
    }
    this.displayState = displayState;
  }
}
