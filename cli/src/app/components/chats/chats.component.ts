import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  height: number;

  chatList$: any;
  chatList: any;
  loadingChatBack$: any;
  loadingChatForward$: any;

  constructor() {
    this.height = window.innerHeight - (56 + 46 + 50); // header.height + chat.header.height + chat.footer.height
  }

  ngOnInit() {
  }

  isDisplayDate() {}

  isDispalyReply() {}

  isUnread() {}

  getUnreadChat() {}

  handleClickSearch(searchText) {}

  handleClickReply(replyText) {}
}
