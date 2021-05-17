import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IonSearchbar, NavController } from '@ionic/angular';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { UrlConstant } from 'src/app/constants/url.constants';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';
import { ActionSheetUtilService } from 'src/app/services/util/actionSheet/action-sheet-util.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('mySearchBar', { static: true }) searchbar: IonSearchbar;

  staffDataSource: MatTableDataSource<Staff>;
  resultsLength = 0;
  isLoadingResults = false;

  columnsToDisplay: string[] = ['staffLoginId', 'firstName', 'primaryPhoneNumber', 'action'];

  constructor(
    private _staffService: StaffService,
    private _navCtrl: NavController,
    private _actionService: ActionSheetUtilService
  ) { }

  async ngOnInit() {
    this.fetchAllStaff();
  }

  async presentActionSheet(element: Staff) {
    const actionSheet = await this._actionService.presentActionSheet({
      header: 'Action',
      buttons: [
        {
          text: 'View Staff',
          icon: 'person-outline',
          cssClass: 'action-sheet-secondary',
          handler: () => {
            this.onView(element.id);
          }
        },
        {
          text: 'Edit',
          icon: 'create-outline',
          cssClass: 'action-sheet-primary',
          handler: () => {
            this._navCtrl.navigateForward(
              UrlConstant.URL_ADMIN_STAFF + UrlConstant.URL_EDIT + '/' + element.id,
              { skipLocationChange: true }
            );
          },
        },
        // {
        //   text: 'Delete',
        //   role: 'destructive',
        //   icon: 'trash',
        //   handler: () => {
        //     this.deleteAlert(element.id);
        //   }
        // },
        {
          text: 'Close',
          icon: 'close',
          cssClass: 'action-sheet-danger',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
  }

  onAdd() {
    this._navCtrl.navigateForward(
      UrlConstant.URL_ADMIN_STAFF + UrlConstant.URL_ADD,
      // { skipLocationChange: true }
    );
  }

  onView(id: string) {
    this._navCtrl.navigateForward(
      `${UrlConstant.URL_ADMIN_STAFF}/${id}`,
      // { skipLocationChange: true }
    );
  }


  private async fetchAllStaff() {
    this.isLoadingResults = true;

    try {
      const staffList: Staff[] = await this._staffService.getStaffAll();

      this.staffDataSource = new MatTableDataSource(staffList);
      this.resultsLength = staffList.length;
      this.isLoadingResults = false;
    } catch {
      this.isLoadingResults = false;
    }
  }
}

