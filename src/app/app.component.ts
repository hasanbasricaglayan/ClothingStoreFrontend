import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResearchService } from './services/research.service';
import { CartService } from './services/cart.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'clothing-store'
	receivedMessage? : number = 0
	constructor(private router: Router, private researchService: ResearchService, private cartService : CartService) { }
	

	goToCart() {
		this.router.navigate(['/cart'])
	}

	sendResearch(form: NgForm) {
		var message = form.value.search
		this.researchService.sendData({ message })
	}
	ngOnInit(): void {
		this.cartService.data$.subscribe(data => {
			this.receivedMessage = data ? data.message : 0;
			console.log(this.receivedMessage)
		});
	}
}
