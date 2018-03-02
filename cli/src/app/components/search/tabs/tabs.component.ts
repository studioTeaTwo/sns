import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  }
}
