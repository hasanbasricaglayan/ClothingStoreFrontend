import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../models/user/user-dto';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	user?: UserDTO


	constructor(private router: Router, private userService: UserService , private loginService : LoginService) { }
	role? : boolean
	user?: UserDTO

	isAdmin(){
		if(localStorage.getItem("role") == "client"){
			this.role = false;
		}
		else{
			this.role=true;
		}

	}

	goToAdminUsersListPage() {
		this.router.navigate(["/users"]);
	}
	goToAdminOrderListPage() {
		this.router.navigate(["/orders"]);
	}

	goToEditPage() {
		this.router.navigate(["/edit-user"]);
	}

	goToOrdersPage() {
		this.router.navigate(["/orders"]);
	}

	deconnect() {
		this.loginService.deconnection()
		this.router.navigate(["/login"])
	}

	ngOnInit(): void {
		this.userService.getUserByToken().subscribe(user => {
			this.user = user;
			//console.log(this.user)
			this.isAdmin()
			console.log(this.role)
		})

	}
}
