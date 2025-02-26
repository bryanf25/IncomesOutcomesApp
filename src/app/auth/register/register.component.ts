import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  async createUser() {
    Swal.fire({
      title: "Wait please",
      didOpen: () => {
        Swal.showLoading();
      }
    })
    if (this.registerForm.invalid) { return; }
    const { name, email, password } = this.registerForm.value;
    try {
      const response = await this.authService.createUser(name, email, password)
      if (response.user || response.firestore._authCredentials.currentUser) {
        Swal.close();
        this.router.navigate(['/'])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error TRY AGAIN!',
          text: response.code
        })
      }
    } catch (error) {
      console.error(error)
    }



  }

}
