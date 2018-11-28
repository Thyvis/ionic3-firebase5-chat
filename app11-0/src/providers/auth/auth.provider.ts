import { first } from 'rxjs/operators/first';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseService } from '../../services/base.service';

@Injectable()
export class AuthProvider extends BaseService {

  constructor(
    public afAuth: AngularFireAuth
    //public http: HttpClient
  ) {
    super();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .authState
        .pipe(first())
        .subscribe((authUser: firebase.User) => {
          /* if (authUser) {
            resolve(true);
          } else {
            reject(false);
          } */
          //Ou
          (authUser) ? resolve(true) : reject(false);
        });

    });
  }

  createAuthUser(user: {email: string, password: string}) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  //logout(): Promise<void> {
  logOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }



  signinWithEmailAndPassword(user: {email: string, password: string}): Promise<boolean> {
  //signinWithEmail(user: {email: string, password: string}): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authState) => {
        return authState != null;
      })
      .catch(this.handlePromiseError);
  }



}
