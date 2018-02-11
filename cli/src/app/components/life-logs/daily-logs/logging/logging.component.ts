import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { DailyLogService } from 'app/core/services/api';

export enum DisplayState {
  HEALTH,
  MEDICINA,
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
    this.route.paramMap.pipe(take(1)).subscribe(paramMap =>
      this.dailyLogService.dailyLogParam.symptom = paramMap.get('id')
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
