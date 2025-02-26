import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthService ,private router: Router){}

  logOut(){
    this.authService.logout().then(()=> {
      Swal.fire({
        title: "Sesion Finish Correctly!",
        icon: "success",
      });      
      this.router.navigate(['/login'])
    });
  }
}
