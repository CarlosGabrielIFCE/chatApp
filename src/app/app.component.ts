import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../models/user.model';
import { AuthService } from '../providers/auth/auth.service';
import { UserService } from '../providers/user/user.service';
import { FirebaseAuthState } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'SigninPage';
  currentUser: User;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authService: AuthService,
    userService: UserService) {


    authService.auth
      .subscribe((authState: FirebaseAuthState) => {

        if (authState) {
          userService.currentUser
            .subscribe((user: User) => {
              this.currentUser = user;
            })
        }

      })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

