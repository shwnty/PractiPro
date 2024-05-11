import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../filter.pipe';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [AdminSidebarComponent, AdminNavbarComponent, CommonModule, UpdatepopupComponent, FormsModule, FilterPipe],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  constructor(private service: AuthService, private dialog: MatDialog) {
    this.Loaduser();
  }
  users:any;
  searchtext: any;

  ngOnInit(): void {
    initFlowbite();
    this.service.getAllUsers().subscribe(res => {
      this.users = res;
    });
   }
   
  userlist: any;
  dataSource: any;

  Loaduser() {
    this.service.GetAll().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
    });
  }

  closeModal() {
    // Add code to close the modal here
    const modal = document.getElementById('crud-modal');
    modal?.classList.add('hidden');
  }

  Updateuser(code: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: "350ms",
      exitAnimationDuration: "300ms",
      width: "50%",
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res => {
        this.Loaduser()      
    });

  }  

}