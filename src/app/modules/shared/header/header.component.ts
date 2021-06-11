import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { HeaderModel } from 'src/app/models/header.model';
import { LoggerService } from 'src/app/services/util/logger/logger.service';
import { ModalUtilService } from 'src/app/services/util/modal/modal-util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() headerModel: HeaderModel;

  constructor(
    private _navCtrl: NavController,
    private _modalSerice: ModalUtilService
  ) { }

  ngOnInit() { }

  dismissComp() {
    this._modalSerice.dismissPresentModal(null, AppConstant.CANCEL_MODAL);
  }

  async backButton() {
    const result = await this._modalSerice.isModalPresent();
    if (result !== undefined) {
      this.dismissComp();
    } else {
      this._navCtrl.back();
    }
  }

}
