import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public authService: AuthService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
                let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

                this.signinForm = this.formBuilder.group({
                  password: ['', [Validators.required, Validators.minLength(6)]],
                  email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.authService.signWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        if (isLogged) {
          this.navCtrl.setRoot(HomePage)
          loading.dismiss();
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      })
    
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Aguarde um momento..."
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ["Ok"]
    }).present();
  }

  onHomePage(): void {
    this.navCtrl.push(HomePage)
      .then((hasAccess: boolean) => {
        console.log('Autorizado: ', hasAccess);
      }).catch((error) => {
        console.log("Não autorizado: ", error);
      })
  }

  onLogout(): void {
    this.authService.logout();
  }

}