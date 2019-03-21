import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../components/card/card.module';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  declarations: [ModalComponent],
  exports: [ModalComponent]
})
export class ModalModule { }
