import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscriber } from '../../../../interfaces/subscriber'
import { SubscribersService } from '../../services/subscribers.service';


@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})


export class ModalDeleteComponent implements OnInit {

  id: number = 0
  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subscriber,
    private _subscribersService: SubscribersService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  deleteSubscriber(elementId: number) {
    this._subscribersService.deleteSubscriber(elementId).subscribe(response => {
      this.success('Eliminado con éxito.')
    }, err => {
      500
      this.error('Algo salió mal en tu solicitud.');

    })
  }

  error(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error']
    });
  }

  success(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['success']
    });
  }


}
