import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-list-users',
	templateUrl: './list-users.component.html',
	styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {
	usersSubscription?: Subscription
	users: UserDTO[] = []

	constructor(private userService: UserService) { }

	deleteUser(userId: number) {
		if (confirm("Etes-vous sûr de vouloir supprimer l'utlisateur ?"))
			this.userService.deleteUser(userId)
	}

	ngOnInit(): void {
		this.usersSubscription = this.userService.updatedUsers$.subscribe(users => {
			this.users = users
		})
		this.userService.getAllUsersWithOrdersAndProducts().subscribe()
	}

	ngOnDestroy(): void {
		this.usersSubscription?.unsubscribe()
	}
}
