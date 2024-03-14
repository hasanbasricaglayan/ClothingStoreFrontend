import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	baseURL = "https://localhost:7108/api/login"

	options = {
		headers: new HttpHeaders({
			'content-type': "application/json"
		})
	}

	constructor(private http: HttpClient, private router: Router) { }

	isAuthenticated(): boolean {
		if (localStorage.getItem("token") == undefined)
			return false
		// Il est recommandé d'ajouter une requête vers le serveur afin de vérifier la validité du token
		return true
	}

	login(email: string, password: string) {
		const body = JSON.stringify({
			Email: email,
			Password: password
		})

		this.http.post(this.baseURL, body, this.options).subscribe({
			next: (response: any) => {
				// Récupérer le token renvoyé par l'API serveur
				const authToken = (<any>response).token

				// Enregistrer le token dans localstorage
				localStorage.setItem("token", authToken)
				console.log(localStorage.getItem("token"))

				// Une fois que l'utilisateur est connecté, je le redirige vers la liste des produits
				this.router.navigate(["/products"])
			},
			error: error => console.log(error),
			complete: () => console.log("Complete")
		})
	}
}
