import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

	constructor(private router: Router, private userService: UserService) { }

	newUser?: UserDTO
	UserCurrent?: UserDTO

	submitForm(f: NgForm) {
		console.log(f.value.email)
		this.newUser!.email = f.value.email
		this.newUser!.firstName = f.value.firstName
		this.newUser!.lastName = f.value.lastName
		this.newUser!.phoneNumber = f.value.phoneNumber
		this.newUser!.deliveryAddress = f.value.deliveryAddress
		this.newUser!.billingAddress = f.value.billingAddress
		this.newUser!.dateOfBirth = f.value.dateOfBirth


		console.log(this.userService.editUser(this.newUser!.userId!, this.newUser!))

	}

	ngOnInit(): void {

		console.log("Account")
		this.userService.getUserByToken().subscribe(user => {
			this.UserCurrent = user;
			this.newUser = user;
			console.log(this.UserCurrent?.firstName)

		})
	}
}
