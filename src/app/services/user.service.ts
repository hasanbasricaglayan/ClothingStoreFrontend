import { Injectable } from '@angular/core';
import { User } from '../model/user/user'
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../model/category/category';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = []
    //curentUser: User = User()
    usersUpdated = new Subject<User[]>();
    constructor(private http: HttpClient) { }
    UsersURl = "https://localhost:7108/api/Users";

    getUsers() {
        console.log("GET");
        this.http.get<User[]>(this.UsersURl).subscribe(
            us => {
                this.users = us;
                console.log(this.users);
                this.usersUpdated.next([...this.users]);
            }
        );
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(this.UsersURl + "/" + id)
    }

    postUser(user: User) {
        const options = {
            headers: new HttpHeaders(
                { 'content-type': 'application/json' }
            )
        };
        const body = JSON.stringify({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            password: user.password,
            dateOfBirth: user.dateOfBirth,
            billingAdress: user.billingAdress,
            deliveryAdress: user.deliveryAdress,
            isAdmin: false,
        })
        console.log(body)
        this.http.post<User>(
            this.UsersURl,
            body,
            options
        )
            .subscribe(
                user => {
                    this.users.push(user);
                    this.usersUpdated.next([...this.users]);
                }
            )
    }
}
