import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Event } from '../../models/event.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';
import { EventService } from '../../providers/event/event.service';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Ambient } from '../../models/ambient.model';
import { AmbientService } from '../../providers/ambient/ambient.service';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: FirebaseListObservable<Event[]>;
  inAddEvent: boolean = false;
  form: FormGroup;
  event: Event = new Event();
  currentUser: User;
  ambients: Ambient[];
  cdAmbient: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public eventService: EventService,
    public ambientService: AmbientService,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.events = this.eventService.getAll();
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    })
    this.ambientService.getAll().subscribe((ambients: Ambient[]) => {
      this.ambients = ambients;
    })
  }

  addEvent(): void {
    this.inAddEvent = true;
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.event.$key],
      name: [this.event.name, Validators.required],
      description: [this.event.description, Validators.required],
      ambient: [this.cdAmbient, Validators.required],
      dtEvento: [this.event.dtEvento, Validators.required],
      hrEvento: [this.event.hrEvento, Validators.required],
      author: [this.currentUser]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.inserirEvento();
    }
  }

  inserirEvento() {
    this.ambientService.get(this.form.value.ambient)
      .subscribe((ambient: Ambient) => {
        console.log(this.form.value.dtEvento);
        console.log(ambient.dtReserva || 'Não há uma data agendada ainda');
        if (ambient.dtReserva != this.form.value.dtEvento) {
          ambient.dtReserva = this.form.value.dtEvento;
          this.ambientService.af.database.object(`/ambients/${this.form.value.ambient}`)
            .set(ambient);
          this.form.value.ambient = ambient;
          this.eventService.create(this.form.value)
            .then(() => {
              this.toastCtrl.create({ message: "Evento adicionado com sucesso", showCloseButton: true, duration: 3000 }).present();
              this.inAddEvent = false;
              this.event = new Event();

            }).catch((error: Error) => {
              this.toastCtrl.create({ message: "Ocorreu um erro ao salvar o evento: " + error.message, showCloseButton: true, duration: 3000 }).present();
            })
        } else {
          this.toastCtrl.create({message: "Já há um evento agendado para esta data.", showCloseButton: true, duration: 3000}).present();
          return;
        }
      }).unsubscribe();
  }

}
