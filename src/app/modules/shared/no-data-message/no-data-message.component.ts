import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { LoggerService } from 'src/app/services/util/logger/logger.service';

@Component({
  selector: 'app-no-data-message',
  templateUrl: './no-data-message.component.html',
  styleUrls: ['./no-data-message.component.scss'],
})
export class NoDataMessageComponent implements OnInit {
  @Input() displayData = 0;

  isNoData = false;

  constructor(
    private _loggerServie: LoggerService
  ) { }

  ngOnInit() {
    if (this.displayData === 0) {
      this.isNoData = true;
    } else {
      this.isNoData = false;
    }
    this._loggerServie.debug(`NoDataMessageComponent :: displayData - :: ${this.displayData}`);
  }

}
