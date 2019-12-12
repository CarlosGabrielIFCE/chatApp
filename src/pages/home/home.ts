import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../models/user.model';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;

  constructor(public navCtrl: NavController,
              public userService: UserService) {

  }

  onSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
     this.users = this.userService.users;
  }

  onChatCreate(user): void {
    console.log(user);
  }

}
