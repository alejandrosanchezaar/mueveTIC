import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Car,Motorcycle,Scooter,Booking } from '../interfaces';
import { PersonalService } from '../personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  cars_list: Car[] = [];
  motorcycle_list:Motorcycle[]=[];
  scooters_list:Scooter[]=[];
  booking_lists:Booking[]=[];
  filter: string = '';
  menu: string = 'reservar';
  email: string = sessionStorage.getItem('email') ?? '';



  constructor(private router: Router,private PersonalService:PersonalService, private http:HttpClient){
    /*Cargar las listas*/
    this.updateLists();
  }
  getNameUser(email:string){
    // Divide el correo electrónico en partes usando el símbolo '@'
    const userName= email.split('@');
    // Devuelve la primera parte del correo, que se asume como el nombre de usuario
    return userName[0];
  }

  logout(){
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Está seguro de que quiere cerrar sesión?',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }})


  }
/*Método Cmbiar Menú*/
  changeMenu(opcion: string) {
      this.menu = opcion;
      this.updateLists();

}
/*Método Reserva de Vehículo*/
reserveVehicle(model:string, licensePlate:string){
  Swal.fire({
    title: 'Reservar Vehículo',
    text: '¿Está seguro de que quiere reservar el vehículo: ' + model + ' con matrícula: ' + licensePlate + ' para cargarlo?',
    icon: 'info',
    confirmButtonText: 'Aceptar',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      let info = {
        email: sessionStorage.getItem('email'),
        licensePlate: licensePlate,
      };


      this.PersonalService.reserveChargingVehicle(info).subscribe({
        next: (respuesta: any) => {
          this.booking_lists=respuesta;
          Swal.fire({
            title: 'Reserva Realizada',
            text: 'Reserva Realizada para el vehículo: ' + model + ' con matrícula: ' + licensePlate + '.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
            /*Actualización listas*/
              this.updateLists()

        },
        error: (error) => {
          if (error.status == 409) {
            Swal.fire({
              title: 'Máximo de reservas',
              text: 'Ha alcanzado el número máximo de reservas de carga',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });

          this.changeMenu('cargar')
          }
    }})
  }
})
}
/*Método Cargar Vehículo*/
chargeVehicle(index:number, model:string, licensePlate:string){

  Swal.fire({
    title: 'Cargar Vehículo',
    text: '¿Está seguro de que quiere cargar el vehículo: ' + model + ' con matrícula: ' + licensePlate + ' .',
    icon: 'info',
    confirmButtonText: 'Aceptar',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){


      this.PersonalService.chargeVehicle(licensePlate).subscribe({
        next: (respuesta: any) => {
          /*Petición Eliminar Vehículo de listas Pendientes */
          this.PersonalService.removeChargeVehicle(sessionStorage.getItem('email'), licensePlate).subscribe(
            respuesta=>{
              /*Actualización listas*/
              this.updateLists();
              Swal.fire({
                title: 'Cargar Vehículo',
                text: 'Carga Realizada para el vehículo: ' + model + ' con matrícula: ' + licensePlate + ' correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
            }
          )



        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });

    }})
  }
})

}
/*Método Cncelar Reserva de Vehículo*/
cancelCharge(index:number,  model:string, licensePlate:string){
  Swal.fire({
    title: 'Cancelar Reserva Vehículo',
    text: '¿Está seguro de que quiere cancelar la reserva para cargar el vehículo: ' + model + ' con matrícula: ' + licensePlate + ' .',
    icon: 'warning',
    confirmButtonText: 'Aceptar',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      this.PersonalService.removePendingChargingVehicle(sessionStorage.getItem('email'),licensePlate).subscribe({
        next: (respuesta: any) => {
          Swal.fire({
            title: 'Cancelar Reserva Vehículo',
            text: 'Reserva de Carga Cancelada para el vehículo: ' + model + ' con matrícula: ' + licensePlate + ' correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
            this.updateLists();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
    }})
  }
})

}

/*Método Actualizar y Cargar Listas*/
updateLists(){
  this.PersonalService.consultLowBatteryCar().subscribe(
    respuesta=>{
      this.cars_list=respuesta;
    }
  )
  this.PersonalService.consultLowBatteryMotorcycle().subscribe(
    respuesta=>{
      this.motorcycle_list=respuesta;
    }
  )
  this.PersonalService.consultlowBatteryScooter().subscribe(
    respuesta=>{
      this.scooters_list=respuesta;
    }
  )
  this.PersonalService.consultPendingChargingVehicle(sessionStorage.getItem('email')).subscribe(
    respuesta=>{
      this.booking_lists=respuesta;
      }
    )
  }
}

