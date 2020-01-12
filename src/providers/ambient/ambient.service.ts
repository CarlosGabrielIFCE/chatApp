import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Ambient } from '../../models/ambient.model';
import { BaseService } from '../base/base.service';

@Injectable()
export class AmbientService extends BaseService{

  constructor(public af: AngularFire) {
    super();
  }

  create(ambient: Ambient ): firebase.Promise<void> {
    if (ambient.$key) {
      return this.af.database.list('/ambients')
        .update(ambient.$key, { ambient })
        .then(() => console.log("Ambiente atualizado com sucesso"))
        .catch((e) => console.log(e));
    } else {
      return this.af.database.list('/ambients')
        .push(ambient)
        .then(() => console.log("Ambiente adicionado com sucesso")
        )
    }
  }

  get(ambientId: string): FirebaseObjectObservable<Ambient> {
    return <FirebaseObjectObservable<Ambient>>this.af.database.object(`/ambients/${ambientId}`)
      .catch(this.handleObservableError);
  }

  getAll(): FirebaseListObservable<Ambient[]> {
    return <FirebaseListObservable<Ambient[]>>this.af.database.list('/ambients', {
      query: {
        orderByChild: 'name'
      }
    }).catch(this.handleObservableError);
  }

  delete(occurenceId: string): firebase.Promise<void> {
    return this.af.database.list(`/ambients`).remove(occurenceId)
      .catch(this.handlePromiseError);
  }

}
