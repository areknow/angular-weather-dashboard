import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../shared/components/card/card.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
