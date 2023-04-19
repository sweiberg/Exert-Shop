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
  isLoggedIn = true;
  isLoginFailed = false;
  congrats = '';
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private storageService: StorageService,
    public authService: AuthService)
  {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.authService.verify()
      .subscribe({
        next: (response) => {
          this.isLoggedIn = true;
          this.router.navigate(['/profile'], {queryParams: {user: JSON.stringify(response.data)}});
        },
        error: (error) => {
          this.isLoggedIn = false;
        }
      });

    this.route.queryParams
      .subscribe(params => {
        if(params['registered'] !== undefined && params['registered'] === 'true') {
          this.congrats = 'Registration Successful! Please Login!';
          this._snackBar.open(this.congrats, '', {duration: 99999999999, panelClass: ['simple-snack-bar']});
        }
      });
  }

  onSubmit(): void {
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;

    this.authService.login(username, password)
      .subscribe({
        // Here we want to store the JWT token globally after login to then use on verified routes
        next: (response) => {
          this.storageService.set(response);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/profile'], {queryParams: {user: JSON.stringify(response.data)}});
          location.reload();
        },
        error: (error) => {
          console.log(error);
          this.isLoginFailed = true;
        }
      });
  }
}
