import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient : HttpClient) { }


  getAdmins() : Observable<any>{
    // Supongamos que tienes el token almacenado en alguna variable llamada token
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Agregar las cabeceras a la solicitud HTTP
    const options = { headers: headers };
    return this.httpClient.get<any>(`${apiBaseUrl}/admins/consultAdmin`,options)

  }

  getPersonal() : Observable<any>{
    // Supongamos que tienes el token almacenado en alguna variable llamada token
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Agregar las cabeceras a la solicitud HTTP
    const options = { headers: headers };
    return this.httpClient.get<any>(`${apiBaseUrl}/admins/consultPersonalMantenance`,options)

  }

  getUsers() : Observable<any>{
    // Supongamos que tienes el token almacenado en alguna variable llamada token
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Agregar las cabeceras a la solicitud HTTP
    const options = { headers: headers };
    return this.httpClient.get<any>(`${apiBaseUrl}/admins/consultUsers`,options)

  }

  desactivateAdmin(info: any){
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(`${apiBaseUrl}/admins/deactivate`,info,{headers})
  }

  desactivatePersonal(info: any){
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(`${apiBaseUrl}/personal/deactivate`,info,{headers})
  }

  desactivateUser(info: any){
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(`${apiBaseUrl}/users/deactivate`,info,{headers})
  }
  activateAdmin(info: any){
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(`${apiBaseUrl}/admins/activateAdmin`,info,{headers})
  }

  activatePersonal(info: any){
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(`${apiBaseUrl}/personal/activatePersonal`,info,{headers})
  }

  activateUser(info: any){
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(`${apiBaseUrl}/users/activateUser`,info,{headers})
  }

 addAdmin(info:any){
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/person/register-admin`,info,{headers})
 }

 modifyAdmin(info:any){
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/admins/update`,info,{headers})
 }

 modifyPersonal(info:any){
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/personal/update`,info,{headers})
 }
 addPersonal(info:any){
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/person/register-mantenance`,info,{headers})
 }

 modifyUser(info:any){
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/users/update`,info,{headers})
 }


 /* SPRINT 2*/

 getTypeVehicles() : Observable<any>{

  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Agregar las cabeceras a la solicitud HTTP
  const options = { headers: headers };

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any>(`${apiBaseUrl}/vehiclesType/consultAll`, options);

}
getAllCars() : Observable<any>{

  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Agregar las cabeceras a la solicitud HTTP
  const options = { headers: headers };

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/getAllCars`, options);

}

getAllMotorcycles() : Observable<any>{

  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Agregar las cabeceras a la solicitud HTTP
  const options = { headers: headers };

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/getAllMotorcycle`, options);

}
getAllScooters() : Observable<any>{

  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Agregar las cabeceras a la solicitud HTTP
  const options = { headers: headers };

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/getAllScooter`, options);

}
deleteVehicle(info:any) : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/vehicle/removeVehicle`, info, {headers});

}

activateVehicle(info:any) : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.httpClient.post<any>(`${apiBaseUrl}/vehicle/activateVehicle`, info,{headers});

}

addVehicleType(type:any) : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  const params = new HttpParams().set('type', type);
  return this.httpClient.get<any>(`${apiBaseUrl}/vehiclesType/addVehiclesType`, {headers, params});

}
deleteVehicleType(type:any) : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  const params = new HttpParams().set('type', type);
  return this.httpClient.get<any>(`${apiBaseUrl}/vehiclesType/removeVehiclesType`, {headers,params});

}
consultAllPersonsWithBookings() : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultAllPersonsWithBookings`, {headers});

}

consultBookings(email:any) : Observable<any>{
  const params = new HttpParams().set('email', email);
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultBooking`, {headers,params});

}


consultReviews(model:any) : Observable<any>{
  const params = new HttpParams().set('vehicleModel', model);
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/admins/consultReviews`, {headers,params});

}
consultUserBooking(email:any, model:any) : Observable<any>{
  const params = new HttpParams().set('email', email).set('vehicleModel', model);
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/admins/consultUserBooking`, {headers,params});

}

consultFacturation() : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultFacturation`,{headers});

}

consultFacturationCar() : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultFacturationCar`,{headers});

}
consultFacturationMotorcycle() : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultFacturationMotorcycle`,{headers});

}
consultFacturationScooter() : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultFacturationScooter`,{headers});

}

 getCars() : Observable<any>{

  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Agregar las cabeceras a la solicitud HTTP
  const options = { headers: headers };

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/availableCar`,options);

}
getMotorcycles() : Observable<any>{

  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Agregar las cabeceras a la solicitud HTTP
  const options = { headers: headers };

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/availableMotorcycle`,options);

}
getScooters() : Observable<any>{

  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Agregar las cabeceras a la solicitud HTTP
  const options = { headers: headers };

  // Realizar la solicitud HTTP con las cabeceras configuradas
  return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/availableScooter`, options);

}

getBookings(email:any) : Observable<any>{
  const params = new HttpParams().set('email', email);
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/bookings/consultHistoryUserBooking`,{headers,params});

}
createBooking(info:any) : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/bookings/createBooking`, info,{headers});

}


/*METODOS SERVICE YOLANDA*/

getParams() : Observable<any>{
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<any>(`${apiBaseUrl}/admins/params`, {headers});

}

 modifyConfiguracion(info:any){
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/admins/updateParams`,info,{headers})

 }

 updateVehicle(info:any){
  const token = sessionStorage.getItem('token');

  // Configuración de la cabecera con el token de autorización
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/vehicle/update`,info,{headers})

 }
 addVehicle(info:any){
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>(`${apiBaseUrl}/vehicle/addVehicle`,info, {headers})

 }

}

