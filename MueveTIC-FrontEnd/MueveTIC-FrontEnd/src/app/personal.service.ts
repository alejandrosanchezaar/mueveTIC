import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private httpClient : HttpClient) { }

  consultLowBatteryCar() : Observable<any>{
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/lowBatteryCar`,{headers});

  }

  consultLowBatteryMotorcycle() : Observable<any>{
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/lowBatteryMotorcycle`, {headers});

  }

  consultlowBatteryScooter() : Observable<any>{
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/lowBatteryScooter`, {headers});

  }

  reserveChargingVehicle(info:any) : Observable<any>{
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(`${apiBaseUrl}/pendingCharging/reserveChargingVehicle`, info,{headers});

  }

  consultPendingChargingVehicle(email:any) : Observable<any>{
    const params = new HttpParams().set('email', email);
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${apiBaseUrl}/pendingCharging/consultPendingChargingVehicle`, {headers,params});

  }

  chargeVehicle(licensePlate:any) : Observable<any>{
    const params = new HttpParams().set('licensePlate', licensePlate);
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${apiBaseUrl}/vehicle/chargeVehicle`, {headers,params});

  }

  removePendingChargingVehicle(email:any,licensePlate:any) : Observable<any>{
    const params = new HttpParams().set('email', email).set('licensePlate', licensePlate);
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${apiBaseUrl}/pendingCharging/removePendingChargingVehicle`, {headers,params});

  }

  removeChargeVehicle(email:any,licensePlate:any) : Observable<any>{
    const params = new HttpParams().set('email', email).set('licensePlate', licensePlate);
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${apiBaseUrl}/pendingCharging/removeChargeVehicle`, {headers,params});

  }

}
