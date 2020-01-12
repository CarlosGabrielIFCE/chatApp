import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';
import { FirebaseListObservable } from 'angularfire2';
import { Ambient } from '../../models/ambient.model';
import { AmbientService } from '../../providers/ambient/ambient.service';

@IonicPage()
@Component({
  selector: 'page-ambients',
  templateUrl: 'ambients.html',
})
export class AmbientsPage {

  ambients: FirebaseListObservable<Ambient[]>;
  inAddAmbient: boolean = false;
  form: FormGroup;
  ambient: Ambient = new Ambient();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public authService: AuthService,
              public ambientService: AmbientService,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.ambients = this.ambientService.getAll();
  }

  addAmbient(): void {
    this.inAddAmbient = true;
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.ambient.$key],
      name: [this.ambient.name, Validators.required],
      description: [this.ambient.description, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.ambientService.create(this.form.value)
        .then(() => {
          this.toastCtrl.create({message: "Ocorrência adicionada com sucesso", showCloseButton: true, duration: 3000}).present();
          this.inAddAmbient = false;
          this.ambient = new Ambient();
          
        }).catch((error: Error) => {
          this.toastCtrl.create({message: "Ocorreu um erro ao salvar a ocorrência: " + error.message, showCloseButton: true, duration: 3000}).present();
        })
    }
  }

}
