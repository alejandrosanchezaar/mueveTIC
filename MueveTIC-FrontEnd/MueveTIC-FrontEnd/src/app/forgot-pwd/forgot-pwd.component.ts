import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent {

  email? : string
  constructor(private AccountService : AccountService) { }

forgotpwd(){
  let info = {
    email : this.email,
  }
  if (this.email == null){
    Swal.fire({
      title: 'Error',
      text: 'Por favor, rellene su email',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  } else {
    this.AccountService.forgotpwd(info).subscribe({
      next: (respuesta: any) => {
        localStorage.setItem("email", this.email!);
        Swal.fire({
          title: 'Success',
          text: 'An email has been sent to you to recover your password. Please check it.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

      },
      error: (error: any) => {
        console.log(error)
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
}
