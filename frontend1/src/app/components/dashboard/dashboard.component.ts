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
  username!: string;
  password!: string;

  constructor(
    private formStateService: FormService,
    private formBuilder: FormBuilder,
    private router: Router
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
    this.formStateService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/formbuilder']);
      },
      (error) => {
        console.error('Login failed:', error);
        // Log additional details from the error object
        console.log('Error details:', error.error);
      }
    );
  }
  
}
