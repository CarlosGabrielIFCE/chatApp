import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<any>;

  constructor(public navCtrl: NavController,
              public userService: UserService) {

  }

  onSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
    this.users = this.userService.getAll();
  }

  onChatCreate(user): void {
    console.log(user);
  }

}
