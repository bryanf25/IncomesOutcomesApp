import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';
import { AppState } from '../../app.reducer';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  uiSubscription!: Subscription;
  loading: boolean = false;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) { }
    
    ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
      this.uiSubscription = this.store.select('ui').subscribe(ui => {
        this.loading = ui.isLoading;
        console.log('cargando subs');
      }
    )
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  async createUser() {

    // Swal.fire({
    //   title: "Wait please",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // })

    if (this.registerForm.invalid) { return; }

    const { name, email, password } = this.registerForm.value;
    this.store.dispatch(ui.isLoading())

    try {
      const response = await this.authService.createUser(name, email, password)
      
      if (response) {
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
      this.store.dispatch(ui.stopLoading())
      console.error(error)
    }



  }

}
