import { Component } from '@angular/core';
import { CoordNavbarComponent } from '../coord-navbar/coord-navbar.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DtrpopupcomponentComponent } from '../../popups/popups-coordinator/dtrpopupcomponent/dtrpopupcomponent.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { BlockService } from '../../../services/block.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ViewprofilepopupComponent } from '../../popups/shared/viewprofilepopup/viewprofilepopup.component';

@Component({
  selector: 'app-coord-dtr',
  standalone: true,
  imports: [CoordNavbarComponent, CommonModule, FormsModule, FilterPipe, NgxPaginationModule, MatMenuModule, MatButtonModule],
  templateUrl: './coord-dtr.component.html',
  styleUrl: './coord-dtr.component.css'
})
export class CoordDtrComponent implements OnInit {
  constructor(private service: AuthService, private dialog: MatDialog, private blockService: BlockService) {
  }


  Coordinator: any;
  studentlist: any;
  searchtext: any;
  currentBlock: any;
  isLoading: boolean = false;
  p: number = 1; /* starting no. of the list */

  ngOnInit(): void {
    this.blockService.selectedBlock$.subscribe(block => {
      this.currentBlock = block;
      if (this.currentBlock) {
        this.loadHeldStudents();
      } else {
        console.log(`Submissions: no block selected`);
      }

      console.log(`Submissions: ${this.currentBlock}`);
    });
  }


  loadHeldStudents() {
    this.isLoading = true;
    this.service.getAllStudentsFromClass(this.currentBlock).subscribe(res => {
      this.studentlist = res.payload;
      this.studentlist = this.studentlist.filter((student: any) => student.registrationstatus === 1);
      this.isLoading = false;
      console.log(this.studentlist);
    }, err => {
      this.isLoading = false;
      console.error(err);
    });
  }


  viewSubmissions(student: any) {
    const popup = this.dialog.open(DtrpopupcomponentComponent, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      width: "80%",
      data: {
        student: student
      }
    })
  }

  viewProfile(student:any) {
    const popup = this.dialog.open(ViewprofilepopupComponent, {
      enterAnimationDuration: "350ms",
      exitAnimationDuration: "500ms",
      width: "auto",
      data: {
        student: student
      }
    })
  }

}
