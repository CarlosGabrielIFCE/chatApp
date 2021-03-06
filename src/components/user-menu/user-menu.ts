import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserProfilePage } from '../../pages/user-profile/user-profile';
import { OccurrencesPage } from '../../pages/occurrences/occurrences';
import { AmbientsPage } from '../../pages/ambients/ambients';
import { EventsPage } from '../../pages/events/events';
import { OrdersPage } from '../../pages/orders/orders';
import { UserRegisterPage } from '../../pages/user-register/user-register';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;

  constructor(public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void {
    this.navCtrl.push(UserProfilePage)
  }

  onOccurrences(): void {
    this.navCtrl.push(OccurrencesPage);
  }

  onAmbients(): void {
    this.navCtrl.push(AmbientsPage);
  }

  onEvents(): void {
    this.navCtrl.push(EventsPage);
  }

  onOrders(): void {
    this.navCtrl.push(OrdersPage);
  }

  onUserRegister(): void {
    this.navCtrl.push(UserRegisterPage);
  }

}
