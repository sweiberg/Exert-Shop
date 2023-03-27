import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth/auth.service'
import { StorageService } from '../shared/auth/storage.service'

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  title: String = 'User Login';
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  congrats = '';
  form: FormGroup;

  constructor(private route:ActivatedRoute, private router:Router, public fb: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar, private storageService: StorageService, private authService: AuthService) {
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

    onSubmit(): void {
      console.log(JSON.stringify(this.form.value));

      const username = this.form.controls['username'].value;
      const password = this.form.controls['password'].value;

      this.authService.login(username, password)
      .subscribe({
        // Here we want to store the JWT token globally after login to then use on verified routes
        next: (response) => {
          this.storageService.set(response.jwt);
          console.log(JSON.stringify(response.jwt));
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/profile']);
        },
        error: (error) => { 
          console.log(error);
          this.isLoginFailed = true;
        }
      });
  }
}
