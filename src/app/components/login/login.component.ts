import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { SubscribersService } from 'src/app/components/subscribers/services/subscribers.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  loading = false

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _subscribersService: SubscribersService, private router: Router) {
    this.formLogin = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  login() {

    const parans = {
      UserName: this.formLogin.value.user,
      Password: this.formLogin.value.password
    }

    this._subscribersService.login(parans).subscribe(response => {
      this.loading = true
      localStorage.setItem("Token", response.Token);
      this.router.navigate(['suscriptores']);

    }, err => {
      500
      this.error(err.error.error);
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
