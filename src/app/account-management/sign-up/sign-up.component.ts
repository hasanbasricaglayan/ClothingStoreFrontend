import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

	constructor(private router: Router, private userService: UserService) { }

	signUpUser(form: NgForm) {
		let user: UserDTO = {
			firstName: form.value.firstName,
			lastName: form.value.lastName,
			phoneNumber: form.value.phoneNumber,
			email: form.value.emailAddress,
			password: form.value.password,
			dateOfBirth: form.value.dateOfBirth,
			billingAddress: form.value.billingAddress,
			deliveryAddress: form.value.deliveryAddress,
			isAdmin: false
		}
		this.userService.addUser(user)
		this.router.navigate(['/account/login'])
	}
}
