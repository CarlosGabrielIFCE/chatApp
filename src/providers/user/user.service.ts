import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  PATH: string = `/users`

  constructor(public http: HttpClient, public af: AngularFireDatabase) {
  }

  getAll() {
    return this.af.list(this.PATH, ref => ref.orderByChild('name'))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
  }

  create(user: User) {
    return this.af.list(this.PATH)
      .push(user);
  }

}
