import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
