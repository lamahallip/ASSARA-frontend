import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { State } from './model/state.model';
import { User } from './model/user.model';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);
  location : Location = inject(Location);
  notConnected : string = "NOT_CONNECTED";


  private fetchUser$: WritableSignal<State<User, HttpErrorResponse>> = 
  signal(State.Builder<User, HttpErrorResponse>().forSuccess({email: this.notConnected}).build());

  fetchUser = computed(() => this.fetchUser$())

  fetch(): void {
    this.http.get<User>(`/api/get-authenticated-user`).subscribe(
      {
        next: (user: User) => this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess(user).build()),
        error: (error: HttpErrorResponse) => {
          if(error.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
            this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess({email:this.notConnected}).build());
          } else {
            this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forError(error).build());
          }
        }  
      }
    )
  }

  isAuthenticated(): boolean {
    if(this.fetchUser$().value) {
      return this.fetchUser$().value!.email !== this.notConnected; 
    } else {
      return false;
    }
  }

  login(): void {
    location.href = `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/okta')}`
  }

  logout(): void {
    this.http.post(`${environment.API_URL}/api/logout`, {}, {withCredentials: true}).subscribe(
      {
        next: (response: any) => {
          this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess({email:this.notConnected}).build());
          location.href = response.logoutUrl
        }
      }
    )
  }
  

  constructor() { }
}
