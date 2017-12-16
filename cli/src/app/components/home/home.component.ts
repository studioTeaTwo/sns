import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  experienceDataSource = new ExperienceDataSource();
  experienceColumns = ['date', 'activity'];

  constructor() { }

  ngOnInit() {
  }
}

const data = [
  {date: '11/15', name: 'とたたけ', activity: '治療日記を付けました！'},
];

export class ExperienceDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return Observable.of(data);
  }

  disconnect() {}
}
