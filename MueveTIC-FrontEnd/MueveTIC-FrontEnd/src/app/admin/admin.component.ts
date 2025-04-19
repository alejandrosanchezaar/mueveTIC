import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Personal,User,Admin, VehicleType, Car, Motorcycle, Scooter, Booking } from '../interfaces';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { of} from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent {
  lista_admin: Admin[] = [];
  lista_personal:Personal[]=[];
  lista_user:User[]=[];
  showList: boolean = true;
  currentRole: string = ''; // Rol por defecto
  action: string = ''; // Acción por defecto
  activeLink: string = ''; // Inicialmente ninguno está activo


  name: string = '';
  surname: string = '';
  email: string = '';
  carnet: string = '';
  city: string = '';
  dni: string = '';
  numberPhone: string = '';
  experience!: number;
  birthdate: string = '';
  password: string = '';
  interfaceBlocked: boolean = false; // Indica si la interfaz está bloqueada


  /* VARIABLES SPRINT 2*/
  menu: string ='gestion_vehiculo';
  filter: string = '';
  menu_vehicle: string = '';
  menu_booking:boolean = false;
  menu_valuation:boolean = false;
  bookingUserName: string = '';
  valuationVehicleName: string = '';
  vehicletype_list: VehicleType[]=[];
  cars_list: Car[] = [];
  motorcycle_list:Motorcycle[]=[];
  scooters_list:Scooter[]=[];
  UsersBooking_list:User[]=[]; /*Usuarios con Reservas*/
  BookingsUsers_list:Booking[]=[]; /*Reservas de un Usuario*/
  CarValuation_list: User[]=[]; /*Usuarios con valoraciones sobre un tipo de vehiculo*/
  BookingValuation_list:Booking[]=[];/*Reservas de un Usuario a un Coche*/
  facturation_list:Booking[]=[];/*Facturas Totales*/
  facturationCar_list:Booking[]=[];/*Facturas Coches*/
  facturationMoto_list:Booking[]=[];/*Facturas Motos*/
  facturationScooter_list:Booking[]=[];/*Facturas Scooter*/

  facturationFilter_list:Booking[]=[];/*Filtro Facturas Totales*/
  facturationCarFilter_list:Booking[]=[];/*Filtro Facturas Coches*/
  facturationMotoFilter_list:Booking[]=[];/*Filtro Facturas Moto*/
  facturationScooterFilter_list:Booking[]=[];/*Filtro Facturas Scooters*/
  showFilter:boolean=true;

  emailUser: string = sessionStorage.getItem('email') ?? '';


  /*VARIABLES YOLANDA*/
  modelo:string | undefined;
  matricula:string | undefined;
  numPlazas:string | undefined;
  ubicacion:string | undefined;
  estado:string | undefined;
  porcentajeBateria: number | undefined;
  tipo:string | undefined;
  casco: string | undefined;
  color: string | undefined;

  comentario: string | undefined;
  puntuacion: number = 0;
  fecha: string | undefined;

  maxVehiclesCharging: number | undefined;
facturationPerTrip: number | undefined;
batteryPerTrip: number | undefined;
minBatteryPerTrip: number | undefined;

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];
  years: number[] = Array.from({ length: new Date().getFullYear() - 1939 }, (_, i) => new Date().getFullYear() - i);
  selectedDay: number | undefined;
  selectedMonth: string | undefined;
  selectedYear: number | undefined;



  getNameUser(email:string){
    // Divide el correo electrónico en partes usando el símbolo '@'
    const userName= email.split('@');
    // Devuelve la primera parte del correo, que se asume como el nombre de usuario
    return userName[0];
  }

  showBookings(index:number, name:string, email:string){
    this.menu='gestion_reservas_usuario_consultarUsuario';
    this.bookingUserName=name;
    this.AdminService.consultBookings(email).subscribe(
      respuesta=>{
        this.BookingsUsers_list=respuesta;
      }
    )


  }


  fillStars(index: number, rating: number) {
    this.puntuacion = rating;
    return {
      'star-activa': index < this.puntuacion,
      'star-unfilled': index >= this.puntuacion,
    };
  }


  showBookingsVehicle(index:number, model:string,licensePlate:string, type:string){
    this.menu='gestion_reservas_vehiculo_valoraciones';
    this.valuationVehicleName=model;
    this.AdminService.consultReviews(model).subscribe(
      respuesta=>{
        this.CarValuation_list=respuesta;
      }
    )

  }

  consultUserBooking(email:string, model:string){

    this.AdminService.consultUserBooking(email,model).subscribe(
      respuesta=>{
        this.BookingValuation_list=respuesta;

        const formattedList = this.BookingValuation_list.map(item => {
          return `Fecha: ${item.date}  Comentario: ${item.comment}   Puntuación: ${item.rating};`;
        });
        const listaFormateada = formattedList.join('\n');
    Swal.fire({
      title: 'Valoraciones',
      text: listaFormateada,
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
      }
    )


  }



  changeMenu(opcion: string) {
    this.menu = opcion;
    this.currentRole = '';
    if(opcion=='configuracion'){
      this.viewParams();
    }

}


deleteVehicle(index:number, licensePlate:any){
  let info ={
    licensePlate:licensePlate,
  }
  Swal.fire({
    title: 'Eliminar Vehículo',
    text: '¿Desea eliminar este vehículo?',
    icon: 'warning',
    confirmButtonText: 'Aceptar',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      this.AdminService.deleteVehicle(info).subscribe({
        next: respuesta => {
          this.updateLists();
          //Alerta
          Swal.fire({
            title: 'Eliminar Vehículo',
            text: 'Vehículo eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor:'#79ed83',
          });
        },
        error: error => {
          Swal.fire({
            title: 'Error',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
    });
    }
  });
}
activateVehicle(index:number, licensePlate:any){
  let info ={
    licensePlate:licensePlate,
  }
  Swal.fire({
    title: 'Activar Vehículo',
    text: '¿Desea activar este vehículo?',
    icon: 'info',
    confirmButtonText: 'Aceptar',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      this.AdminService.activateVehicle(info).subscribe({
        next: respuesta => {
          this.updateLists();
          //Alerta
          Swal.fire({
            title: 'Activar Vehículo',
            text: 'Vehículo activado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor:'#79ed83',
          });
        },
        error: error => {
          Swal.fire({
            title: 'Error',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
    });
    }
  });

}
obtainTotalFacturation(facturation:{ price: number }[]): number{
   let total_facturation: number = 0;
   for (let fact of facturation) {
    total_facturation += fact.price;
  }
  return total_facturation;

}
quitFilter(){
  if(this.selectedMonth != null && this.selectedYear != null){
  Swal.fire({
    title: 'Eliminar Filtro',
    text: '¿Está seguro de que quiere eliminar el filtro de búsqueda de la facturación producida por Mueve TIC durante el mes de ' + this.obtenerNombreMes(Number(this.selectedMonth)) + ' del año ' + this.selectedYear + '?' ,
    icon: 'info',
    confirmButtonText: 'Confirmar',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      this.updateLists()
      this.selectedMonth = undefined;
      this.selectedYear = undefined;
      this.showFilter=true;
    }
  })
}else{
  Swal.fire({
    title: 'Eliminar Filtro',
    text: 'La facturación proporcionada no dispone de ningún filtro.' ,
    icon: 'error',
    confirmButtonText: 'Aceptar',

  })

}
}
searchFacturation(facturation:Booking[], facturationFilter:any[]){
  const monthNumber: number = Number(this.selectedMonth);

  for (const item of facturation) {
    const dateParts = item.date.split('-');
    const itemMonth = parseInt(dateParts[1], 10); // Extrae el mes como número
    const itemYear = parseInt(dateParts[0], 10);  // Extrae el año como número

    if (itemMonth == monthNumber && itemYear == this.selectedYear) {
      facturationFilter.push(item);
    }
  }
  return facturationFilter
}

 obtenerNombreMes(numeroMes: number): string {
  const nombresMeses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  if (numeroMes >= 1 && numeroMes <= 12) {
    return nombresMeses[numeroMes - 1]; // Restamos 1 porque los índices en el array comienzan en 0
  } else {
    return 'Mes inválido';
  }
}

searchFacturationFilter(){
if(this.selectedMonth != null && this.selectedYear != null){
  Swal.fire({
    title: 'Búsqueda Facturación',
    text: '¿Está seguro de que quiere realizar una búsqueda de la facturación producida por Mueve TIC durante el mes de ' + this.obtenerNombreMes(Number(this.selectedMonth)) + ' del año ' + this.selectedYear + '?' ,
    icon: 'info',
    confirmButtonText: 'Confirmar',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){

  this.filter=''
  //Cargar el filtro en facturacion
  this.facturationFilter_list= this.searchFacturation(this.facturation_list,this.facturationFilter_list);
  this.facturation_list.splice(0, this.facturation_list.length, ...this.facturationFilter_list)

  this.facturationCarFilter_list= this.searchFacturation(this.facturationCar_list,this.facturationCarFilter_list);
  this.facturationCar_list.splice(0, this.facturationCar_list.length, ...this.facturationCarFilter_list)

  this.facturationMotoFilter_list= this.searchFacturation(this.facturationMoto_list,this.facturationMotoFilter_list);
  this.facturationMoto_list.splice(0, this.facturationMoto_list.length, ...this.facturationMotoFilter_list)

  this.facturationScooterFilter_list= this.searchFacturation(this.facturationScooter_list,this.facturationScooterFilter_list);
  this.facturationScooter_list.splice(0, this.facturationScooter_list.length, ...this.facturationScooterFilter_list)

  this.showFilter=false;
  Swal.fire({
    title: 'Búsqueda Facturación',
    text: 'Facturación filtrada realizado con éxito.',
    icon: 'success',
    confirmButtonText: 'Aceptar',
  })

    }
  })
}else{
  Swal.fire({
    title: 'Búsqueda Facturación',
    text: 'Por favor, primero introduzca el mes y el año del que desea consultar la facturación de Mueve TIC.' ,
    icon: 'error',
    confirmButtonText: 'Aceptar',

  })

}
}

addTypeVehicle(){
  Swal.fire({
    title: 'Añadir Tipo de Vehículo',
    text: '¿Está seguro de que quiere añadir un tipo de vehículo para futuras versiones? ' ,
    input:'text',
    icon: 'info',
    confirmButtonText: 'Añadir',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){

      /*PETICIÓN RESERVA*/
      this.AdminService.addVehicleType(result.value).subscribe({
        next: (respuesta: any) => {
          Swal.fire({
            title: 'Añadir Tipo de vehículo',
            text: 'Tipo de Vehículo añadido correctamente' ,
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

deleteTypeVehicle(type:string){
  Swal.fire({
    title: 'Eliminar Tipo de Vehículo',
    text: '¿Está seguro de que quiere eliminar este tipo de vehículo? ' ,
    icon: 'warning',
    confirmButtonText: 'Eliminar',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){

      this.AdminService.deleteVehicleType(type).subscribe({
        next: (respuesta: any) => {
          Swal.fire({
            title: 'Eliminar Tipo de vehículo',
            text: 'Tipo de Vehículo eliminado correctamente' ,
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





  constructor(private router: Router,private AdminService : AdminService, private http:HttpClient) {

  this.updateLists();

}

  showDropdown= false;
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
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

setActive(link: string) {
    this.activeLink = link;
  }

  changeRole(role: string) {
    this.currentRole = role;
    this.showList = true; // Mostrar la lista al cambiar el rol
    this.menu='';
  }
  changeCRUD(role: string, index: number, email: string) {
    this.menu='';
    this.action = role;
    this.showList = !['Consultar', 'modificar', 'añadir'].includes(this.action);

    this.clearInfo();

    if (this.action === 'Consultar' || this.action === 'modificar') {
      this.handleRoleSpecificAction(index, email);
    }
  }

  private handleRoleSpecificAction(index: number, email: string) {
    if (this.currentRole === 'ROLE_ADMIN') {
      if (this.action === 'Consultar') {
        this.viewAdmin(index);
      } else {
        this.editAdmin(index, email);
      }
    } else if (this.currentRole === 'ROLE_MANTENANCE') {
      if (this.action === 'Consultar') {
        this.viewPersonal(index);
      } else {
        this.editPersonal(index, email);
      }
    } else if (this.currentRole === 'ROLE_USER') {
      if (this.action === 'Consultar') {
        this.viewUser(index);
      } else {
        this.editUser(index, email);
      }
    }
  }


clearInfo(){
  this.name='';
  this.surname='';
  this.email='';
  this.carnet='';
  this.dni='';
  this.city='';
  this.numberPhone='';
  this.experience=0;
  this.birthdate='';
  this.password='';
}
handleSaveButtonClick() {
  if (this.action === 'modificar' && this.currentRole === 'ROLE_ADMIN') {
    this.handleAdminModification();
  } else if (this.action === 'añadir' && this.currentRole === 'ROLE_ADMIN') {
    this.checkCityValidity().subscribe((isValidCity: boolean) => {
      if (isValidCity) {
        this.handleAdminAddition();
      } else {
        // La ciudad no existe, no se agrega el administrador.
      }
    });
  } else if (this.action === 'modificar' && this.currentRole === 'ROLE_MANTENANCE') {
    this.handleMaintenanceModification();
  } else if (this.action === 'añadir' && this.currentRole === 'ROLE_MANTENANCE') {
    this.handleMaintenanceAddition();
  } else if (this.action === 'modificar' && this.currentRole === 'ROLE_USER') {
    this.handleUserModification();
  }
}

private handleUserModification() {
  const newUserData: any = {
    name: this.name,
    surname: this.surname,
    email: this.email,
    dni: this.dni,
    birthDate: this.birthdate,
    numberPhone: this.numberPhone,
    carnet: this.carnet,
    password: this.password,
    role: this.currentRole,
  };

  this.AdminService.modifyUser(newUserData).subscribe({
    next: (response) => {
      this.updateLists();
      this.showSuccessMessage('User modified', 'User successfully modified');
    },
    error: (error) => {
      this.showErrorMessage('Error', error.error);
    }
  });
}


private handleAdminModification() {
  const newAdminData: any = {
    name: this.name,
    surname: this.surname,
    email: this.email,
    driverLicense: this.carnet,
    dni: this.dni,
    numberPhone: this.numberPhone,
    city: this.city,
    password: this.password,
    role: this.currentRole,
  };

  this.AdminService.modifyAdmin(newAdminData).subscribe({
    next: (response) => {
      this.updateLists();
      this.showSuccessMessage('Administrador modificado', 'Administrador modificado correctamente');
    },
    error: (error) => {
      this.showErrorMessage('Error', error.error);
    }
});
}

private handleAdminAddition() {
  const newAdminData: any = {
    name: this.name,
    surname: this.surname,
    email: this.email,
    driverLicense: this.carnet,
    dni: this.dni,
    numberPhone: this.numberPhone,
    city: this.city,
    password: this.password,
    role: this.currentRole,
  };

  this.AdminService.addAdmin(newAdminData).subscribe({
    next:(response) => {
      this.updateLists();
      this.showSuccessMessage('Administrador agregado', 'Administrador agregado correctamente');
    },
    error:(error) => {
      this.showErrorMessage('Error', error.error);
    }
});
}

private handleMaintenanceModification() {
  const newPersonalData: any = {
    name: this.name,
    surname: this.surname,
    email: this.email,
    carnet: this.carnet,
    dni: this.dni,
    experience: this.experience,
    city: this.city,
    password: this.password,
    role: this.currentRole,
  };

  this.AdminService.modifyPersonal(newPersonalData).subscribe({
    next: (response) => {
      this.updateLists();
      this.showSuccessMessage('Personal Mantenance update', 'Personal Mantenance successfully update');
    },
    error: (error) => {
      this.showErrorMessage('Error', error.error);
    }
});
}

private handleMaintenanceAddition() {
  const newPersonalData: any = {
    name: this.name,
    surname: this.surname,
    email: this.email,
    carnet: this.carnet,
    dni: this.dni,
    experience: this.experience,
    city: this.city,
    password: this.password,
    validation: 1,
    role: this.currentRole,
  };

  this.AdminService.addPersonal(newPersonalData).subscribe({
    next: (response) => {
      this.updateLists();
      this.showSuccessMessage('Added maintenance personnel', 'Maintenance personnel successfully added');
    },
    error: (error) => {
      this.showErrorMessage('Error', error.error);
    }
});
}

private showSuccessMessage(title: string, message: string) {
  Swal.fire({
    title: title,
    text: message,
    icon: 'success',
    confirmButtonText: 'Accept',
    confirmButtonColor: '#79ed83',
  });
}

private showErrorMessage(title: string, errorMessage: string) {
  Swal.fire({
    title: title,
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'Accept',
  });
}

handleCancelButtonClick(){
  Swal.fire({
    title: 'Volver',
    text: '¿Está seguro que desea volver?Se cancelarán los cambios no guardados.',
    icon: 'warning',
    confirmButtonText: 'Aceptar',
    confirmButtonColor:'#79ed83',
    showCancelButton:true,
    cancelButtonColor:'#fa5050',
    cancelButtonText:'Cancelar'
  }).then((result)=>{

    if(result.isConfirmed){
      this.showList=true;
    }else{
      this.showList=false;
    }
  })

  }






   //Metodos Administrador

   selectedAdmin: Admin | undefined;
   viewAdmin(index: number) {
    if (this.lista_admin && index >= 0 && index < this.lista_admin.length) {
      this.selectedAdmin = this.lista_admin[index];
      console.log(this.selectedAdmin)
      this.name = this.selectedAdmin.name;
      this.surname = this.selectedAdmin.surname;
      this.email = this.selectedAdmin.email;
      this.dni= this.selectedAdmin.dni;
      this.city=this.selectedAdmin.city;
      this.password=this.selectedAdmin.password;
      }
  }

   editAdmin(index:number,email:string){
    this.viewAdmin(index);

   }


   deleteAdmin(index:number, email:string){
    let info ={
      email:email,
    }

    Swal.fire({
      title: 'Deshabilitar Administrador',
      text: '¿Desea deshabilitar este administrador?',
      icon: 'warning',
      /*input:'text',*/
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.value){
        console.log(result.value)
      }

      if(result.isConfirmed){
        this.AdminService.desactivateAdmin(info).subscribe({
          next: respuesta => {
            this.updateLists();
            //Alerta
            Swal.fire({
              title: 'Administrador Deshabilitado',
              text: 'Administrador deshabilitado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor:'#79ed83',
            });
          },
          error: error => {
            Swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
      });
      }
    });

   }

   updateLists(){
    this.AdminService.getAdmins().subscribe(
      respuesta=>{
        this.lista_admin=respuesta;
      }
    )

    this.AdminService.getPersonal().subscribe(
      respuesta=>{
        this.lista_personal=respuesta;
      }
    )

    this.AdminService.getUsers().subscribe(
      respuesta=>{
        this.lista_user=respuesta;
      }
    )
    /*LISTAS SPRINT 2 */
    this.AdminService.getTypeVehicles().subscribe(
      respuesta=>{
        this.vehicletype_list=respuesta;
      }
    )

    this.AdminService.getAllCars().subscribe(
      respuesta=>{
        this.cars_list=respuesta;
      }
    )

    this.AdminService.getAllMotorcycles().subscribe(
      respuesta=>{
        this.motorcycle_list=respuesta;
      }
    )

    this.AdminService.getAllScooters().subscribe(
      respuesta=>{
        this.scooters_list=respuesta;
      }
    )

    this.AdminService.consultFacturation().subscribe(
      respuesta=>{
        this.facturation_list=respuesta;
      }
    )
    this.AdminService.consultFacturationCar().subscribe(
      respuesta=>{
        this.facturationCar_list=respuesta;
      }
    )
    this.AdminService.consultFacturationMotorcycle().subscribe(
      respuesta=>{
        this.facturationMoto_list=respuesta;
      }
    )
    this.AdminService.consultFacturationScooter().subscribe(
      respuesta=>{
        this.facturationScooter_list=respuesta;
      }
    )

    this.AdminService.consultAllPersonsWithBookings().subscribe(
      respuesta=>{
        this.UsersBooking_list=respuesta;
      }
    )



   }
   activateAdmin(index:number, email:string){

    let info ={
      email:email,
    }

    console.log(email);
    console.log(info);
    Swal.fire({
      title: 'Activar Administrador',
      text: '¿Desea activar este administrador?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.value){
        console.log(result.value)
      }

      if(result.isConfirmed){
        this.AdminService.activateAdmin(info).subscribe({
          next: respuesta => {
            this.updateLists();
            //Alerta
            Swal.fire({
              title: 'Administrador Habilitado',
              text: 'Administrador Habilitado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor:'#79ed83',
            });
          },
          error: error => {
            Swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
      });
      }
    });

   }

   activatePersonal(index:number, email:string){

    let info ={
      email:email,
    }

    Swal.fire({
      title: 'Activar Personal de Mantenimiento',
      text: '¿Desea activar este personal de mantenimiento?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.value){
        console.log(result.value)
      }

      if(result.isConfirmed){
        this.AdminService.activatePersonal(info).subscribe({
          next: respuesta => {
            this.updateLists();
            //Alerta
            Swal.fire({
              title: 'Personal de Mantenimiento Habilitado',
              text: 'Personal de Mantenimiento Habilitado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor:'#79ed83',
            });
          },
          error: error => {
            Swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
      });
      }
    });

   }

   activateUser(index:number, email:string){

    let info ={
      email:email,
    }

    Swal.fire({
      title: 'Activar Usuario',
      text: '¿Desea activar este usuario?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.value){
        console.log(result.value)
      }

      if(result.isConfirmed){
        this.AdminService.activateUser(info).subscribe({
          next: respuesta => {
            this.updateLists();
            //Alerta
            Swal.fire({
              title: 'Usuario Habilitado',
              text: 'Usuario Habilitado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor:'#79ed83',
            });
          },
          error: error => {
            Swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
      });
      }
    });

   }




   selectedPersonal: Personal | undefined;
   viewPersonal(index:number){

    if (this.lista_personal && index >= 0 && index < this.lista_personal.length) {
      this.selectedPersonal = this.lista_personal[index];
      console.log(this.selectedPersonal)
      this.name = this.selectedPersonal.name;
      this.surname = this.selectedPersonal.surname;
      this.email = this.selectedPersonal.email;
      this.carnet = this.selectedPersonal.carnet;
      this.dni= this.selectedPersonal.dni;
      this.city=this.selectedPersonal.city;
      this.experience=this.selectedPersonal.experience;
      this.password=this.selectedPersonal.password;
      }



   }
   editPersonal(index:number,email:string){
    this.viewPersonal(index)
   }
   deletePersonal(index:number,email:string){

    let info ={
      email:email,
    }

    Swal.fire({
      title: 'Deshabilitar Personal de Mantenimiento',
      text: '¿Desea deshabilitar este personal de mantenimiento?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{

      if(result.isConfirmed){
        this.AdminService.desactivatePersonal(info).subscribe({
          next: respuesta=>{
            this.updateLists();
          Swal.fire({
            title: 'Personal de Mantenimiento Deshabilitado',
            text: 'Personal de Mantenimiento deshabilitado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor:'#79ed83',
          });
      },
        error: error => {
          Swal.fire({
            title: 'Error',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
      }
    });

  }

   //Metodos Usuario
  selectedUser: User | undefined;
   viewUser(index:number){

     if (this.lista_user && index >= 0 && index < this.lista_user.length) {
       this.selectedUser = this.lista_user[index];
       this.name = this.selectedUser.name;
       this.surname = this.selectedUser.surname;
       this.email = this.selectedUser.email;
       this.carnet = this.selectedUser.carnet;
       this.dni= this.selectedUser.dni;
       this.password=this.selectedUser.password;
       this.birthdate=this.selectedUser.birthDate;
       this.numberPhone=this.selectedUser.numerPhone;
       }

  }


   editUser(index:number,email:string){
    this.viewUser(index);
   }
   deleteUser(index:number, email:string){
    let info ={
      email:email,
    }


    Swal.fire({
      title: 'Deshabilitar Usuario',
      text: '¿Desea deshabilitar este usuario?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor:'#79ed83',
      showCancelButton:true,
      cancelButtonColor:'#fa5050',
      cancelButtonText:'Cancelar'
    }).then((result)=>{

      if(result.isConfirmed){
        this.AdminService.desactivateUser(info).subscribe({
          next: respuesta=>{
            this.updateLists();
            Swal.fire({
              title: 'Usuario Deshabilitado',
              text: 'Usuario deshabilitado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor:'#79ed83',
            });
            },

        error: error => {
            Swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
        }
      });
      }
    });
  }
  checkCityValidity() {
    return this.http.get('https://raw.githubusercontent.com/IagoLast/pselect/master/data/municipios.json').pipe(
      map((data: any) => {
        const cityExists = data.some((municipio: any) => municipio.nm === this.city);
        if (!cityExists && this.city.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La ciudad introducida no existe.'
          });
          return false;
        }
        return true;
      }),
      switchMap((result: boolean) => {
        if (result) {
          return of(result);
        } else {
          return of(false);
        }
      })
    );
  }


//*********************************METODOS CONFIGURACION PARAMETROS******************************************************* */

viewParams(){

this.AdminService.getParams().subscribe(
  respuesta=>{
    console.log(respuesta)
    this.maxVehiclesCharging=respuesta.maxVehiclesCharging;
    this.facturationPerTrip=respuesta.facturationPerTrip;
    this.batteryPerTrip=respuesta.batteryPerTrip;
    this.minBatteryPerTrip=respuesta.minBatteryPerTrip;
  }
)

}


handleSaveConfiguracion(){
  const newConfiguracionData: any = {
    maxVehiclesCharging: this.maxVehiclesCharging,
    facturationPerTrip: this.facturationPerTrip,
    batteryPerTrip: this.batteryPerTrip,
    minBatteryPerTrip: this.minBatteryPerTrip
  };

  this.AdminService.modifyConfiguracion(newConfiguracionData).subscribe({
    next: (response) => {
      this.showSuccessMessage('Configuracion modificada', 'Configuracion modificada correctamente');
    },
    error: (error) => {
      this.showErrorMessage('Error', error.error);
 }
});
}

obtenerClaseEstrella(index: number) {
  return {
    'star-activa': index < this.puntuacion,
    'star-unfilled': index >= this.puntuacion,
  };
}


selectedCarConsult: Car | undefined;
  infoCars(index:number){
    if (this.cars_list && index >= 0 && index < this.cars_list.length) {
      this.selectedCarConsult = this.cars_list[index];
      this.modelo = this.selectedCarConsult.vehicle.model;
      this.matricula = this.selectedCarConsult.vehicle.licensePlate;
      this.numPlazas = this.selectedCarConsult.vehicle.nSeats;
      this.ubicacion = this.selectedCarConsult.vehicle.address;
      this.porcentajeBateria = this.selectedCarConsult.vehicle.battery;
      this.consultStateCar(this.selectedCarConsult);
  }
}
  consultStateCar(selectedCarConsult:Car){
    console.log(selectedCarConsult.vehicle)
    if (selectedCarConsult.vehicle.available) {
      this.estado = 'Disponible';
    }else if(selectedCarConsult.vehicle.unAvailable){
      this.estado = 'No disponible';
    }else if(selectedCarConsult.vehicle.ocupied){
      this.estado = 'Ocupado';
    }else if(selectedCarConsult.vehicle.reserved){
      this.estado = 'Reservado';
    }else if(selectedCarConsult.vehicle.pendingCharging){
      this.estado = 'Pendiente de Carga';
    }else if(selectedCarConsult.vehicle.deactivated){
      this.estado = 'Desactivado';
    }
  }
  selectedMotorcycleConsult: Motorcycle | undefined;
infoMotorcycles(index:number){
  if (this.motorcycle_list && index >= 0 && index < this.motorcycle_list.length) {
    this.selectedMotorcycleConsult = this.motorcycle_list[index];
    this.modelo = this.selectedMotorcycleConsult.vehicle.model;
    this.matricula = this.selectedMotorcycleConsult.vehicle.licensePlate;
    this.ubicacion = this.selectedMotorcycleConsult.vehicle.address;
    this.porcentajeBateria = this.selectedMotorcycleConsult.vehicle.battery;
    this.incluyeCasco(this.selectedMotorcycleConsult);
    this.tipo = this.selectedMotorcycleConsult.vehicle.type;
    this.consultStateMotorcycle(this.selectedMotorcycleConsult);
}
}

incluyeCasco(selectedMotorcycleConsult: Motorcycle){
  if(selectedMotorcycleConsult.vehicle.helmet){
   this.casco = 'true';
  }else{
    this.casco = 'false';
  }

}

consultStateMotorcycle(selectedMotorcycleConsult:Motorcycle){
  if (selectedMotorcycleConsult.vehicle.available) {
    this.estado = 'Disponible';
  }else if(selectedMotorcycleConsult.vehicle.unAvailable){
    this.estado = 'No disponible';
  }else if(selectedMotorcycleConsult.vehicle.ocupied){
    this.estado = 'Ocupado';
  }else if(selectedMotorcycleConsult.vehicle.reserved){
    this.estado = 'Reservado';
  }else if(selectedMotorcycleConsult.vehicle.pendingCharging){
    this.estado = 'Pendiente de Carga';
  }else if(selectedMotorcycleConsult.vehicle.deactivated){
    this.estado = 'Desactivado';
  }
}
selectedScooterConsult: Scooter | undefined;
infoScooters(index:number){
  if (this.scooters_list && index >= 0 && index < this.scooters_list.length) {
    this.selectedScooterConsult = this.scooters_list[index];
    this.modelo = this.selectedScooterConsult.vehicle.model;
    this.matricula = this.selectedScooterConsult.vehicle.licensePlate;
    this.ubicacion = this.selectedScooterConsult.vehicle.address;
    this.porcentajeBateria = this.selectedScooterConsult.vehicle.battery;
    this.color = this.selectedScooterConsult.vehicle.color;
    this.tipo = this.selectedScooterConsult.vehicle.type;
    this.consultStateScooter(this.selectedScooterConsult);
  }
}
  consultStateScooter(selectedScooterConsult:Scooter){

    if (selectedScooterConsult.vehicle.available) {
      this.estado = 'Disponible';
    }else if(selectedScooterConsult.vehicle.unAvailable){
      this.estado = 'No disponible';
    }else if(selectedScooterConsult.vehicle.ocupied){
      this.estado = 'Ocupado';
    }else if(selectedScooterConsult.vehicle.reserved){
      this.estado = 'Reservado';
    }else if(selectedScooterConsult.vehicle.pendingCharging){
      this.estado = 'Pendiente de Carga';
    }else if(selectedScooterConsult.vehicle.deactivated){
      this.estado = 'Desactivado';
    }
  }

  consultVehicleCar(opcion:string, index:number){
    this.changeMenu(opcion);
    this.infoCars(index);
  }

  consultVehicleMotorcycle(opcion:string, index:number){
    this.changeMenu(opcion)
    this.infoMotorcycles(index);
  }

  consultVehicleScooter(opcion:string, index:number){
    this.changeMenu(opcion)
    this.infoScooters(index);


  }

  consultStateBooking(selectedBooking:Booking){
    if (selectedBooking.state === 0) {
      this.estado= 'Cancelada';
    } else if (selectedBooking.state === 1) {
      this.estado = 'Activa';
    } else if (selectedBooking.state === 2) {
      this.estado = 'Histórica';
    }
 }

  selectedBookingUser: Booking | undefined;
  infoBookingUser(index:number){
    if (this.BookingsUsers_list && index >= 0 && index < this.BookingsUsers_list.length) {
      this.selectedBookingUser = this.BookingsUsers_list[index];
      this.fecha = this.selectedBookingUser.date;
      this.matricula = this.selectedBookingUser.vehicle.licensePlate;
      this.email = this.selectedBookingUser.user.email;
      this.puntuacion=this.selectedBookingUser.rating;
      this.comentario=this.selectedBookingUser.comment;
      this.modelo=this.selectedBookingUser.vehicle.model;
      this.consultStateBooking(this.selectedBookingUser);

  }
  }
  consultUserBookingForm(opcion:string, index:number){
    this.changeMenu(opcion)
    this.infoBookingUser(index);
  }
  modifyVehicleCar(opcion:string, index:number){
    this.changeMenu(opcion);
    this.infoCars(index);


  }
  guardarCocheModificado(){
    if (this.numPlazas === '' ||this.matricula ==  ''||this.ubicacion ==  ''||this.porcentajeBateria == undefined||this.modelo ==  ''){
      Swal.fire({
        title: 'Error',
        text: 'Rellene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;

    }else if(this.numPlazas!='3'&&this.numPlazas!='5'&&this.numPlazas!='7'){
      Swal.fire({
        title: 'Error',
        text: 'El número de plazas debe ser 3 o 5 o 7',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    let info: any = {
      licensePlate: this.matricula,
      address: this.ubicacion,
      battery: this.porcentajeBateria,
      model: this.modelo,
      nSeats: this.numPlazas,
    };
    this.AdminService.updateVehicle(info).subscribe({
      next: respuesta => {
        this.updateLists();
        // Alerta
        Swal.fire({
          title: 'Actualizar Vehículo',
          text: 'Vehículo actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#79ed83',
        });
      },
      error: error => {
        Swal.fire({
          title: 'Error',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }


  modifyVehicleMotorcycle(opcion:string, index:number){
    this.changeMenu(opcion)
    this.infoMotorcycles(index);
  }
  guardarMotoModificada(){
    if(this.matricula ==  ''||this.ubicacion ==  ''||this.porcentajeBateria == undefined||this.modelo ==  ''||this.casco ==  ''){
      Swal.fire({
        title: 'Error',
        text: 'Rellene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    let info: any = {
      licensePlate: this.matricula,
      address: this.ubicacion,
      battery: this.porcentajeBateria,
      model: this.modelo,
      helmet: this.casco,
      type: this.tipo,
    }
    this.AdminService.updateVehicle(info).subscribe({
      next: respuesta => {
        this.updateLists();
        Swal.fire({
          title: 'Actualizar Moto',
          text: 'Moto actualizada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#79ed83',
        });
      },
      error: error => {
        Swal.fire({
          title: 'Error',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
    }

clearCamposMoto(){
  this.modelo='';
  this.matricula='';
  this.ubicacion='';
  this.porcentajeBateria=100;
  this.casco='';
  this.tipo='';
  this.estado='';

}

addMotorcycle(opcion:string){
  this.clearCamposMoto();
  this.changeMenu(opcion);
  this.tipo= 'motorcycle';
  this.estado='Disponible';
}
guardarMotoAnadida(){
  if(this.matricula ==  ''||this.ubicacion ==  ''||this.porcentajeBateria == undefined||this.modelo ==  ''||this.casco ==  ''){
    Swal.fire({
      title: 'Error',
      text: 'Rellene todos los campos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  } else if (!this.matricula || this.matricula.length !== 7 || !(/^\d{4}[A-Z]{3}$/).exec(this.matricula)) {
    Swal.fire({
      title: 'Error',
      text: 'La matrícula debe tener 4 números y 3 letras',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }
  let info: any = {
    licensePlate: this.matricula,
    address: this.ubicacion,
    battery: this.porcentajeBateria,
    model: this.modelo,
    helmet: this.casco,
    type: 'motorcycle',
    available: true,
    unAvailable: false,
    ocupied: false,
    reserved: false,
    pendingCharging: false,
    deactivated: false,
  };


  this.AdminService.addVehicle(info).subscribe({
    next: respuesta => {
      this.updateLists();
      //Alerta
      Swal.fire({
        title: 'Añadir Moto',
        text: 'Moto añadida correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor:'#79ed83',
      });
    },
    error: error => {
      Swal.fire({
        title: 'Error',
        text: error.error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  )
}

  modifyVehicleScooter(opcion:string, index:number){
    this.changeMenu(opcion)
    this.infoScooters(index);

  }
  guardarPatineteModificado(){
    if(this.matricula ==  ''||this.ubicacion ==  ''||this.porcentajeBateria == undefined||this.modelo ==  ''){
      Swal.fire({
        title: 'Error',
        text: 'Rellene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }else if(this.color==null){
      this.color = ' ';
    }
    let info: any = {
      licensePlate: this.matricula,
      address: this.ubicacion,
      battery: this.porcentajeBateria,
      model: this.modelo,
      color: this.color,
      type: this.tipo,
    }
    this.AdminService.updateVehicle(info).subscribe({
      next: respuesta => {
        this.updateLists();
        Swal.fire({
          title: 'Actualizar Patinete',
          text: 'Patinete actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#79ed83',
        });
      },
      error: error => {
        Swal.fire({
          title: 'Error',
          text: error.error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
    }
clearCamposPatinete(){
  this.modelo='';
  this.matricula='';
  this.ubicacion='';
  this.porcentajeBateria=100;
  this.color='';
  this.tipo='';
  this.estado='';
}

  addPatinete(opcion:string){
    this.clearCamposPatinete();
    this.tipo= 'scooter';
    this.estado='Disponible';
    this.changeMenu(opcion)
  }
  guardarPatineteAnadido(){
    if(this.matricula ==''||this.ubicacion == ''||this.porcentajeBateria == undefined||this.modelo == ''){
      Swal.fire({
        title: 'Error',
        text: 'Rellene todos los campos.Excepto color que es opcional',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    else if(this.color==''){
      this.color = ' ';
    } else if (!this.matricula || this.matricula.length !== 7 || !(/^\d{4}[A-Z]{3}$/).exec(this.matricula)) {
      Swal.fire({
        title: 'Error',
        text: 'La matrícula debe tener 4 números y 3 letras',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    let info: any = {
      licensePlate: this.matricula,
      address: this.ubicacion,
      battery: this.porcentajeBateria,
      model: this.modelo,
      color: this.color,
      type: 'scooter',
      available: true,
      unAvailable: false,
      ocupied: false,
      reserved: false,
      pendingCharging: false,
      deactivated: false,
    };

  this.AdminService.addVehicle(info).subscribe({
    next: respuesta => {
      this.updateLists();
      //Alerta
      Swal.fire({
        title: 'Añadir Patinete',
        text: 'Patinete añadido correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor:'#79ed83',
      });
    },
    error: error => {
      Swal.fire({
        title: 'Error',
        text: error.error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  )
}

  clearCamposCoche(){
    this.modelo='';
    this.matricula='';
    this.numPlazas=undefined;
    this.ubicacion='';
    this.porcentajeBateria=100;
    this.estado='';
    this.puntuacion = 0;
  }

  addCar(opcion:string){
    this.clearCamposCoche();
    this.changeMenu(opcion)
    this.estado='Disponible';
  }
  guardarCocheAnadido(){
    if (this.numPlazas === '' ||this.matricula ==  ''||this.ubicacion ==  ''||this.porcentajeBateria == undefined||this.modelo ==  ''){
      Swal.fire({
        title: 'Error',
        text: 'Rellene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;

    }else if(this.numPlazas!='3'&&this.numPlazas!='5'&&this.numPlazas!='7'){
      Swal.fire({
        title: 'Error',
        text: 'El número de plazas debe ser 3 o 5 o 7',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    } else if (!this.matricula || this.matricula.length !== 7 || !(/^\d{4}[A-Z]{3}$/).exec(this.matricula)) {
      Swal.fire({
        title: 'Error',
        text: 'La matrícula debe tener 4 números y 3 letras',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    let info: any = {
      licensePlate: this.matricula,
      address: this.ubicacion,
      battery: this.porcentajeBateria,
      model: this.modelo,
      nSeats: this.numPlazas,
      type: 'car',
      available: true,
      unAvailable: false,
      ocupied: false,
      reserved: false,
      pendingCharging: false,
      deactivated: false,
    };
  this.AdminService.addVehicle(info).subscribe({
    next: respuesta => {
      this.updateLists();
      //Alerta
      Swal.fire({
        title: 'Añadir Vehículo',
        text: 'Vehículo añadido correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor:'#79ed83',
      });
    },
    error: error => {
      Swal.fire({
        title: 'Error',
        text: error.error,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  )
  }

}
