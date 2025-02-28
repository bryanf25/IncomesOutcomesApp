import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  loading: boolean = false
  uiSubscription! : Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) { }
    
    
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', Validators.required)
      });
      
      this.uiSubscription = this.store.select('ui').subscribe(ui => {
        this.loading = ui.isLoading;
        console.log('cargando subs');
      }
    )
  }
  
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  async login() {
    if( this.loginForm.invalid){ return;}

    this.store.dispatch(ui.isLoading())



    const { email, password } = this.loginForm.value
    try {
      const response = await this.authService.loginUser(email, password);
      if (response.user) {
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/'])
      } else {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Error TRY AGAIN!',
          text: response.code
        })
      }
    } catch (error) {
      console.error('Error data', error)
    }
  }


}
