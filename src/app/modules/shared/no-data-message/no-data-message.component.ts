import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ErrorConstant } from 'src/app/constants/error-constants';
import { LoggerService } from 'src/app/services/util/logger/logger.service';

@Component({
  selector: 'app-no-data-message',
  templateUrl: './no-data-message.component.html',
  styleUrls: ['./no-data-message.component.scss'],
})
export class NoDataMessageComponent implements OnInit {
  @Input() displayData = 0;

  isNoData = false;
  displayMessage = ErrorConstant.NO_DATA_TO_DISPLAY;

  constructor() { }

  ngOnInit() {
    if (this.displayData === 0) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }
    LoggerService.debug(`NoDataMessageComponent :: displayData - :: ${this.displayData}`);
  }

}
