import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatToJapaneseDate'
})
export class FormatToJapaneseDatePipe implements PipeTransform {

  transform(value: any): string {
    moment.locale('ja');
    return moment(value).format('YYYY/MM/DD(ddd)');
  }

}
