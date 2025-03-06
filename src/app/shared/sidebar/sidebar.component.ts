import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit , OnDestroy{
  
  userName: string = '';
  user$! : Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }
  
  
  ngOnInit() {
    this.user$ = this.store.select('user')
    .pipe(
      filter(({user})=> user?.name != null)
    )
    .subscribe(({user})=>{
      this.userName = user!.name;
    })
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe()
  }

  logOut() {
    this.authService.logout().then(() => {
      Swal.fire({
        title: "Sesion Finish Correctly!",
        icon: "success",
      });
      this.router.navigate(['/login'])
    });
  }
}
