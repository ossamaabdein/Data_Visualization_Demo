import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = '';
  
  loginForm: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [Validators.required])
  })

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
  }

  submitloginForm(loginForm: FormGroup) {
    if(loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe((response) => {
        if(response.msg == "success") {
          sessionStorage.setItem('userToken', response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['home'])
        } else {
          this.error = response.errors; 
        }
      })
    }
  }

}
