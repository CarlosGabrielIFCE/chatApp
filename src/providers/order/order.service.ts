import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Order } from '../../models/order.model';

@Injectable()
export class OrderService extends BaseService {

  constructor(public af: AngularFire) {
    super();
  }

  create(order: Order ): firebase.Promise<void> {
    if (order.$key) {
      return this.af.database.list('/orders')
        .update(order.$key, { order })
        .then(() => console.log("Encomenda atualizada com sucesso"))
        .catch((e) => console.log(e));
    } else {
      return this.af.database.list('/orders')
        .push(order)
        .then(() => console.log("Encomenda adicionado com sucesso")
        )
    }
  }

  get(orderId: string): FirebaseObjectObservable<Order> {
    return <FirebaseObjectObservable<Order>>this.af.database.object(`/orders/${orderId}`)
      .catch(this.handleObservableError);
  }

  getAll(): FirebaseListObservable<Order[]> {
    return <FirebaseListObservable<Order[]>>this.af.database.list('/orders', {
      query: {
        orderByChild: 'name'
      }
    }).catch(this.handleObservableError);
  }

  delete(orderId: string): firebase.Promise<void> {
    return this.af.database.list(`/orders`).remove(orderId)
      .catch(this.handlePromiseError);
  }

}
