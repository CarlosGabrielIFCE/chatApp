import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Occurrence } from '../../models/occurrence.model';

@Injectable()
export class OccurrenceService extends BaseService {

  constructor(public af: AngularFire) {
    super();
  }


  create(occurrence: Occurrence): firebase.Promise<void> {
    if (occurrence.$key) {
      return this.af.database.list('/occurrences')
        .update(occurrence.$key, { occurrence })
        .then(() => console.log("Cliente atualizado com sucesso"))
        .catch((e) => console.log(e));
    } else {
      return this.af.database.list('/occurrences')
        .push(occurrence)
        .then(() => console.log("Cliente adicionado com sucesso")
        )
    }
  }

  get(occurrenceId: string): FirebaseObjectObservable<Occurrence> {
    return <FirebaseObjectObservable<Occurrence>>this.af.database.object(`/occurrences/${occurrenceId}`)
      .catch(this.handleObservableError);
  }

  getAll(): FirebaseListObservable<Occurrence[]> {
    return <FirebaseListObservable<Occurrence[]>>this.af.database.list('/occurrences', {
      query: {
        orderByChild: 'name'
      }
    }).catch(this.handleObservableError);
  }

  delete(occurenceId: string): firebase.Promise<void> {
    return this.af.database.list(`/occurrences`).remove(occurenceId)
      .catch(this.handlePromiseError);
  }

}
