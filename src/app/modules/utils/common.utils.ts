import { Subscription } from 'rxjs';

export class CommonUtils {

  static unSubcribe(subscriptionList: Subscription[]): void {
    subscriptionList.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
