import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AppConstant } from 'src/app/constants/app.constants';
import { HeaderModel } from 'src/app/models/header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() headerModel: HeaderModel;

  constructor(
    private _modalCtrl: ModalController,
    private _navCtrl: NavController
  ) { }

  ngOnInit() { }

  dismissComp() {
    this._modalCtrl.dismiss(null, AppConstant.CANCEL_MODAL);
  }

  backButton() {
    this._navCtrl.pop();
  }

}
