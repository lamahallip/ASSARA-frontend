import { Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Location } from '@angular/common';
import { User } from '../../service/model/user.model';
import { fontAwesomeIcons } from '../../shared/font-awesome-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

authService: AuthService = inject(AuthService)
location : Location = inject(Location)
userConnected : User = {email: this.authService.notConnected}

constructor() {
  effect(() => {
    if(this.authService.fetchUser().status == 'OK') {
      this.userConnected = this.authService.fetchUser().value!;
    }
  })
}

ngOnInit(): void {
 this.authService.fetch()   
}

login(): void {
  this.authService.login();
}

logout(): void {
  this.authService.logout();
}

goBackward(): void {
  this.location.back()
}

goforward(): void {
  this.location.forward()
}




}
