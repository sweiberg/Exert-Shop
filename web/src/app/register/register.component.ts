import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router'

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  
    ngOnInit() {}

    title: String = 'User Registration';
    hide = true;
    form: FormGroup;

    constructor(private router: Router, public fb: FormBuilder, private http: HttpClient) {
      this.form = this.fb.group({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      });
    }

    // Test submission output
    onSubmit(){
        console.log(JSON.stringify(this.form.value));

        return this.http.post('http://localhost:4300/auth/register', this.form.value, { 
          headers: { 'Content-Type': 'application/json' }, responseType: 'json', observe: 'response' 
        })
        .subscribe({
          next: (response) => this.router.navigate(['/login'], {queryParams: { registered: 'true' } }),
          error: (error) => console.log(error),
        });
    }

}