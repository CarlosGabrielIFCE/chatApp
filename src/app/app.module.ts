import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { UserService } from '../providers/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../providers/auth/auth.service';

import { FirebaseAppConfig } from 'angularfire2';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { ChatPage } from '../pages/chat/chat';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from '../providers/message/message.service';
import { MessageBoxComponent } from '../components/message-box/message-box';
import { UserInfoComponent } from '../components/user-info/user-info';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { OccurrenceService } from '../providers/occurrence/occurrences.service';
import { OccurrencesPage } from '../pages/occurrences/occurrences';
import { AmbientService } from '../providers/ambient/ambient.service';
import { AmbientsPage } from '../pages/ambients/ambients';
import { EventService } from '../providers/event/event.service';
import { EventsPage } from '../pages/events/events';
import { OrderService } from '../providers/order/order.service';
import { OrdersPage } from '../pages/orders/orders';
import { UserRegisterPage } from '../pages/user-register/user-register';

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBw4rg6dyo6hLaoM5S-jm_IgWMr-DZkWOk",
  authDomain: "suchachat-f4e0e.firebaseapp.com",
  databaseURL: "https://suchachat-f4e0e.firebaseio.com",
  storageBucket: "suchachat-f4e0e.appspot.com",
  messagingSenderId: "13793012442",
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AmbientsPage,
    ChatPage,
    UserProfilePage,
    OccurrencesPage,
    EventsPage,
    OrdersPage,
    UserRegisterPage,
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    UserProfilePage,
    OccurrencesPage,
    AmbientsPage,
    EventsPage,
    OrdersPage,
    UserRegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    ChatService,
    MessageService,
    OccurrenceService,
    AmbientService,
    AmbientsPage,
    EventService,
    OrderService
  ]
})
export class AppModule {}
