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
import { AlertService } from '../../../core/services';
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
export class LoginComponent {
  alertService = inject(AlertService);

  form: FormGroup;
  passwordVisible = signal(false);

  constructor() {
    this.form = new FormGroup({
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  togglePasswordVisibility() {}

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
    if (!this.form.valid) {
      return;
    }

    this.alertService.success('Login successful!');
  }
}
