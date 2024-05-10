
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-warpopupcomponent',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './warpopupcomponent.component.html',
  styleUrl: './warpopupcomponent.component.css'
})
export class WarpopupcomponentComponent {
  constructor(private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<WarpopupcomponentComponent>) { }

  studentSubmissions: any[] = [];

  ngOnInit(): void {
    console.log(this.data.usercode)
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getWarByUser(this.data.usercode).subscribe(
        (data: any[]) => {
          this.studentSubmissions = data;
          console.log(this.studentSubmissions);
        },
        (error: any) => {
          console.error('Error fetching student submissions:', error);
        }
      );
    }
  }

  downloadSubmission(submissionId: number, submissionName: string) {
    this.service.downloadWar(submissionId).subscribe(
      (data: any) => {
        saveAs(data, submissionName);
      },
      (error: any) => {
        console.error('Error downloading submission:', error);
      }
    );
  }


  toggleApproval(id: number, currentValue: boolean) {
    const newValue = currentValue ? 0 : 1; // Flip the current value
    const requestData = {
      submissionId: id,
      newRemark: newValue
    };
    this.service.toggleWarRemark(requestData).subscribe(
      (response) => {
        console.log('Submission remark toggled successfully:', response);

        const submissionIndex = this.studentSubmissions.findIndex(submission => submission.war_id === id);
        if (submissionIndex !== -1) {
          this.studentSubmissions[submissionIndex].remarks = newValue;
        }
      },
      (error) => console.error('Error toggling Submission remark:', error)
    );
  }


}
