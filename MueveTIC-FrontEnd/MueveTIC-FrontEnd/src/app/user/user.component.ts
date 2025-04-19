import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Car,Motorcycle,Scooter,Booking } from '../interfaces';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  matricula: string | undefined ;
  modelo: string | undefined;
  estado: string | undefined;
  fecha: string | undefined;
  selectedDay: number | undefined;
  selectedMonth: number | undefined;
  selectedYear: number | undefined;
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: 70 }, (_, i) => this.currentYear - i - 16);

  comentario: string | undefined;
  puntuacion: number = 0;
  nombre: string | undefined;
  apellidos : string | undefined;
  correo: string | undefined;
  movil: string | undefined;
  dni: string | undefined;
  carne: string | undefined;
  fechaNacimiento: string | undefined;
  fechaReserva: string | undefined;
  contrasena: string | undefined;
  contrasenaLeida: string | undefined;
  puntuacionReservaActiva: number = 0;
  mostrarFormValoracion: boolean = false;

  cars_list: Car[] = [];
  motorcycle_list:Motorcycle[]=[];
  scooters_list:Scooter[]=[];
  booking_list:Booking[]=[];
  ratingCar_list:any[]=[];
  ratingMoto_list:any[]=[];
  ratingScooter_list:any[]=[];
  count_active_booking: number = 0;


  filter: string = '';
  menu: string = '';
  email: string = sessionStorage.getItem('email') ?? '';

  constructor(private router: Router,private userService : UserService, private http:HttpClient, private AdminService: AdminService){
    this.updateLists();
    this.menu='home';
  }
  maxCharacters: number = 50;
  tooltipText: string = '';
  updateTooltip(): void {
    const remaining = this.remainingCharacters;
    this.tooltipText =
      remaining >= 0
        ? `Caracteres restantes: ${remaining}`
        : `Excedido por ${Math.abs(remaining)} caracteres (Max ${this.maxCharacters})`;
  }

  get remainingCharacters(): number {
    return this.maxCharacters - (this.comentario?.length ?? 0);
  }



  obtenerClaseEstrella(index: number) {
    if (this.puntuacion == null) {
      return {};
    }
    return {
      'star-activa': index < this.puntuacion,
      'star-unfilled': index >= this.puntuacion,
    };
  }
  obtenerReservaActiva(){
    this.userService.consultUserBooking().subscribe({
      next: (response) => {
        this.matricula = response.vehicle.licensePlate;
        this.modelo = response.vehicle.model;
        this.estado = "Activa"
        this.fechaReserva = response.date;
        if (this.matricula == undefined){
          swal.fire('Información', 'Actualmente no tiene ninguna reserva activa. Reserva primero uno de nuestros vehículos', 'info');
        }
      },
      error: (error) => {
        swal.fire('Error', error, 'error');
      },
    });
  }
  saveReserva(){
    if (this.matricula == null) {
      swal.fire('Error', 'No hay ninguna reserva activa. Reserva primero uno de nuestros vehículos', 'error');
      this.menu = 'reservar';
      return;
    }
    swal.fire({
      title: '¿Estás seguro?',
      text: 'Va a finalizar la reserva. Para finalizar el procedimiento, debe dejar una puntuación al servicio y opcionalmente un comentario.Al guardar valoración,la reserva se dará por finalizada',
      icon: 'warning',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar',
      confirmButtonText:'Confirmar',
    })
    .then((result) => {
      if(result.isConfirmed){
        this.puntuacionReservaActiva=0;
        this.puntuacion=0;
        this.mostrarFormValoracion = true;
      }
    });

  }

  anularReserva() {
    if (this.matricula == null) {
      swal.fire('Error', 'No hay ninguna reserva activa. Reserva primero uno de nuestros vehículos', 'error');
      this.menu = 'reservar';
      return;
    }

    swal.fire({
      title: '¿Estás seguro?',
      text: 'Va a anular la reserva. Esta acción no se puede deshacer',
      icon: 'warning',
      confirmButtonColor: '#79ed83',
      showCancelButton: true,
      cancelButtonColor: '#fa5050',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.userService.cancelUserBooking().subscribe({
          next: () => {
            swal.fire('Reserva anulada', 'Reserva anulada con éxito', 'success');
            this.resetReservaActiva();
            this.menu = 'home';
            this.count_active_booking=0;
          },
          error: (error) => {
            swal.fire('Error', error.error, 'error');
          },
        });
      }
    });
  }

  resetReservaActiva() {
    this.matricula = undefined;
    this.modelo = undefined;
    this.estado = undefined;
    this.fechaReserva = undefined;
    this.comentario = undefined;
    this.puntuacionReservaActiva=0;
  }
  confirmReserva(){
    if (this.puntuacionReservaActiva == 0) {
      swal.fire('Error', 'Debe puntuar el servicio', 'error');
      return;
    }
    if (this.comentario == null){
      this.comentario = ' ';
    }
    if (this.comentario.length > 50) {
      swal.fire('Error', 'El comentario no puede exceder los 50 caracteres', 'error');
      return;
    }
    let info = {
      email: sessionStorage.getItem('email'),
      rating: this.puntuacionReservaActiva,
      comment: this.comentario,
    };
    this.userService.confirmReserva(info).subscribe({
      next: () => {
        swal.fire('Reserva finalizada', 'Reserva finalizada con éxito', 'success');
        this.menu = 'home';
        this.count_active_booking=0;
        this.resetReservaActiva();
        this.mostrarFormValoracion = false;
      },
      error: (error) => {
        swal.fire('Error', error.error, 'error');
      },
      },
    );
  }


  consultarPerfil(){
    this.userService.consultarPerfil().subscribe({
      next: (response) => {
        this.nombre = response.name;
        this.apellidos = response.surname;
        this.correo = response.email;
        this.movil = response.numerPhone;
        this.dni = response.dni;
        this.carne = response.carnet;
        const birthDateParts = response.birthDate.split('-');
        this.selectedYear = parseInt(birthDateParts[0]);
        this.selectedMonth = parseInt(birthDateParts[1]);
        this.selectedDay = parseInt(birthDateParts[2]);
        this.contrasenaLeida = response.password;
      },
      error: (error) => {
        swal.fire('Error', error, 'error');
      },
    });
  }
  updatePerfil() {
    if (!this.validateDNI(this.dni)) {
      swal.fire('Error', 'El DNI no tiene el formato correcto.Debe constar de 9 caracteres, siendo 8 números y una letra final', 'error');
      return;
    }

    if (!this.validatePhoneNumber(this.movil)) {
      swal.fire('Error', 'El número de teléfono no tiene el formato correcto. Deben ser 9 números', 'error');
      return;
    }
    if (!this.validateName(this.nombre)) {
      swal.fire('Error', 'El nombre no puede contener números', 'error');
      return;
    }

    if (!this.validateName(this.apellidos)) {
      swal.fire('Error', 'Los apellidos no pueden contener números', 'error');
      return;
    }

    if (!this.validatePassword(this.contrasena)) {
      swal.fire('Error', 'La contraseña no cumple con los requisitos.Debe tener una longitud de al menos 8 caracteres, 1 mayúscula, 1 número, una minúscula y un símbolo', 'error');
      return;
    }
    if (!this.validateBothLastNames(this.apellidos)) {
      swal.fire('Error', 'Por favor, introduce ambos apellidos', 'error');
      return;
    }
    if (this.contrasena !== this.contrasenaLeida) {
      let info = {
        email: this.correo,
        name: this.nombre,
        surname: this.apellidos,
        numberPhone: this.movil,
        dni: this.dni,
        carnet: this.carne,
        birthDate: `${this.selectedYear}-${String(this.selectedMonth)?.toString().padStart(2, '0')}-${String(this.selectedDay)?.toString().padStart(2, '0')}`,
        password: this.contrasena,
      };
      this.userService.updatePerfil(info).subscribe({
        next: () => {
          swal.fire('Perfil actualizado', 'Perfil actualizado con éxito', 'success');
        },
        error: (error) => {
          swal.fire('Error', error.error, 'error');
        },
      });
    } else {
      let info = {
        email: this.correo,
        name: this.nombre,
        surname: this.apellidos,
        numberPhone: this.movil,
        dni: this.dni,
        carnet: this.carne,
        birthDate: `${this.selectedYear}-${String(this.selectedMonth)?.toString().padStart(2, '0')}-${String(this.selectedDay)?.toString().padStart(2, '0')}`,
      };
      this.userService.updatePerfil(info).subscribe({
        next: () => {
          swal.fire('Perfil actualizado', 'Perfil actualizado con éxito', 'success');
        },
        error: (error) => {
          swal.fire('Error', error.error, 'error');
        },
      });
    }
  }

  validatePassword(password: string | undefined): boolean {
   return !(
      password &&
      (password.length < 8 || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password))
    );
  }


  validateDNI(dni: string | undefined): boolean {
    // Validar que el DNI tenga 8 números y 1 letra al final
    const regex = /^\d{8}[a-zA-Z]$/;
    return regex.test(dni ?? '');
  }

  validatePhoneNumber(phoneNumber: string | undefined): boolean {
    // Validar que el número de teléfono tenga 9 números
    const regex = /^\d{9}$/;
    return regex.test(phoneNumber ?? '');
  }
  validateName(name: string | undefined): boolean {
    // Permitir letras, espacios y tildes en el nombre
    const regex = /^[a-zA-Z\s\u00C0-\u00FF']+$/;
    return regex.test(name ?? '');
  }

  validateBothLastNames(apellidos: string | undefined): boolean {
    if (!apellidos) {
      return false;
    }

    const nombres = apellidos.trim().split(/\s+/); // Dividir por espacios

    return nombres.length >= 2;
  }

  back(){
   this.menu='home';
  }
  deleteAccount(){
    let info = {
      email: sessionStorage.getItem('email'),
    };
    this.userService.deleteUser(info).subscribe({
      next: () => {
        swal.fire('Cuenta eliminada', 'Cuenta eliminada con éxito', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        swal.fire('Error', error.error, 'error');
      },
  }
  );
  }



    /*Sacar la media de la lista*/
  getMean(model:string,rating_list: any[]):number{
        this.puntuacion =0;
        for(let rating of rating_list){
          if(rating.model == model){
            this.puntuacion = rating.mean;
          }
        }
        return this.puntuacion;

}

fillStars(index: number, model: string, rating_list:any[]) {
  this.getMean(model,rating_list)
  if (this.puntuacion == null) {
    return {};
  }

  return {
    'star-activa': index < this.puntuacion,
    'star-unfilled': index >= this.puntuacion,
  };
}

    getNameUser(email:string){
      const userName= email.split('@');
      return userName[0];
    }

    logout(){
      swal.fire({
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

    changeMenu(opcion: string) {
        this.menu = opcion;
        this.updateLists();
        if (opcion == 'reserva_activa') {
          this.obtenerReservaActiva();
        }else if(opcion == 'perfil'){
          this.consultarPerfil();
        }

  }
    makeBooking(index:number, model:string, licensePlate:string){
        swal.fire({
          title: 'Reservar Vehículo',
          text: '¿Está seguro de que quiere reservar el vehículo: ' + model + ' con matrícula: ' + licensePlate + '.',
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

            /*PETICIÓN RESERVA*/
            this.userService.createBooking(info).subscribe({
              next: (respuesta: any) => {
                swal.fire({
                  title: 'Reserva Realizada',
                  text: 'Reserva Realizada para el vehículo: ' + model + ' con matrícula: ' + licensePlate + '.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then((result)=>{
                  if(result.isConfirmed){
                    this.count_active_booking=1;
                    this.obtenerReservaActiva();
                    this.changeMenu('reserva_activa')
                    }});
                    /*La cargas por si acaso no le diera a aceptar en la alerta*/
                    this.count_active_booking=1;
                    this.obtenerReservaActiva();

              },

              error: (error) => {
                swal.fire({
                  title: 'Error',
                  text: error.error,
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });

          }})
        }
      })

 }


 updateLists(){
  this.userService.getCars().subscribe(
    respuesta=>{
      this.cars_list=respuesta;
    }
  )
  this.userService.getMotorcycles().subscribe(
    respuesta=>{
      this.motorcycle_list=respuesta;
    }
  )

  this.userService.getScooters().subscribe(
    respuesta=>{
      this.scooters_list=respuesta;
    }
  )
  this.userService.getBookings(sessionStorage.getItem('email')).pipe(
    map(respuesta => {
      // Mapear la respuesta cambiando el número por una cadena
      return respuesta.map((booking: Booking) => {
        if (booking.state === 0) {
          booking.statechange = 'Cancelada';
        } else if (booking.state === 1) {
          booking.statechange = 'Activa';
        } else if (booking.state === 2) {
          booking.statechange = 'Histórica';
        }
        return booking;
      });
    })
  ).subscribe(mappedRespuesta => {
    // Asigna la respuesta mapeada a la lista
    this.booking_list = mappedRespuesta;
  });


  this.userService.consultRatingCar().subscribe(
    respuesta=>{
      this.ratingCar_list=respuesta;
    }
  )
  this.userService.consultRatingMotorcycle().subscribe(
    respuesta=>{
      this.ratingMoto_list=respuesta;
    }
  )
  this.userService.consultRatingScooter().subscribe(
    respuesta=>{
      this.ratingScooter_list=respuesta;
    }
  )
}
}

