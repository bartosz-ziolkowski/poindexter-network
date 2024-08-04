import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { AuthenticationService } from '../../../../../services/services';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../../../services/models/user-response';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  user$: Observable<UserResponse | null>;
  isMobileNavVisible: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.user$ = this.authService.user$;
  }

  showMobileNav() {
    this.isMobileNavVisible = true;
  }

  hideMobileNav() {
    this.isMobileNavVisible = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
