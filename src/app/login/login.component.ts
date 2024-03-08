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
    this.loginService.login(email, password);
  }
  login(email : string,password :string){

      console.log(email + " " + password)

  }
}
