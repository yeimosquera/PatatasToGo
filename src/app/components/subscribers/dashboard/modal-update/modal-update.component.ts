import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscriber } from 'src/app/interfaces/subscriber';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css']
})
export class ModalUpdateComponent implements OnInit {

  countries!: any[]
  form: FormGroup

  constructor(
    private _snackBar: MatSnackBar,
    private _subscribersService: SubscribersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataUpdate: Subscriber
  ) {
    this.form = this.formBuilder.group({
      name: [dataUpdate.Name, Validators.required],
      email: [dataUpdate.Email, Validators.required],
      countrie: ['', Validators.required],
      phone: [dataUpdate.PhoneNumber, Validators.required],
      jobtitle: dataUpdate.JobTitle,
      area: dataUpdate.Area
    })
  }

  ngOnInit(): void {
    this._subscribersService.getCountries().subscribe(response => {
      this.countries = response.Data
    }, err => {
      500
      this.error('Algo salió mal en tu solicitud.');

    })
  }

  updateSubscribe() {
    const ubscribe = {
      Id: this.dataUpdate.Id,
      Name: this.form.value.name,
      Email: this.form.value.email,
      CountryCode: this.form.value.countrie.Code,
      PhoneNumber: this.form.value.countrie.PhoneCode,
      Area: this.form.value.area,
      JobTitle: this.form.value.jobtitle
    }

    this._subscribersService.updateSubscriber(ubscribe).subscribe(response => {
      this.success('Suscriptor editado con éxito');
      this.router.navigate(['suscriptores']);
    }, err => {
      500
      this.error('Algo salió mal en tu solicitud.');

    })
  }

  error(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
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

  closeModal(): void {
    this.dialog.closeAll();
  }

}
