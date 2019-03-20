import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatTableModule } from '@angular/material';
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
    MatIconModule
  ],
  declarations: [LocationsComponent],
  providers: [
    LocationsService,
    HttpClientModule
  ]
})
export class LocationsModule { }
