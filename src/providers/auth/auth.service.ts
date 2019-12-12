import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';

import { BaseService } from '../base/base.service';

@Injectable()
export class AuthService extends BaseService{

  constructor(public http: HttpClient, public auth: AngularFireAuth) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState> {
    return this.auth.createUser(user)
      .catch(this.handlePromiseError);
  }

}
