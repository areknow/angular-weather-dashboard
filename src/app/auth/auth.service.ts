import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authResponse: any;
  returnUrl = '/';
  uuid: string;

  collection: AngularFirestoreCollection<any>;

  date = new Date();

  /**
   * Constructor
   * @param af: angular fire auth
   * @param router
   * @param afs: angular fire store
   * @param cookieService: browser cookie store
   */
  constructor(
    public af: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private cookieService: CookieService
  ) {
    // Initiate fire store collection holder
    this.collection = this.afs.collection<any>('users');
    // Add time to cookie date object
    this.date.setHours(this.date.getHours() + 12);
  }

  /**
   * Google authentication logic
   */
  async doGoogleLogin() {
    // Await response from google auth
    this.authResponse = await new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.af.auth
      .signInWithPopup(provider)
      .then(res => resolve(res))
      .catch(err => reject(err));
    });
    console.log(this.authResponse);
    // Check if response has authorized user
    if (this.authResponse.user.emailVerified) {
      // Navigate back to page that auth guard triggered on
      this.router.navigate(['/', this.returnUrl]);
      // Set the user cookie with expiration
      this.cookieService.put('WD_GUID', this.authResponse.user.uid, { expires: this.date });
      this.cookieService.put('WD_PIMG', this.authResponse.additionalUserInfo.profile.picture, { expires: this.date });
      // Set user records in firebase
      this.collection.doc(this.authResponse.user.uid).set({
        name: this.authResponse.user.displayName,
        email: this.authResponse.user.email
      })
      .catch((error) => console.log(error));
    }
  }
}
