import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router
    ) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-left';
  }

  exibirNavbar() {
    return this.router.url !== '/login';
  }
}
