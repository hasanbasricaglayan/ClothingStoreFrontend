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

	getUserFullname(user: UserDTO) {
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

	getUserByToken(): Observable<UserDTO> {
		var authURL = "https://localhost:7108/api/auth"
		var options = {
			headers: new HttpHeaders(
				{
					'content-type': "application/json",
					'authorization': 'Bearer ' + localStorage.getItem('token') || ''
				}
			)
		}
		return this.http.get<UserDTO>(authURL, options)
	}

	addUser(user: UserDTO) {
		const URL = this.baseURL
		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json'
			})
		}

		this.http.post<UserDTO>(
			URL,
			JSON.stringify({
				FirstName: user.firstName,
				LastName: user.lastName,
				PhoneNumber: user.phoneNumber,
				Email: user.email,
				Password: user.password,
				DateOfBirth: user.dateOfBirth,
				BillingAdress: user.billingAdress,
				DeliveryAdress: user.deliveryAdress,
				IsAdmin: user.isAdmin
			}),
			options)
			.subscribe(user => {
				this.users = [...this.users, user]
				this.updatedUsers$$.next([...this.users])
			})
	}

	editUser(userId: number, user: UserDTO): Observable<User> {
		const URL = `${this.baseURL}/${userId}`

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		return this.http.put<User>(
			URL,
			JSON.stringify({
				FirstName: user.firstName,
				LastName: user.lastName,
				PhoneNumber: user.phoneNumber,
				Email: user.email,
				Password: user.password,
				DateOfBirth: user.dateOfBirth,
				BillingAddress: user.billingAdress,
				DeliveryAddress: user.deliveryAdress,
				IsAdmin: user.isAdmin
			}),
			options)
	}

	deleteUser(userId: number) {
		const URL = `${this.baseURL}/${userId}`
		this.http.delete(URL)
			.subscribe(() => {
				this.users = this.users.filter(user => user.userId !== userId)
				this.updatedUsers$$.next([...this.users])
			})
	}
}
