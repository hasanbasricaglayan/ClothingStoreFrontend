import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	role: boolean = false
	baseUrl = "https://localhost:7108/api/login";
	options = {
		headers: new HttpHeaders(
			{
				'content-type': "application/json"
			}
		)
	}


	constructor(private http: HttpClient, private router: Router) { }

	isAuthenticated(): boolean {
		if (localStorage.getItem("token") == undefined)
			return false
		//Il recommandé d'ajouter une requête vers le serveur afin de vérifier la validité du token
		return true
	}


	isAdminAuthenticated(): boolean {
		if (localStorage.getItem("role") == "client")
			return false
		//Il recommandé d'ajouter une requête vers le serveur afin de vérifier la validité du token
		return true
	}

	getRole() {

		const optionsToken = {
			headers: new HttpHeaders(
				{
					'content-type': "application/json",
					'authorization': 'Bearer ' + localStorage.getItem('token') || ''
				}
			)
		}

		localStorage.getItem("token")
		this.http.get<boolean>("https://localhost:7108/api/role", optionsToken).subscribe(r => {
			console.log(r)
			if (r == true) {
				localStorage.setItem("role", "admin")
				this.router.navigate(["/account"])
			}
			else {
				localStorage.setItem("role", "client")
				this.router.navigate(["/products"])
			}

		})
	}



	login(email: string, password: string) {
		const body = JSON.stringify({
			Email: email,
			Password: password
		})

		//console.log(body);
		this.http.post(this.baseUrl, body, this.options).subscribe(
			{
				next: (response: any) => {
					//console.log(response);
					//Récupérer le token renvoyé par l'API serveur
					const authToken = (<any>response).token;

					//Enregistrer le token dans localstorage
					localStorage.setItem("token", authToken);
					console.log(localStorage.getItem("token"))
					//Verifier le rôle et redirection
					this.getRole()
				},
				error: error => console.log(error),
				complete: () => console.log("Complete")
			}
		)
	}

	deconnection() {

		localStorage.removeItem("token")
		if (localStorage.getItem("role")) {
			localStorage.removeItem("role")
		}
		if (localStorage.getItem("orders")) {
			localStorage.removeItem("orders")
		}
	}
}
