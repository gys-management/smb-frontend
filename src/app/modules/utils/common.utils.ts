import { Subscription } from 'rxjs';
import * as moment from 'moment';
export class CommonUtils {

  static unSubcribe(subscriptionList: Subscription[]): void {
    subscriptionList.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  static getCurrentDateWithMomentFormat(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  static formatToShortStringDate(date: Date) {
    return moment(date).format('ll');
  }
}
