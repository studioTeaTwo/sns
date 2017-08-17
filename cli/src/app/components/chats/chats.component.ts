import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatss',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isDispalyReply() {}

  handleClickSearch(searchText) {}

  handleClickReply(replyText) {}
}
