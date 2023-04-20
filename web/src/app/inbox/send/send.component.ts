import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth/auth.service';
import { ProfileService } from '../../shared/user/profile.service';
import { MessageService } from '../../shared/message/message.service';

@Component({
  selector: 'send-message',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class MessageSendComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  sender: any;
  user: any;
  @Input() userID = this.route.snapshot.queryParamMap.get('user');

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

    this.profileService.accessProfile(this.userID)
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
    private authService: AuthService,
    private profileService: ProfileService,
    private messageService: MessageService
    )
  {
    this.form = this.fb.group({
      recipient: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const subject = this.form.controls['subject'].value;
    const message = this.form.controls['message'].value;
    const parentID = 1;
    const receiverID = Number(this.userID);

    this.messageService.sendMessage(subject, message, parentID, receiverID)
    .subscribe({
        next: (response) => {
          console.log(response);
          location.reload();
        },
        error: (error) => {
          console.log(error);
        }
    });
  }
}
