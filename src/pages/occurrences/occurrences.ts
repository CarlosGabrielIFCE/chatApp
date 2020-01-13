import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Occurrence } from '../../models/occurrence.model';
import { AuthService } from '../../providers/auth/auth.service';
import { OccurrenceService } from '../../providers/occurrence/occurrences.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';

@IonicPage()
@Component({
  selector: 'page-occurrences',
  templateUrl: 'occurrences.html',
})
export class OccurrencesPage {

  occurrences: FirebaseListObservable<Occurrence[]>;
  inAddOccurrence: boolean = false;
  form: FormGroup;
  occurrence: Occurrence = new Occurrence();
  currentUser: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public occurrencesService: OccurrenceService,
    public userService: UserService,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.occurrences = this.occurrencesService.occurrences;
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    })
  }

  addOccurrence(): void {
    this.inAddOccurrence = true;
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.occurrence.$key],
      name: [this.occurrence.name, Validators.required],
      description: [this.occurrence.description, Validators.required],
      dtOcorrencia: [this.occurrence.dtOcorrencia, Validators.required],
      hrOcorrencia: [this.occurrence.hrOcorrencia, Validators.required],
      author: [this.currentUser]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.occurrencesService.create(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: "Ocorrência adicionada com sucesso", showCloseButton: true, duration: 3000 }).present();
          this.inAddOccurrence = false;
          this.occurrence = new Occurrence();

        }).catch((error: Error) => {
          this.toastCtrl.create({ message: "Ocorreu um erro ao salvar a ocorrência: " + error.message, showCloseButton: true, duration: 3000 }).present();
        })
    }
  }

  filterItems(event: any): void {
    let searchTerm: string = event.target.value;

    this.occurrences = this.occurrencesService.occurrences;

    if (searchTerm) {
      this.occurrences = <FirebaseListObservable<Occurrence[]>>this.occurrences
        .map((occurrence: Occurrence[]) => {
          return occurrence.filter((occurrence: Occurrence) => {
            return (occurrence.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          })
        })
    }
  }

}
