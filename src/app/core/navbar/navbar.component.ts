import { Component } from '@angular/core';
import { AuthService } from 'app/seguranca/auth.service';
import { LogoutService } from 'app/seguranca/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  display;
  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private router: Router
    ) { }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
  }

}
