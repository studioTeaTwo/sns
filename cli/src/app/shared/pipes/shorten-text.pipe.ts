import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, limitNumber: number): any {
    let val = '';
    let sum = 0;
    for (let i = 0, len = value.length; i < len; i++) {
      if (value.charCodeAt(i) < 256) {
        sum += 1;
      } else {
        sum += 2;
      }
      if (sum <= limitNumber) { val += value.charAt(i); }
    }
    // 三点リーダーを表示する
    if (sum > limitNumber) { val += '...'; };
    return val;
  }

}
