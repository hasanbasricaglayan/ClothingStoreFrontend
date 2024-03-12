import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private users: User[] = []
	updatedUsers = new Subject<User[]>()

	baseURL = "https://localhost:7108/api/Users"

	constructor(private http: HttpClient) { }

	getUserFullName(user: User) {
		return `${user.firstName} ${user.lastName}`
	}

	getUsers(): Observable<User[]> {
		const URL = `${this.baseURL}/`
		return this.http.get<User[]>(URL)
	}

	getUserById(userId: number): Observable<User> {
		const URL = `${this.baseURL}/${userId}`
		return this.http.get<User>(URL)
	}

	getUserByToken(): Observable<User> {
		var authURL = "https://localhost:7108/api/auth"
		var options = {
			headers: new HttpHeaders(
				{
					'content-type': "application/json",
					'authorization': 'Bearer ' + localStorage.getItem('token') || ''
				}
			)
		}

		return this.http.get<User>(authURL, options)
	}

	putUser(user: User){
		var options = {
			headers: new HttpHeaders(
				{
					'content-type': "application/json",
					'authorization': 'Bearer ' + localStorage.getItem('token') || ''
				})
		}

		var body =  
			JSON.stringify({
			FirstName : user.firstName,
			LastName : user.lastName,
			Email : user.email,
			PhoneNumber : user.phoneNumber,
			BillingAdress : user.billingAdress,
			DeliveryAdress : user.deliveryAdress,
			Password : user.password,
			IsAdmin: user.isAdmin,
			DateOfBirth : user.dateOfBirth
		  })

		var Url = this.baseURL + "/" + user.userId
		console.log(Url)
		console.log(body)
		this.http.put(Url,body,options).subscribe( c => {
			console.log(c)
		})


		
	}
}
