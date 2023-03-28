import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {

  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.verify()
      .subscribe({
        next: (response) => {
          this.isLoggedIn = true;
          console.log(JSON.stringify(response));
        }, 
        error: (error) => {
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
          console.log(error);
        }
    });
  }
}
