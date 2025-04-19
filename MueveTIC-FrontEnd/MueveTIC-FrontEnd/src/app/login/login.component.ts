import { Component} from '@angular/core';
import { AccountService } from '../account.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email: string = '';
  password: string = '';
  role: string = '';
  otpCode: string = ""
  registered : boolean = false


  constructor(private AccountService: AccountService, private router: Router) {
  }
  verifyTfa() {
    let info = {
      email: this.email,
      code: this.otpCode
    };

    this.AccountService.verifyCode(info)
      .subscribe({
        next: (response) => {
          setTimeout(() => {
            console.log(response.token);
            sessionStorage.setItem('role', response.role);
            sessionStorage.setItem('email', this.email);
            sessionStorage.setItem('token', response.token);
            if (response.role === 'ROLE_ADMIN') {
              this.router.navigate(['admin']);
            }else if (response.role === 'ROLE_MANTENANCE') {
              this.router.navigate(['personal']);
            }else if (response.role === 'ROLE_USER') {
              this.router.navigate(['user']);
            }

          }, 3000);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El código no es válido. Por favor, inténtalo de nuevo.',
          });
        }
      });
  }

  login() {
    let info = {
      email: this.email,
      password: this.password,
    };

    if (this.email === '' || this.password === '') {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.AccountService.login(info).subscribe({
        next: (respuesta: any) => {
          if (respuesta.role === "") {
            this.registered = true
          }
          sessionStorage.setItem('role', respuesta.role);
          sessionStorage.setItem('email', this.email);
          sessionStorage.setItem('token', respuesta.token);
          console.log(respuesta.token);
          if (respuesta.role === 'ROLE_ADMIN') {
            this.router.navigate(['admin']);
          }else if(respuesta.role === 'ROLE_MANTENANCE') {
            this.router.navigate(['personal']);
          }
        },
        error: (error) => {
          if(error.error.message === "User has been blocked") {
            Swal.fire({
              title: 'Has consumido tus 5 intentos',
              text: 'Póngase en contacto con un administrador para reactivar su cuenta',
              icon: 'error',
              confirmButtonText: 'Aceptar'
          });
          }else if(error.error.message === "User is blocked") {
            Swal.fire({
              title: 'Usuario bloqueado',
              text: 'Póngase en contacto con un administrador para reactivar su cuenta',
              icon: 'error',
              confirmButtonText: 'Aceptar'
          });
          }else {
            Swal.fire({
              title: 'Error',
              text: `Combinación de usuario y contraseña incorrecta. Le quedan ${error.error.message} intentos`,
              icon: 'error',
              confirmButtonText: 'Aceptar'
          });
          }
    }
  });
}
}
}
