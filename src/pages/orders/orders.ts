import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { Order } from '../../models/order.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';
import { OrderService } from '../../providers/order/order.service';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: FirebaseListObservable<Order[]>;
  inAddOrder: boolean = false;
  form: FormGroup;
  order: Order = new Order();
  cdUser: string;
  users: User[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public authService: AuthService,
              public orderService: OrderService,
              public userService: UserService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.orders = this.orderService.getAll();
    this.userService.af.database.list("/users")
      .subscribe((users: User[]) => {
        this.users = users;
      })
  }

  addOrder(): void {
    this.inAddOrder = true;
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.order.$key],
      name: [this.order.name, Validators.required],
      status: [this.order.status, Validators.required],
      destinatary: [this.cdUser, Validators.required],
      description: [this.order.description],
      lastModified: new Date().toString()
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.get(this.form.value.destinatary)
        .subscribe((user: User) => {
          this.form.value.destinatary = user;
        })
      this.orderService.create(this.form.value)
        .then(() => {
          this.toastCtrl.create({message: "Encomenda adicionada com sucesso", showCloseButton: true, duration: 3000}).present();
          this.inAddOrder = false;
          this.order = new Order();
          
        }).catch((error: Error) => {
          this.toastCtrl.create({message: "Ocorreu um erro ao salvar a Encomenda: " + error.message, showCloseButton: true, duration: 3000}).present();
        })
    }
  }
}
