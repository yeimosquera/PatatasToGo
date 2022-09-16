import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubscribersService } from '../services/subscribers.service';



@Component({
  selector: 'app-create-subscriber',
  templateUrl: './create-subscriber.component.html',
  styleUrls: ['./create-subscriber.component.css']
})


export class CreateSubscriberComponent implements OnInit {

  countries!: any[]
  form: FormGroup

  constructor(
    private _snackBar: MatSnackBar,
    private _subscribersService: SubscribersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      countrie: ['', Validators.required],
      phone: ['', Validators.required],
      jobtitle: '',
      area: ''
    })
  }

  ngOnInit(): void {
    this._subscribersService.getCountries().subscribe(response => {
      console.log(response.Data);

      this.countries = response.Data
    }, err => {
      500
      this.error('Algo salió mal en tu solicitud.');

    })
  }


  addSubscribe() {

    const ubscribe = {
      Name: this.form.value.name,
      Email: this.form.value.email,
      CountryCode: this.form.value.countrie.Code,
      CountryName: this.form.value.countrie.Name,
      PhoneCode: this.form.value.countrie.PhoneCode,
      PhoneNumber: this.form.value.phone,
      JobTitle: this.form.value.jobtitle,
      Area: this.form.value.area
    }

    this._subscribersService.addSubscribers(ubscribe).subscribe(response => {
      this.success('Suscriptor creado con éxito');
      this.router.navigate(['suscriptores']);
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

}
