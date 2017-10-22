import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'roundOffDate'
})
export class RoundOffDatePipe implements PipeTransform {

  transform(value: string): string {
    const nowDate = moment();
    const sendDate = moment(value);
    return this.formatToDisplay(nowDate, sendDate);
  }

  private formatToDisplay(nowDate: moment.Moment, sendDate: moment.Moment): string {
    const diffDay = nowDate.diff(sendDate, 'days', false);
    switch (diffDay) {
      case 0:
        return moment(sendDate).format('H:mm');
      case 1:
        return '昨日';
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return diffDay + '日前';
      case 7:
        return '1週間前';
      default:
        return moment(sendDate).format('M/D');
    }
  }

}
