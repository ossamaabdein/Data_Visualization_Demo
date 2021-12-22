import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task';
  isLogged = false;

  constructor(private _AuthService: AuthService) {
    _AuthService.userData.subscribe(() => {
      if (_AuthService.userData.getValue() != null) {
        this.isLogged = true
      } else {
        this.isLogged = false
      }
    })
  }

  logout() {
    this._AuthService.logout()
  }
}


