import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscribersService } from '../services/subscribers.service';
import { Subscriber } from 'src/app/interfaces/subscriber';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalUpdateComponent } from './modal-update/modal-update.component';




const ELEMENT_DATA: Subscriber[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'numero',
    'name',
    'pais',
    'area',
    'telefono',
    'correo',
    'titulo',
    'opciones'
  ];
  dataSource = new MatTableDataSource<Subscriber>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private _snackBar: MatSnackBar,
    private _subscribersService: SubscribersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTableSubscribers();
  }

  loadTableSubscribers() {
    this._subscribersService.getSubscribers().subscribe(response => {
      this.dataSource = new MatTableDataSource<Subscriber>(response.Data);
      this.dataSource.paginator = this.paginator;

    }, err => {
      500
      this.error('Algo salió mal en tu solicitud.');

    });
  }

  openDialogDelete(element: any): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '250px',
      data: { Id: element.Id, Name: element.Name },
    });
  }

  openDialogUpdate(element: any): void {
    const dialogRef = this.dialog.open(ModalUpdateComponent, {
      width: '80%',
      data: element,
    });
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
