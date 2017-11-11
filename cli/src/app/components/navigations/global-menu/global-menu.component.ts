import { Component, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-global-menu',
  templateUrl: './global-menu.component.html',
  styleUrls: ['./global-menu.component.scss']
})
export class GlobalMenuComponent implements OnInit {

  constructor(
    private location: Location,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
  }

  isDisplay() {
    return !this.location.path().match(/(signup|chat+\/[0-9-]|life-log\/daily\/logging)/);
  }

  sound() {
    const soundfile = this.renderer.selectRootElement('#soundclick') as HTMLAudioElement;
    soundfile.play();
  }
}
