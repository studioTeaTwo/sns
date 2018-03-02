import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { PlatformLocation, DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { TipsType, TipsCollection } from 'app/constants/constants';

// TODO: href="#id"での遷移
// https://github.com/angular/angular/blob/master/aio/src/app/shared/scroll.service.ts
@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent implements OnInit {
  readonly TipsType = TipsType;
  readonly TipsCollection = TipsCollection;

  private _topOffset: number | null;
  private _topOfPageElement: Element;

  get topOffset() {
    if (!this._topOffset) {
      const header = this.document.querySelector('.app-header');
      this._topOffset = ((header && header.clientHeight) || 0) + 42; // 42 = header.height
    }
    // tslint:disable-next-line:no-non-null-assertion
    return this._topOffset!;
  }

  get topOfPageElement() {
    if (!this._topOfPageElement) {
      this._topOfPageElement = this.document.getElementById('top-of-page') || this.document.body;
    }
    return this._topOfPageElement;
  }

  constructor(@Inject(DOCUMENT) private document: any, private location: PlatformLocation) {
    // On resize, the toolbar might change height, so "invalidate" the top offset.
    fromEvent(window, 'resize').subscribe(() => (this._topOffset = null));
  }

  ngOnInit() {}

  private scroll() {
    const hash = this.getCurrentHash();
    const element: HTMLElement = hash ? this.document.getElementById(hash) : this.topOfPageElement;
    this.scrollToElement(element);
  }

  /**
   * Scroll to the element.
   * Don't scroll if no element.
   */
  private scrollToElement(element: Element) {
    if (element) {
      element.scrollIntoView();

      if (window && window.scrollBy) {
        // Scroll as much as necessary to align the top of `element` at `topOffset`.
        // (Usually, `.top` will be 0, except for cases where the element cannot be scrolled all the
        //  way to the top, because the viewport is larger than the height of the content after the
        //  element.)
        window.scrollBy(0, element.getBoundingClientRect().top - this.topOffset);

        // If we are very close to the top (<20px), then scroll all the way up.
        // (This can happen if `element` is at the top of the page, but has a small top-margin.)
        if (window.pageYOffset < 20) {
          window.scrollBy(0, -window.pageYOffset);
        }
      }
    }
  }

  /** Scroll to the top of the document. */
  private scrollToTop() {
    this.scrollToElement(this.topOfPageElement);
  }

  private getCurrentHash() {
    return decodeURIComponent(this.location.hash.replace(/^#/, ''));
  }
}
