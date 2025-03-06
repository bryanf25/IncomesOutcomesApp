import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  userName: string = '';
  user$!: Subscription;


  constructor(private store: Store<AppState>) { }


  ngOnInit() {
   this.user$ = this.store.select('user')
       .pipe(
         filter(({user})=> user?.name != null)
       )
       .subscribe(({user})=>{
         this.userName = user!.name;
       })
  }

  ngOnDestroy() {
    this.user$.unsubscribe()
  }

}
