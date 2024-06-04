import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from '../../../filter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
import { OrdinalPipe } from '../../../ordinal.pipe';

@Component({
  selector: 'app-coord-classes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatCheckboxModule, FormsModule, FilterPipe, OrdinalPipe],
  templateUrl: './coord-classes.component.html',
  styleUrl: './coord-classes.component.css'
})
export class CoordClassesComponent {
  constructor(private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<CoordClassesComponent>) { }

  datalist: any;
  currentuser: any;
  isLoading: boolean = true;

  ngOnInit(): void {
    if (this.data.coordinatorId != null && this.data.coordinatorId != '') {
      this.service.getAdvisors(this.data.coordinatorId).subscribe(res => {
        console.log(res);
        this.currentuser = res.payload[0]
        console.log(this.currentuser);
      });
      this.loadData();
    }
  }

  loadData() {
    this.isLoading = true;
    this.service.getClassesByCoordinator(this.data.coordinatorId).subscribe(
      (res: any) => {
        this.datalist = res?.payload;
        this.isLoading = false;
        console.log(this.datalist);
      },
      (error: any) => {
        this.isLoading = false;
        if (error.status == 404) {
          console.log('No classes found.')
        } else {
          console.error('Error fetching classes:', error);
        }

      }
    );
  }

  selectClass(block: any) {
    this.dialog.close(block);
  }

}
