import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService : LoginService){}

  logintoAPI(email : string, password : string){
    console.log(email + " " + password)
    this.loginService.login(email, password);
  }
 
}
