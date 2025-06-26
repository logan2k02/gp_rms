import { Component } from '@angular/core';
import { ManageMemberComponent } from '../shared/manage-member/manage-member.component';

@Component({
  selector: 'app-new-member',
  imports: [ManageMemberComponent],
  templateUrl: './new-member.component.html',
  styleUrl: './new-member.component.scss',
})
export class NewMemberComponent {}
