import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient, public auth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}) {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}
