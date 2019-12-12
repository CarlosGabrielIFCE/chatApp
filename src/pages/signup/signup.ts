import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user.service';
import { AuthService } from '../../providers/auth/auth.service';
import { FirebaseAuthState } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      uid: [],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    })
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;

    this.authService.createAuthUser({
      email: formUser.email,
      password: formUser.password
    })
      .then((authState: FirebaseAuthState) => {

        delete formUser.password;
        formUser.uid = authState.auth.uid;

        this.userService.create(formUser)
          .then(() => {
            console.log("Usuário Cadastrado");
            loading.dismiss();
          })
          .catch((error: Error) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error.message);
          })
          
      }).catch((error: Error) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error.message);
      })
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

}
