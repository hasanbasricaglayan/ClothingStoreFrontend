import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  constructor(private router: Router,private userService : UserService){}

  newUser? : User
  UserCurrent? : User

  submitForm(f : NgForm){
    console.log(f.value.email)
    this.newUser!.email = f.value.email
    this.newUser!.firstName = f.value.firstName
    this.newUser!.lastName = f.value.lastName
    this.newUser!.phoneNumber = f.value.phoneNumber
    this.newUser!.deliveryAdress = f.value.deliveryAddress
    this.newUser!.billingAdress = f.value.billingAddress
    this.newUser!.dateOfBirth = f.value.dateOfBirth

    
    console.log(this.userService.putUser(this.newUser!))

  }


  
  ngOnInit(): void {
    
    console.log("Account")
     this.userService.getUserByToken().subscribe( user => {
      this.UserCurrent = user;
      this.newUser = user;
      console.log(this.UserCurrent?.firstName)
      
     })
}
}
