import { HttpClient } from '@angular/common/http';
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
}
