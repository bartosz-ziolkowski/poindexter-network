import { RouterModule, RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import { FooterComponent } from './modules/book/components/layout/footer/footer.component';
import { NavBarComponent } from './modules/book/components/layout/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'poindexter-network-ui';
}
