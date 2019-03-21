import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { CardModule } from '../shared/components/card/card.module';
import { ModalModule } from '../shared/modal/modal.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationsService } from './locations.service';

@NgModule({
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CardModule,
    ModalModule,
    MatSnackBarModule,
    SpinnerModule,
    MatSortModule
  ],
  declarations: [LocationsComponent],
  providers: [
    LocationsService,
    HttpClientModule
  ]
})
export class LocationsModule { }
