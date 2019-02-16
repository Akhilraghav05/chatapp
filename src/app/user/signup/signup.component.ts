import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobileNumber: any;
  public email: any;
  public password: any;
  public apiKey: any="ZTdkM2NlMjkzZjcwYjc2MGNhMWQzNDNlMDQyOTAyOTIwZGJiM2I4MDFlNTc4NTlkNWQ2MmI5YWI0YThkMjkyNDEzNDM0YTgyNGNjZDVmZDc1NDNjOTM0OWFkY2NhMzE5ZmY4NzE4NTcwNzYzMzc4MDRiMjJmM2Q1MGQ5NGJiNmQ2Mw==";

  constructor(public appService: AppService,
    public router: Router,
    private toastr: ToastrService
    ) { 
    }

  ngOnInit() {
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/']);  //?

  } // end goToSignIn

  public signupFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warning('enter first name')
    } else if (!this.lastName) {
      this.toastr.warning('enter last name')
    } else if (!this.mobileNumber) {
      this.toastr.warning('enter mobile')
    } else if (!this.email) {
      this.toastr.warning('enter email')
    } else if (!this.password) {
      this.toastr.warning('enter password')  
    } else if (!this.apiKey) {
      this.toastr.warning('Enter your API key')
    } else {

      let data = {                                     //hoisting
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }

      console.log("SignUp data:"+JSON.stringify(data)); //converts into object.

      this.appService.signupFunction(data).subscribe((apiResponse) => {

          if (apiResponse.status === 200) { //checking with error

            this.toastr.success('Signup successful');
            console.log("Signup successful");

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('some error occured');

        });

    } // end condition

  } // end signupFunction

}
