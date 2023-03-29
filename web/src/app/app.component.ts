import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import data from './searchdata.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './shared/auth/auth.service'
import { Router } from '@angular/router';
import { StorageService } from './shared/auth/storage.service';

interface Search {
  title: string;
  cat: string;
  subcat: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title: String = 'Exert Shop';
  isLoggedIn = false;
  myControl = new FormControl('');

  search: Search[] = data;

  options: string[] = this.search.map(search => search.title);
  category: string[] = this.search.map(search => search.cat);

  filteredOptions!: Observable<string[]>;
  @ViewChild(MatMenuTrigger, { static: false })
  trigger!: MatMenuTrigger;
  recheckIfInMenu!: boolean;

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) {}

  public user: any;
  
  ngOnInit() {
    this.authService.verify()
    .subscribe({
      next: (response) => {
        this.isLoggedIn = true;
        this.user = response;
      }, 
      error: (error) => {
        this.isLoggedIn = false;
      }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.recheckIfInMenu = false;
  }

  openResourceMenu() {
    this.trigger.openMenu();
  }

  closeResourceMenu() {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        this.trigger.closeMenu();
      }
    }, 175);
  }

  Profile() {
    this.router.navigate(['/profile'], {queryParams: {user: this.user.data}});
  }

  Logout() {
    this.storageService.clean();
    this.authService.isLoggedIn = false;
    location.reload();
  }

  Login() {
    this.router.navigate(['/login']);
  }

  Register() {
    this.router.navigate(['/register']);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
 }
