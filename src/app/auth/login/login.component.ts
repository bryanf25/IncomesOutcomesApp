import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    })
  }

  async login() {
    Swal.fire({
      title: "Wait please",
      didOpen: () => {
        Swal.showLoading();
      }
    })
    const { email, password } = this.loginForm.value
    const response = await this.authService.loginUser(email, password);
    if (response.user) {
      Swal.close();
      this.router.navigate(['/'])
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error TRY AGAIN!',
        text: response.code
      })
    }
  }


}
