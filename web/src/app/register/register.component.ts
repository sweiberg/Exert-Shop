import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router'
import { AuthService } from '../shared/auth/auth.service'

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    ngOnInit() {}

    title: String = 'User Registration';
    hide = true;
    form: FormGroup;

    constructor(private router: Router, public fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
      this.form = this.fb.group({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      });
    }

    // Test submission output
    onSubmit(){
        console.log(JSON.stringify(this.form.value));

        const username = this.form.controls['username'].value;
        const email = this.form.controls['email'].value;
        const password = this.form.controls['password'].value;

        this.authService.register(username, email, password)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/login'], {queryParams: { registered: 'true' } })
          },
          error: (error) => console.log(error),
        });
    }

}
