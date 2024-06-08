import { Routes } from '@angular/router';
import { coordGuard } from './guard/coord.guard';
import { adminGuard } from './guard/admin.guard';
import { studentGuard } from './guard/student.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/register/registration/registration.component';
//Student Imports
import { NavbarComponent } from './components/page-student/navbar/navbar.component';
import { DashboardComponent } from './components/page-student/dashboard/dashboard.component';
import { ProfileComponent } from './components/page-student/profile/profile.component';
import { SubmissionComponent } from './components/page-student/submission-requirement/submission.component';
import { DocumentationComponent } from './components/page-student/submission-documentation/documentation.component';
import { DtrComponent } from './components/page-student/submission-dtr/dtr.component';
import { WeeklyAccomplishmentRepComponent } from './components/page-student/submission-war/weekly-accomplishment-rep.component';
import { ExitPollComponent } from './components/page-student/submission-finalreport/exit-poll.component';
import { FeedbackComponent } from './components/page-student/feedback/feedback.component';
//Admin Imports
import { AdminNavbarComponent } from './components/page-admin/admin-navbar/admin-navbar.component';
import { AdminUsersComponent } from './components/page-admin/admin-users/admin-users.component';
import { AdminAdminsComponent } from './components/page-admin/admin-admins/admin-admins.component';
import { AdminStudentsComponent } from './components/page-admin/admin-students/admin-students.component';
import { AdminCoordinatorsComponent } from './components/page-admin/admin-coordinators/admin-coordinators.component';
//Coordinator Imports
import { CoordNavbarComponent } from './components/page-coordinator/coord-navbar/coord-navbar.component';
import { CoordinatorSubmissionComponent } from './components/page-coordinator/coordinator-submission/coordinator-submission.component';
import { CoordAccomplishmentReportComponent } from './components/page-coordinator/coord-accomplishment-report/coord-accomplishment-report.component';
import { CoordDtrComponent } from './components/page-coordinator/coord-dtr/coord-dtr.component';
import { CoordDocumentationComponent } from './components/page-coordinator/coord-documentation/coord-documentation.component';
import { CoordFinalreportComponent } from './components/page-coordinator/coord-finalreport/coord-finalreport.component';
import { AdminClassesComponent } from './components/page-admin/admin-classes/admin-classes.component';
//landing page
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationadvisorComponent } from './components/register/registration/registrationadvisor/registrationadvisor.component';
import { RegistrationadminComponent } from './components/register/registration/registrationadmin/registrationadmin.component';
import { RegistrationsupervisorComponent } from './components/register/registration/registrationsupervisor/registrationsupervisor.component';
import { SupervisorNavbarComponent } from './components/page-supervisor/supervisor-navbar/supervisor-navbar.component';
import { supervisorGuard } from './guard/supervisor.guard';
import { SupervisorDtrComponent } from './components/page-supervisor/supervisor-dtr/supervisor-dtr.component';
import { SupervisorProfileComponent } from './components/page-supervisor/supervisor-profile/supervisor-profile.component';
import { SupervisorDashboardComponent } from './components/page-supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { SupervisorWarComponent } from './components/page-supervisor/supervisor-war/supervisor-war.component';
import { SupervisorEvaluationComponent } from './components/page-supervisor/supervisor-evaluation/supervisor-evaluation.component';
import { SupervisorHirestudentsComponent } from './components/page-supervisor/supervisor-hirestudents/supervisor-hirestudents.component';


export const routes: Routes = [

    { path: '', component: LoginComponent, title: 'Login' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'PractiPro', component: LandingPageComponent, title: 'PractiPro' },
    { path: 'registration', component: RegistrationComponent, title: 'Registration' },
    { path: 'registrationadvisor', component: RegistrationadvisorComponent, title: 'Registration' },
    { path: 'registrationadmin', component: RegistrationadminComponent, title: 'Registration' },
    { path: 'registrationsupervisor', component: RegistrationsupervisorComponent, title: 'Registration' },

    //Student Pages
    {
        path: '',
        component: NavbarComponent,
        canActivateChild: [studentGuard], 
        children: [
            { path: 'student-dashboard', component: DashboardComponent, title: 'Dashboard',  },
            { path: 'student-profile', component: ProfileComponent, title: 'Profile',  },
            { path: 'student-submission', component: SubmissionComponent, title: 'Submit a File',  },
            { path: 'student-documentation', component: DocumentationComponent, title: 'Documentation',  },
            { path: 'student-dtr', component: DtrComponent, title: 'Daily Time Records',  },
            { path: 'student-weekly-report', component: WeeklyAccomplishmentRepComponent, title: 'Weekly Accomplishment Report',  },
            { path: 'student-exit-poll', component: ExitPollComponent, title: 'Exit Poll',  },
            { path: 'student-feedback', component: FeedbackComponent, title: 'Feedback',  },
        ]
    },
    //Admin Pages
    {
        path: '',
        component: AdminNavbarComponent,
        canActivateChild: [adminGuard],
        children: [
            { path: 'admin-users', component: AdminUsersComponent, title: 'Users',  },
            { path: 'admin-admins', component: AdminAdminsComponent, title: 'Admins',  },
            { path: 'admin-students', component: AdminStudentsComponent, title: 'Students',  },
            { path: 'admin-coordinators', component: AdminCoordinatorsComponent, title: 'Advisors',  },
            { path: 'admin-classes', component: AdminClassesComponent, title: 'Classes',  },
        ]
    },
    //Coordinator Pages
    {
        path: '',
        component: CoordNavbarComponent,  
        canActivateChild: [coordGuard],      
        children: [
            { path: 'coord-submissions', component: CoordinatorSubmissionComponent, title: 'Submissions',  },
            { path: 'coord-documentations', component: CoordDocumentationComponent, title: 'Documentations',  },
            { path: 'coord-dtr', component: CoordDtrComponent, title: 'Daily Time Records',  },
            { path: 'coord-accomplishmentreport', component: CoordAccomplishmentReportComponent, title: 'Accomplishment Reports',  },
            { path: 'coord-finalreport', component: CoordFinalreportComponent, title: 'Final Reports',  },
        ]
    },
    //Supervisor Pages
    {
        path: '',
        component: SupervisorNavbarComponent,  
        canActivateChild: [supervisorGuard],      
        children: [
            { path: 'supervisor-dashboard', component: SupervisorDashboardComponent, title: 'Dashboard',  },
            { path: 'supervisor-hirestudents', component: SupervisorHirestudentsComponent, title: 'Hire Students',  },
            { path: 'supervisor-profile', component: SupervisorProfileComponent, title: 'Company Profile',  },
            { path: 'supervisor-dtr', component: SupervisorDtrComponent, title: 'Daily Time Records',  },
            { path: 'supervisor-war', component: SupervisorWarComponent, title: 'Weekly Accomplishment Reports',  },
            { path: 'supervisor-evaluation', component: SupervisorEvaluationComponent, title: 'Student Performance Evaluation',  },
        ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

