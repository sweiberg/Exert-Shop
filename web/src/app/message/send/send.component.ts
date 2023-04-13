import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth/auth.service'
import { ProfileService } from '../../shared/user/profile.service'

@Component({
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class MessageSendComponent {
  form: FormGroup;
  isLoggedIn = false;
  sender: any;
  user: any;
  filter = this.route.snapshot.queryParamMap.get('user');

  ngOnInit() {
    this.authService.verify()
    .subscribe({
      next: (response) => {
        this.isLoggedIn = true;
        this.sender = response.data;
      }, 
      error: (error) => {
        this.isLoggedIn = false;
        this.router.navigate(['/']);
      }
    });

    this.profileService.accessProfile(this.filter)
    .subscribe({
      next: (response) => {
        this.user = response.data;
        this.form.controls['recipient'].disable();
        this.form.controls['recipient'].setValue(this.user.username);
      }, 
      error: (error) => {
        this.router.navigate(['/']);
        console.log(error);
      }
      
  });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private profileService: ProfileService)
  {
    this.form = this.fb.group({
      recipient: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    var formData: any = new FormData();
    formData.append('subject', this.form.get('subject')?.value);
    formData.append('message', this.form.get('message')?.value);
    formData.append('parentID', this.sender)
    formData.append('receiverID', this.filter);

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    this.http.post(
      'http://localhost:4300/api/sendmessage', JSON.stringify(formData)
    ).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
    });
  }
}
