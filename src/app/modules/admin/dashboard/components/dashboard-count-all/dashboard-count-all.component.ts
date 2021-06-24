import { Component, OnInit } from '@angular/core';
import { DashboardCounts } from 'src/app/models/dashboard.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoggerService } from 'src/app/services/util/logger/logger.service';

@Component({
  selector: 'app-dashboard-count-all',
  templateUrl: './dashboard-count-all.component.html',
  styleUrls: ['./dashboard-count-all.component.scss'],
})
export class DashboardCountAllComponent implements OnInit {

  count: DashboardCounts;

  constructor(
    private _dashboardServie: DashboardService,
  ) { }

  async ngOnInit() {
    await this.fetchOverAllCount();
  }

  async fetchOverAllCount() {
    this.count = await this._dashboardServie.getDashboardOverAllCount();
    LoggerService.debug(`fetchOverAllCount :: response  ::`, this.count);
  }


}
