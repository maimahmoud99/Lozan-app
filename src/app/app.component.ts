import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lozan-App';

  constructor(public router: Router) {}

  shouldShowLayout(): boolean {
    const hiddenRoutes = ['/ActivationGuratee']; // customize this
    return !hiddenRoutes.includes(this.router.url);
  }
}
