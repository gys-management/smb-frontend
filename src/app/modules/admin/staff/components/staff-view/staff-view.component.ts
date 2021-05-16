import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Status } from 'src/app/enum/status.enum';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.scss'],
})
export class StaffViewComponent implements OnInit, AfterViewInit {

  staffDetail: Staff;
  status: Status;

  whatsappURL: string;
  phoneURL: string;


  constructor(
    private _staffService: StaffService,
    private _activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    const actived = await this._activatedRoute.paramMap.pipe(take(1)).toPromise();
    const staffId = actived.get('id');
    await this.staffDetailById(staffId);
  }

  async ngAfterViewInit() {
    // const actived = await this._activatedRoute.paramMap.pipe(take(1)).toPromise();
    // const staffId = actived.get('id');
    // await this.staffDetailById(staffId);
  }

  async staffDetailById(id: string) {
    this.staffDetail = await this._staffService.getStaffById(id);
    this.whatsappURL = `https://wa.me/91${this.staffDetail.primaryPhoneNumber}`;
    this.phoneURL = `tel:+91${this.staffDetail.primaryPhoneNumber}`;
  }

}
