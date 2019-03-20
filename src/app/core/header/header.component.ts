import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { AuthService } from 'src/app/auth/auth.service';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userImg: string;
  location: string;
  response = [];

  constructor(
    private cookieService: CookieService,
    public authService: AuthService,
    private coreService: CoreService
  ) { }

  ngOnInit() {
    this.userImg = this.cookieService.get('WD_PIMG');
  }

  async submitForm(query: string): Promise<void> {
    try {
      this.response = await this.coreService.getLocations(query);
    } catch (err) {
      console.log(err);
    }
  }

  closeResponse() {
    this.location = '';
    this.response = [];
  }

  selectLocation(item) {
    this.coreService.activeLocation = item;
    console.log(this.coreService.activeLocation);
    this.closeResponse();
  }

}
