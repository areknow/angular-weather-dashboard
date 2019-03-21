import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public coreService: CoreService) { }

  ngOnInit() { }

  closeModal() {
    this.coreService.modalIsOpen = false;
  }


}
