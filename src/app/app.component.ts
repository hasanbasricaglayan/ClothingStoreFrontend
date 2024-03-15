import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResearchService } from './services/research.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'clothing-store'

	constructor(private router: Router, private researchService: ResearchService) { }

	goToCart() {
		this.router.navigate(['/cart'])
	}

	sendResearch(form: NgForm) {
		var message = form.value.search
		this.researchService.sendData({ message })
	}
}
