import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AuthenticationRequest } from '../../services/models/authentication-request';
import { AuthenticationService } from '../../services/services/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string>;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private toastrService: ToastrService
  ) {
    this.errorMsg = [];
  }
  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  login() {
    this.errorMsg = [];
    this.authService
      .authenticate({
        body: this.authRequest,
      })
      .subscribe({
        next: (res) => {
          this.tokenService.token = res.token as string;
          this.authService.setUser(res.token as string);
          this.router.navigate(['books']);
        },
        error: (err) => {
          if (err.error.validationErrors) {
            this.toastrService.error(err.error.validationErrors);
          } else if (err.error.businessErrorDescription) {
            this.errorMsg.push(err.error.businessErrorDescription);
          }
        },
      });
  }

  register() {
    this.router.navigate(['register']);
  }
}
