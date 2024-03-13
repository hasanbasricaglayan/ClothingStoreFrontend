import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	constructor(private loginService: LoginService , private router : Router) { }

	goToSignIn() {
		this.router.navigate(['/users'])
		}

	logintoAPI(email: string, password: string) {
		this.loginService.login(email, password)
	}
}
