import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-edit-account',
	templateUrl: './edit-account.component.html',
	styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
	currentUser?: UserDTO

	constructor(private router: Router, private userService: UserService) { }

	editUser() {
		this.userService.editUser(this.currentUser!.userId!, this.currentUser!).subscribe(() => {
			this.router.navigate(['/account'])
		})
	}

	ngOnInit(): void {
		this.userService.getUserByToken().subscribe(user => {
			this.currentUser = user
		})
	}
}
