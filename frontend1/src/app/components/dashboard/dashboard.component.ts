import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string = '';
  password: string = '';
  constructor( private formStateService: FormService,  private formBuilder: FormBuilder, private router: Router,) { }



  
  // login() {
  //   this.formStateService.login(this.username, this.password).subscribe((response) => {
  //     // Handle successful login
  //     console.log('Login successful', response);
  //   }, (error) => {
  //     // Handle login error
  //     console.error('Login failed', error);
  //   });
  // }

  // loginForm:FormGroup = this.formBuilder.group({
  //   username: ['', Validators.required],
  //   password: ['', Validators.required]
  // })
  

  // login() {
  //   console.log(this.loginForm)
  //   this.formStateService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
  //     if(res && res.message == "Login successful"){
  //       localStorage.setItem("isAuthorised", JSON.stringify(res));
  //       this.router.navigate(['/formbuilder']);
  //     }else{
  //       alert(res.message);
  //     }
  //   })
  // }


  // saveForm() {
  //   console.log('Form values to be saved:', this.form.value);
  //   this.formStateService.logindetails(this.form.value)
  //     .subscribe(
  //       (response) => {
  //         console.log('Form data saved successfully:', response);
  //         this.form.reset();
  //       },
  //       (error) => {
  //         console.error('Error saving form data:', error);
  //       }
  //     );
  //     this.showRemoveButtons = false;
  // }

  login() {
    this.formStateService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('Login successful', response);
      },
      error: (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    });
  }
  

}
