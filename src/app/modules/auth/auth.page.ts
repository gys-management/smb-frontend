import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UrlConstant } from 'src/app/constants/url.constants';
import { AuthService } from 'src/app/services/util/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {
  loginSub: Subscription;
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._router.navigate([UrlConstant.URL_LOGIN]);
  }
  ngOnDestroy() { }
}
