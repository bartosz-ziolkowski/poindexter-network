import { NgForOf, NgIf } from '@angular/common';

import { AuthenticationService } from '../../services/services/authentication.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationRequest } from '../../services/models/registration-request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  errorMsg: Array<string>;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) {
    this.errorMsg = [];
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService
      .register({
        body: this.registerRequest,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else if (err.error.businessErrorDescription) {
            this.toastrService.error(err.error.businessErrorDescription);
          }
        },
      });
  }
}
