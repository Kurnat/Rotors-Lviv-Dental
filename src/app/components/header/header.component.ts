import { AuthLoginService } from './../../shared/services/admin-login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public shopBadge = 0;
  public isAdmin: boolean;

  constructor(public authLoginService: AuthLoginService) { }

  ngOnInit(): void {
    this.authLoginService.isAuthenticated().then((result: boolean) => {
      console.log(result);
      this.isAdmin = result;
    });
  }
}
