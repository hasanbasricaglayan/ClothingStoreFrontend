import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserToDisplay } from 'src/app/models/user/user-to-display';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-list-users',
	templateUrl: './list-users.component.html',
	styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {
	usersSubscription?: Subscription
	users: UserDTO[] = []
	usersToDisplay?: UserToDisplay[]

	constructor(private userService: UserService) { }

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	ngOnDestroy(): void {
		this.usersSubscription?.unsubscribe()
	}
}
