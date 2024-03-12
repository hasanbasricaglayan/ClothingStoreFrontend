import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user/user';
import { UserDTO } from '../models/user/user-dto';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private users: UserDTO[] = []
	private updatedUsers$$ = new Subject<UserDTO[]>()
	readonly updatedUsers$ = this.updatedUsers$$.asObservable()

	baseURL = "https://localhost:7108/api/Users"

	constructor(private http: HttpClient) { }

	getUserFullName(user: UserDTO) {
		return `${user.firstName} ${user.lastName}`
	}

	getAllUsersWithOrdersAndProducts(): Observable<UserDTO[]> {
		const URL = this.baseURL

		this.http.get<UserDTO[]>(URL).subscribe(users => {
			this.users = users
			this.updatedUsers$$.next([...this.users])
		})

		return this.updatedUsers$
	}

	getUserByIdWithOrdersAndProducts(userId: number): Observable<UserDTO> {
		const URL = `${this.baseURL}/${userId}`

		return this.http.get<UserDTO>(URL)
	}

	editUser(userId: number, user: UserDTO): Observable<User> {
		const URL = `${this.baseURL}/${userId}`

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json'
			})
		}

		return this.http.put<User>(
			URL,
			JSON.stringify({
				FirstName: user.firstName,
				LastName: user.lastName,
				PhoneNumbe: user.phoneNumber,
				Email: user.email,
				Password: user.password,
				DateOfBirth: user.dateOfBirth,
				BillingAddress: user.billingAddress,
				DeliveryAddress: user.deliveryAddress,
				IsAdmin: user.isAdmin
			}),
			options)
	}
}
