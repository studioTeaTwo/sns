import { Component, OnInit } from '@angular/core';

import { UserService } from 'app/core/services/api';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  onInput(keyword: string) {
    this.userService.searchByName(keyword);
  }
}
