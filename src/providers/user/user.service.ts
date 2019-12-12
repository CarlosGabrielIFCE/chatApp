import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';
import firebase from 'firebase/app';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;

  PATH: string = `/users`

  constructor(public http: HttpClient, public af: AngularFire) {
    super();
    this.users = this.af.database.list(this.PATH);
  }

  create(user: User): firebase.Promise<void> {
    return this.af.database.object(this.PATH + `/${user.uid}`).set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.af.database.list(this.PATH, {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);

  }

}
