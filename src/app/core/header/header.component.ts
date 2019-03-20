import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userImg: string;

  constructor(
    private cookieService: CookieService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.userImg = this.cookieService.get('WD_PIMG');
  }

}
