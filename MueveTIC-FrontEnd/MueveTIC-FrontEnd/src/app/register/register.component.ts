import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  pwd2 = '';
  birthdate = '';
  carnet = '';
  dni = '';
  numberPhone = '';
  surname = '';
  role = 'ROLE_USER';
  calendarClicked = false;
  registered : boolean = false
  secretImageUri? : string
  otpCode: string = ""

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: 70 }, (_, i) => this.currentYear - i - 16);

  selectedDay: number | undefined;
  selectedMonth: string | undefined;
  selectedYear: number | undefined;
  currentDate: string;

  constructor(private http: HttpClient, private accountService: AccountService,private router: Router) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que enero es 0
    const day = today.getDate().toString().padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }

  register() {
    if (this.validateForm()) {
      if (this.selectedDay && this.selectedMonth && this.selectedYear){
        this.birthdate = `${this.selectedYear}-${this.selectedMonth?.padStart(2, '0')}-${this.selectedDay?.toString().padStart(2, '0')}`;
      }
      const userInfo = this.prepareUserInfo();
      this.accountService.register(userInfo).subscribe({
        next: (response: any) => {
          this.showSuccessMessage();
          this.secretImageUri = response.qrdata
          this.registered = true
        },
        error: (error: any) => {
          if (error.status === 409) {
          this.showErrorMessage("No fue posible completar el registro, pruebe con otro correo electrónico.");
        }else{
          this.showErrorMessage("No fue posible completar el registro, inténtelo de nuevo más tarde.");
        }
      }
      });
    }
  }

  verifyTfa() {
    let info = {
      email : this.email,
      code : this.otpCode
    }
    this.accountService.verifyCode(info)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: '¡Código correcto!',
            text: 'Código verificado correctamente',
            confirmButtonText: 'Aceptar'
          });
          setTimeout(() => {
            this.router.navigate(['login']);
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

  private validateForm(): boolean {
    if (!this.name || !this.email || !this.password || !this.pwd2 || !this.dni || !this.numberPhone || !this.surname) {
      this.showErrorMessage('Por favor, completa todos los campos obligatorios.');
      return false;
    } else if (this.dni.length !== 9 || !/^\d{8}[A-Za-z]$/.test(this.dni)) {
      this.showErrorMessage('El DNI introducido no es válido.');
      return false;
    } else if (!/.*[a-zA-Z]/.test(this.surname)) {
      this.showErrorMessage('Debe introducir los dos apellidos.');
      return false;
    } else if (this.numberPhone.length !== 9 || !/^\d{9}$/.test(this.numberPhone)) {
      this.showErrorMessage('El teléfono introducido no es válido.Debe tener 9 dígitos.');
      return false;
    } else if (!(/.*@.*\..*/.test(this.email))) {
      this.showErrorMessage('El email introducido no es válido.');
      return false;
    } else if (this.password.length < 8 || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(this.password)) {
      this.showErrorMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      return false;
    } else if (this.password !== this.pwd2) {
      this.showErrorMessage('Las contraseñas no coinciden.');
      return false;
      }else if( this.selectedDay && this.selectedMonth && this.selectedYear && (new Date(`${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`) > new Date(this.currentDate))){
      this.showErrorMessage('La fecha de nacimiento no puede ser posterior a la fecha actual.');
      console.log (new Date(`${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`) > new Date(this.currentDate))
      return false;
      }
    return true;
  }

  private prepareUserInfo() {
    return {
      email: this.email,
      name: this.capitalizeName(this.name),
      surname: this.capitalizeName(this.surname),
      dni: this.dni,
      password: this.password,
      role: this.role,
      carnet: this.carnet,
      numberPhone: this.numberPhone,
      birthDate: this.birthdate
    };
  }

  capitalizeName(name: string) {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  private showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  private showSuccessMessage() {
    Swal.fire({
      title: 'Warning',
      text: 'Para poder confirmar el registro, debe seguir las instrucciones que se muestran a continuación y verificar su cuenta mediante el correo electrónico que le hemos enviado.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
  }


}
