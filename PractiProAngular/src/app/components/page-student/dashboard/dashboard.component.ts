import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, NavbarComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private service: AuthService) { }
  registrationStatus: any;
  studentRequirements: any[] = [];
  student:any;
  ngOnInit(): void {
    const userId = this.service.getCurrentUserId();

    if (userId) {
      this.service.getStudentOjtInfo(userId).subscribe(
        (res: any) => {
          console.log(res)
          this.registrationStatus = res.payload[0].registrationstatus;
          this.student = res.payload[0];
          console.log(`Status: ${this.registrationStatus}`)
        },
        (error: any) => {
          console.error('Error fetching data.', error);
        }
      );
      if (!this.registrationStatus)
        this.service.getStudentRequirements(userId).subscribe(
          (res: any) => {
            this.studentRequirements = res.payload;
          },
          (error: any) => {
            console.error('Error fetching student requirements:', error);
          }
        );
    }
  }
}
