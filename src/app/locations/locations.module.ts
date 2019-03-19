import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';

@NgModule({
  imports: [
    CommonModule,
    LocationsRoutingModule
  ],
  declarations: [LocationsComponent]
})
export class LocationsModule { }
