import { Component, inject, OnInit } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base.component';
import { StaffRole } from '../../../../../../core/enums';
import { StaffUser } from '../../../../../../core/interfaces';
import {
  AlertService,
  GlobalLoadingBarService,
  StaffService,
} from '../../../../../../core/services';
import { StaffRoleUtils } from '../../../../../../core/utils';

@Component({
  selector: 'staff-admin-manage-member',
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './manage-member.component.html',
  styleUrl: './manage-member.component.scss',
})
export class ManageMemberComponent extends BaseComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private globalLoadingBar = inject(GlobalLoadingBarService);
  private staffService = inject(StaffService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  editingUser: StaffUser | null = null;

  readonly roles = Object.keys(StaffRole).map((key) => ({
    label: StaffRoleUtils.getName(key as StaffRole),
    value: key,
  }));

  readonly form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    username: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    role: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    const initialUser = this.activatedRoute.snapshot.data['user'] as
      | StaffUser
      | undefined;
    if (initialUser) {
      this.editingUser = initialUser;
      this.form.setValue({
        name: initialUser.name,
        role: initialUser.role,
        username: initialUser.username,
        password: '',
      });
      this.form.get('password')?.setValidators([Validators.minLength(6)]);
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }

    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    }

    return null;
  }

  get isLoading() {
    return this.globalLoadingBar.getLoading();
  }

  handleSubmit() {
    if (!this.form.valid) return;

    this.globalLoadingBar.startLoading();
    const formValue = this.form.value;
    const user = {
      id: this.editingUser?.id ?? '',
      name: formValue.name ?? '',
      role: (formValue.role ?? 'Admin') as StaffRole,
      username: formValue.username ?? '',
      password: formValue.password ?? '',
    };
    let action;
    if (this.editingUser) {
      action = this.staffService.updateUser(user);
    } else {
      action = this.staffService.createUser(user);
    }

    this.sub$.sink = action.subscribe({
      next: () => {
        this.globalLoadingBar.stopLoading();
        this.alertService.success(
          `Staff member ${
            this.editingUser ? 'updated' : 'created'
          } successfully.`
        );
        this.goBack();
      },
      error: (err) => {
        this.globalLoadingBar.stopLoading();
        this.alertService.error(err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/staff/admin/manage-staff']);
  }
}
