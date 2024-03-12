import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { UserToDisplay } from '../models/user-to-display';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

   constructor(private router: Router,private userService : UserService){}
  
   User? : User;

   goToEditPage() {
    this.router.navigate(["/edit-user"]);
    }
  
  goToOrderPage() {
    this.router.navigate(["/orders"]);
    }

    deconnect(){
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
    }

  ngOnInit(): void {
    
      console.log("Account")
       this.userService.getUserByToken().subscribe( user => {
        this.User = user;
        console.log(this.User?.firstName)
        
       })
      
      
      
    
  }

}
