import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    public afAuth: AngularFireAuth,
    private _platform: Platform,
    private _google: GooglePlus,
  ) { }

  // Sign in with Google
  googleAuth() {
    if (this._platform.is('pwa') || this._platform.is('mobileweb') || this._platform.is('desktop')) {
      return this.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else if (this._platform.is('android')) {
      return this.nativeGoogleLogin();
    } else {
      return this.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  async nativeGoogleLogin() {
    const params = {
      webClientId: environment.googlWebClientId,
      offline: true
    };

    return await this._google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response;
        const success = this.onLoginSuccess(idToken, accessToken);
        return success;
      }).catch((error) => {
        // console.log(error);
        alert('error:' + JSON.stringify(error));
        return error;
      });
  }

  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    return this.afAuth.signInWithCredential(credential);
  }

  twitterAuth() {
    return this.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  gitHubAuth() {
    return this.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  // Auth logic to run auth providers
  async signInWithPopup(provider) {
    await this.afAuth.signOut();
    return await this.afAuth.signInWithPopup(provider);
    // .then((result) => {
    //   // console.log('You have been successfully logged in!');
    //   return result;
    // }).catch((error) => {
    //   console.log(error);
    //   return error;
    // });
  }

  signOut() {
    this.afAuth.signOut()
      .then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
  }
}


