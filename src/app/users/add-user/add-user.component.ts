import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

	constructor(private userService: UserService, private router: Router) { }

	addUser(form: NgForm) {
		let newUser: UserDTO = {
			firstName: form.value.firstName,
			lastName: form.value.lastName,
			phoneNumber: form.value.phoneNumber,
			email: form.value.emailAddress,
			password: form.value.password,
			dateOfBirth: form.value.dateOfBirth,
			billingAdress: form.value.billingAddress,
			deliveryAdress: form.value.deliveryAddress,
			isAdmin: form.value.isAdmin
		}
		this.userService.addUser(newUser)
		this.router.navigate(['/users'])
	}
}
