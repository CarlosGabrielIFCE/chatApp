import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user.service';
import { AuthService } from '../../providers/auth/auth.service';
import { FirebaseAuthState } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {
  signupForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      uid: [],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      cdPerfil: ['', Validators.required]
    })
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    this.userService.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {

        if (!userExists) {
          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          })
            .then((authState: FirebaseAuthState) => {

              delete formUser.password;
              let uuid: string = authState.auth.uid;

              this.userService.create(formUser, uuid)
                .then(() => {
                  console.log("Usuário Cadastrado");
                  this.toastCtrl.create({message: "Usuário cadastrado com sucesso.", duration: 3000}).present();
                  loading.dismiss();
                })
                .catch((error: any) => {
                  console.log(error);
                  loading.dismiss();
                  this.showAlert(error);
                })

            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            })
        } else {
          this.showAlert(`O Username ${username} já está sendo usado em outra conta.`);
          loading.dismiss();
        }

      });
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
