import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { ProfileService } from '../shared/user/profile.service'
import { StorageService } from '../shared/auth/storage.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {

  isLoggedIn = false;
  isProfile = false;
  user: any = {};
  event: any;
  avatar: any;
  filter = this.route.snapshot.queryParamMap.get('user')
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private profileService: ProfileService, private storageService: StorageService) {}

  ngOnInit() {
    
    if (this.filter == this.storageService.user) {
      this.isProfile = true;
    }

    this.profileService.accessProfile(this.filter)
      .subscribe({
        next: (response) => {
          this.user = response.data;
          this.avatar = this.user.username.charAt(0).toUpperCase();
        }, 
        error: (error) => {
          this.router.navigate(['/']);
          console.log(error);
        }
    });
  }

  openInbox() {
    this.router.navigate(['/inbox'], {queryParams: {user: this.filter}});
  }

  sendMessage() {
    this.router.navigate(['inbox/send'], {queryParams: { user: this.filter }});
  }
}
