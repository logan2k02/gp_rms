import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../core/base.component';
import { getEndpointNameForRole } from '../../../core/enums';
import {
  AlertService,
  AuthService,
  GlobalLoadingBarService,
} from '../../../core/services';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent {
  private alertService = inject(AlertService);
  private loadingBar = inject(GlobalLoadingBarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  passwordVisible = signal(false);

  errorMessage(controlName: string): string | null {
    if (this.form.get(controlName)?.hasError('required')) {
      return 'Field is required';
    }
    if (this.form.get(controlName)?.hasError('minlength')) {
      return `Minimum length is ${
        this.form.get(controlName)?.errors?.['minlength']?.requiredLength
      }`;
    }
    return null;
  }

  onFormSubmit() {
    this.loadingBar.startLoading();
    if (!this.form.valid) {
      this.alertService.error('Please fill in all fields');
      this.loadingBar.stopLoading();
      return;
    }

    const { username, password } = this.form.value;
    this.sub$.sink = this.authService.staffLogin(username, password).subscribe({
      next: (user) => {
        this.alertService.success(`Welcome ${user.name.split(' ')[0]}!`);
        this.loadingBar.stopLoading();
        this.router.navigate(['/staff/' + getEndpointNameForRole(user.role)]);
      },
      error: (error) => {
        this.alertService.error(error);
        this.loadingBar.stopLoading();
      },
    });
  }

  get isLoading() {
    return this.loadingBar.getLoading();
  }
}
