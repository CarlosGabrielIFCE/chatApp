import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Event } from '../../models/event.model';

@Injectable()
export class EventService extends BaseService{
  constructor(public af: AngularFire) {
    super();
  }

  create(event: Event ): firebase.Promise<void> {
    if (event.$key) {
      return this.af.database.list('/events')
        .update(event.$key, { event })
        .then(() => console.log("Evento atualizado com sucesso"))
        .catch((e) => console.log(e));
    } else {
      return this.af.database.list('/events')
        .push(event)
        .then(() => console.log("Evento adicionado com sucesso")
        )
    }
  }

  get(eventId: string): FirebaseObjectObservable<Event> {
    return <FirebaseObjectObservable<Event>>this.af.database.object(`/events${eventId}`)
      .catch(this.handleObservableError);
  }

  getAll(): FirebaseListObservable<Event[]> {
    return <FirebaseListObservable<Event[]>>this.af.database.list('/events', {
      query: {
        orderByChild: 'name'
      }
    }).catch(this.handleObservableError);
  }

  delete(occurenceId: string): firebase.Promise<void> {
    return this.af.database.list(`/events`).remove(occurenceId)
      .catch(this.handlePromiseError);
  }
}
