import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;
  authResponse: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  async doGoogleLogin() {
    this.authResponse = await new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
    });

    if (this.authResponse.user.emailVerified) {
      this.authenticated = true;
      this.router.navigate(['/']);
    } else {
      this.authenticated = false;
    }
  }
}
