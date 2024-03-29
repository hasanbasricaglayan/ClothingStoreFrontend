import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

	getUserFullname(user: UserDTO): string {
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
		const authURL = "https://localhost:7108/api/auth"

		const options = {
			headers: new HttpHeaders({
				'content-type': "application/json",
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		return this.http.get<UserDTO>(authURL, options)
	}

	addUser(user: UserDTO) {
		const URL = this.baseURL

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
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
				BillingAddress: user.billingAddress,
				DeliveryAddress: user.deliveryAddress,
				IsAdmin: user.isAdmin || false
			}),
			options)
			.subscribe(user => {
				this.users = [...this.users, user]
				this.updatedUsers$$.next([...this.users])
			})
	}

	editUser(userId: number, user: UserDTO): Observable<UserDTO> {
		const URL = `${this.baseURL}/${userId}`

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		return this.http.put<UserDTO>(
			URL,
			JSON.stringify({
				FirstName: user.firstName,
				LastName: user.lastName,
				PhoneNumber: user.phoneNumber,
				Email: user.email,
				Password: user.password,
				DateOfBirth: user.dateOfBirth,
				BillingAddress: user.billingAddress,
				DeliveryAddress: user.deliveryAddress,
				IsAdmin: user.isAdmin || false
			}),
			options)
	}

	deleteUser(userId: number) {
		const URL = `${this.baseURL}/${userId}`

		this.http.delete(URL).subscribe(() => {
			this.users = this.users.filter(user => user.userId !== userId)
			this.updatedUsers$$.next([...this.users])
		})
	}
}
