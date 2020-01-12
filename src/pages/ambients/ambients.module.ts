import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmbientsPage } from './ambients';

@NgModule({
  declarations: [
    AmbientsPage,
  ],
  imports: [
    IonicPageModule.forChild(AmbientsPage),
  ],
})
export class AmbientsPageModule {}
