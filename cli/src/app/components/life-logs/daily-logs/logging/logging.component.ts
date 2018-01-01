import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DailyLogService } from 'app/shared/services/api';

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
    private route: ActivatedRoute,
    private dailyLogService: DailyLogService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.dailyLogService.dailyLogParam.symptom = params['id']
    );

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
