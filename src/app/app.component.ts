import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'JammIn';
  isLoginPage = true;
  constructor(private router: Router) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.isLoginPage = e.url.includes('login');
      }
    });
  }
}
