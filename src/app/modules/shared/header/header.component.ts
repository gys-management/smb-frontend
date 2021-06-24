import { Component, Input, OnInit } from '@angular/core';
import { HeaderModel } from 'src/app/models/header.model';
import { CustomBackButtonService } from 'src/app/services/util/backButton/custom-back-button.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() headerModel: HeaderModel;

  constructor(
    private _customBackButton: CustomBackButtonService
  ) { }

  ngOnInit() { }

  dismissComp() {
    // this._modalSerice.dismissPresentModal(null, AppConstant.CANCEL_MODAL);
    this._customBackButton.dismissComp();
  }

  async backButton() {
    // const result = await this._modalSerice.isModalPresent();
    // if (result !== undefined) {
    //   this.dismissComp();
    // } else {
    //   const value = this._navCtrl.back();
    //   if (value !== undefined) {
    //     this._navCtrl.back();
    //   } else {
    //     this._navCtrl.navigateBack(this.headerModel.defaultRoutingUrl);
    //   }
    // }
    this._customBackButton.backButton();
  }

}
