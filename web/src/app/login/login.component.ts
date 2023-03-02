import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  title: String = 'User Login';
  hide = true;
  congrats = '';
  form: FormGroup;

  constructor(private route:ActivatedRoute, private router:Router, public fb: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
   }

    ngOnInit() {
      this.route.queryParams
      .subscribe(params => {
        if(params['registered'] !== undefined && params['registered'] === 'true') {
            this.congrats = 'Registration Successful! Please Login!';
            this._snackBar.open(this.congrats, '', {duration: 99999999999, panelClass: ['simple-snack-bar']});
        }
      });
    }

    onSubmit(){
      console.log(JSON.stringify(this.form.value));

      return this.http.post('http://localhost:4300/auth/login', this.form.value, {
        headers: { 'Content-Type': 'application/json' }, responseType: 'json', observe: 'response'
      })
      .subscribe({
        // Here we want to store the JWT token globally after login to then use on verified routes
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }
}
