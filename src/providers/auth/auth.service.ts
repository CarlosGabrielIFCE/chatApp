import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient, public auth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState> {
    return this.auth.createUser(user);
  }

}
