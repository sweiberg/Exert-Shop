import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import data from 'src/app/searchdata.json';

interface Search {
  title: string;
  cat: string;
  subcat: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myControl = new FormControl('');

  search: Search[] = data;

  options: string[] = this.search.map(search => search.title);
  category: string[] = this.search.map(search => search.cat);

  filteredOptions!: Observable<string[]>;
  @ViewChild(MatMenuTrigger, { static: false })
  trigger!: MatMenuTrigger;
  recheckIfInMenu!: boolean;

  ngOnInit() {
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
 }
