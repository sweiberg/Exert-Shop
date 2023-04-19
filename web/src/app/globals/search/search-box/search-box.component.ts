import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
})
export class SearchBoxComponent {
  constructor(public dialog: MatDialog, private appComponent: AppComponent) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
