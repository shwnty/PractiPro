
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { saveAs } from 'file-saver';
import { PdfviewerComponent } from '../../shared/pdfviewer/pdfviewer.component';
import { CommentspopupComponent } from '../../shared/commentspopup/commentspopup.component';
import { MatMenuModule } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { ChangeDetectionService } from '../../../../services/shared/change-detection.service';

@Component({
  selector: 'app-requirementspopup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatMenuModule, FormsModule, FilterPipe, NgxPaginationModule],
  templateUrl: './requirementspopup.component.html',
  styleUrl: './requirementspopup.component.css'
})
export class RequirementspopupComponent implements OnInit, OnDestroy {
  constructor(private changeDetection: ChangeDetectionService, private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<RequirementspopupComponent>, private dialog2: MatDialog) { }

  studentSubmissions: any[] = [];
  filteredSubmissions: any[] = [];
  isLoading = true;
  private subscriptions = new Subscription();
  searchtext: any;
  p: number = 1; /* starting no. of the list */

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData() {
    this.subscriptions.add(
    this.service.getSubmissionsByStudent('submissions', this.data.student.id).subscribe(
      (res: any) => {
        this.studentSubmissions = res.payload;
        this.isLoading = false;
        console.log(this.studentSubmissions);
      },
      (error: any) => {
        console.error('Error fetching student submissions:', error);
      }
    ));
  }

  applyFilter(filterValue: string) {
    if (filterValue === "All") {
      this.searchtext = '';
    }else{
      this.searchtext = filterValue;
    }
    
  }

  viewFile(submissionId: number) {
    this.subscriptions.add(
    this.service.getSubmissionFile('submissions', submissionId).subscribe(
      (data: any) => {
        const popup = this.dialog2.open(PdfviewerComponent, {
          enterAnimationDuration: "0ms",
          exitAnimationDuration: "500ms",
          width: "90%",
          data: {
            selectedPDF: data
          }
        })
      },
      (error: any) => {
        console.error('Error viewing submission:', error);
      }
    ));
  }


  downloadFile(submissionId: number, submissionName: string) {
    this.subscriptions.add(
    this.service.getSubmissionFile('submissions', submissionId).subscribe(
      (data: any) => {
        saveAs(data, submissionName);
      },
      (error: any) => {
        console.error('Error downloading submission:', error);
      }
    ));
  }
  deleteSubmission(submissionId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.add(
        this.service.deleteSubmission(submissionId, 'submissions').subscribe((res: any) => {
          Swal.fire({
            title: "The submission has been deleted",
            icon: "success"
          });
          this.loadData();
        }, error => {
          Swal.fire({
            title: "Delete failed",
            text: "You may not have permission to delete this file.",
            icon: "error"
          });
        }));
      }
    });
  }

  viewComments(submissionId: number, fileName: string) {
    const popup = this.dialog2.open(CommentspopupComponent, {
      enterAnimationDuration: "350ms",
      exitAnimationDuration: "500ms",
      width: "95%",
      data: {
        submissionID: submissionId,
        fileName: fileName,
        table: 'comments_requirements'
      }
    })
    this.subscriptions.add(
    popup.afterClosed().subscribe(res => {
      this.loadData()
    }));
  }


  onStatusChange(record: any) {
    const updateData = { advisor_approval: record.advisor_approval };
    this.subscriptions.add(
    this.service.updateAdvisorApproval('submissions', record.id, updateData).subscribe(
      res => {
        this.changeDetection.notifyChange(true);
        console.log('Status updated successfully:', res);
      },
      error => {
        console.error('Error updating status:', error);
      }
    ));
  }




}
