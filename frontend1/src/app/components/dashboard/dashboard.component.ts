import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formStateService: FormService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.formStateService.login(user).subscribe(
        (response) => {
          console.log('Login successful!', response);
          this.router.navigate(['/formbuilder']); // Adjust the route based on your application
        },
        (error) => {
          console.error('Login error', error);
          // Display an error message to the user
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      console.error('Invalid form submission');
    }
  }
  
  
}
