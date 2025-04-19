import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent {
newPassword: string = '';
newPassword2: string = '';


constructor(private http: HttpClient,private AccountService : AccountService ) {}
resetPwd(){
  if (!this.newPassword || !this.newPassword2) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos obligatorios.'
    });
  } else if (this.newPassword.length < 8 ||
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(this.newPassword)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
      });
  } else if (this.newPassword !== this.newPassword2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.'
      });
    }else {
                // Obtén la URL actual del navegador
        const currentURL = window.location.href;

        // Parsea la URL para obtener sus parámetros
        const url = new URL(currentURL);

        // Obtén el valor del parámetro "email"
        const email = url.searchParams.get('email');

        console.log(`Valor del parámetro email: ${email}`);

      let info = {
        email : email,
        password : this.newPassword,
      }
        this.AccountService.resetpwd(info).subscribe({
          next: (respuesta: any) => {
            Swal.fire({
              icon: 'success',
              title: 'RESET PASSWORD',
              text: 'Contraseña cambiada correctamente.'
            });
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }

}
disablePaste(event: ClipboardEvent) {
  event.preventDefault();
}

}


