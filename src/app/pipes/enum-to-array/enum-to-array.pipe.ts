import { Pipe, PipeTransform } from '@angular/core';
import { LoggerService } from 'src/app/services/util/logger/logger.service';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  constructor() { }

  transform(value: Record<string, string>, ...args: any[]): any {
    return Object.entries(value).map((valueResult) => ({
      key: valueResult[0],
      value: valueResult[1].charAt(0).toUpperCase() + valueResult[1].slice(1).toLowerCase()
    }));
  }

}
