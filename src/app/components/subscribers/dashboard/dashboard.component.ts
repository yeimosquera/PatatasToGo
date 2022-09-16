import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscribersService } from '../services/subscribers.service';
import { Subscriber } from 'src/app/interfaces/subscriber';


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
  dataSource = ELEMENT_DATA;

  constructor(private _snackBar: MatSnackBar,
    private _subscribersService: SubscribersService) { }

  ngOnInit(): void {
    this.loadTableSubscribers();
  }

  loadTableSubscribers() {
    this._subscribersService.getSubscribers().subscribe(response => {
      this.dataSource = response.Data;
    }, err => {
      500
      this.error('Algo salió mal en tu solicitud.');

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



}
