import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';
import firebase from 'firebase/app';

@Injectable()
export class UserService {

  users: FirebaseListObservable<User[]>;

  PATH: string = `/users`

  constructor(public http: HttpClient, public af: AngularFire) {
    this.users = this.af.database.list(this.PATH);
  }

  create(user: User): firebase.Promise<void> {
    return this.af.database.object(this.PATH + `/${user.uid}`).set(user);
  }

}
