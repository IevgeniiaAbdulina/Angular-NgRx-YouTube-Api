import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ControlService } from 'src/app/admin/services/control.service';

import { AuthService } from '../services/auth.service';
import { PasswordValidators } from '../validators/password-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  controlService = inject(ControlService);

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordValidators.patternValidator(/(?=.*[0-9])/, {
            requireDigit: true
          }),
          PasswordValidators.patternValidator(/(?=.*[A-Z])/, {
            requireUppercase: true
          }),
          PasswordValidators.patternValidator(/(?=.*[a-z])/, {
            requireLowercase: true
          }),
          PasswordValidators.patternValidator(/(?=.*[$@#^!%*?&])/, {
            specialCharacter: true
          })
        ])
      ]
    });
  }

  validationChecks(control: AbstractControl): boolean | null {
    return ControlService.validationChecks(control);
  }

  getControlName(controlName: string): AbstractControl | null {
    return ControlService.getFormControl(this.loginForm, controlName);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.isAdminRole(this.loginForm.value);

    this.authService.userLoginHandler();
  }
}
