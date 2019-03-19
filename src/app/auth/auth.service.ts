import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;
  authResponse: any;
  returnUrl: string;
  uuid: string;

  collection: AngularFirestoreCollection<any>;

  constructor(
    public af: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) {
    this.collection = this.afs.collection<any>('users');
  }

  async doGoogleLogin() {
    this.authResponse = await new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.af.auth
      .signInWithPopup(provider)
      .then(res => resolve(res))
      .catch(err => reject(err));
    });

    console.log(this.authResponse.user);

    if (this.authResponse.user.emailVerified) {
      this.authenticated = true;
      this.router.navigate(['/', this.returnUrl]);
      this.collection.doc(this.authResponse.user.uid).set({
        name: this.authResponse.user.displayName,
        email: this.authResponse.user.email
      })
      .catch((error) => console.log(error));
    } else {
      this.authenticated = false;
    }
  }
}
