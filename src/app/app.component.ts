import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ResearchService } from './services/research.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'clothing-store'

	constructor(private researchService: ResearchService,) {}
	
	sendResearch(form: NgForm) {
		var message = form.value.search
		console.log(message)
		console.log(form)
	  this.researchService.sendData({ message });
	}

	

	


}
