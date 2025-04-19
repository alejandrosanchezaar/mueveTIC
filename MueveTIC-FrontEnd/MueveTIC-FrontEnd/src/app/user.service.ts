import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiBaseUrl } from './config';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private getHeaders() {
    const auth_token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    return { headers: headers };
  }

  consultUserBooking(): Observable<any> {
    const email = sessionStorage.getItem('email');
    const params = email
      ? new HttpParams().set('email', email)
      : new HttpParams();

    return this.httpClient.get<any>(
      `${apiBaseUrl}/bookings/consultUserBooking`,
      { params: params, ...this.getHeaders() }
    );
  }

  confirmReserva(info: any) {
    return this.httpClient.post<any>(
      `${apiBaseUrl}/bookings/confirmBooking`,
      info,
      this.getHeaders()
    );
  }

  cancelUserBooking() {
    const email = sessionStorage.getItem('email');
    const params = email
      ? new HttpParams().set('email', email)
      : new HttpParams();
    return this.httpClient.get<any>(
      `${apiBaseUrl}/bookings/cancelUserBooking`,
      { params: params, ...this.getHeaders() }
    );
  }

  consultarPerfil() {
    const email = sessionStorage.getItem('email');
    const params = email
      ? new HttpParams().set('email', email)
      : new HttpParams();
    return this.httpClient.get<any>(`${apiBaseUrl}/users/consultUser`, {
      params: params,
      ...this.getHeaders(),
    });
  }

  updatePerfil(info: any) {
    return this.httpClient.post<any>(
      `${apiBaseUrl}/users/update`,
      info,
      this.getHeaders()
    );
  }

  deleteUser(info: any) {
    return this.httpClient.put<any>(
      `${apiBaseUrl}/users/delete`,
      info,
      this.getHeaders()
    );
  }

  getCars(): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    // Realizar la solicitud HTTP con las cabeceras configuradas
    return this.httpClient.get<any>(
      `${apiBaseUrl}/vehicle/availableCar`,
      { headers }
    );
  }
  getMotorcycles(): Observable<any> {
    // Supongamos que tienes el token almacenado en alguna variable llamada token
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Agregar las cabeceras a la solicitud HTTP
    const options = { headers: headers };

    // Realizar la solicitud HTTP con las cabeceras configuradas
    return this.httpClient.get<any>(
      `${apiBaseUrl}/vehicle/availableMotorcycle`,
      options
    );
  }
  getScooters(): Observable<any> {
    // Supongamos que tienes el token almacenado en alguna variable llamada token
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Agregar las cabeceras a la solicitud HTTP
    const options = { headers: headers };

    // Realizar la solicitud HTTP con las cabeceras configuradas
    return this.httpClient.get<any>(
      `${apiBaseUrl}/vehicle/availableScooter`,
      options
    );
  }

  getBookings(email: any): Observable<any> {
    const params = new HttpParams().set('email', email);
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any>(
      `${apiBaseUrl}/bookings/consultHistoryUserBooking`,
      { params, headers }
    );
  }
  createBooking(info: any): Observable<any> {
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post<any>(
      `${apiBaseUrl}/bookings/createBooking`,
      info,
      { headers }
    );
  }

  consultRatingCar(): Observable<any> {
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<any>(
      `${apiBaseUrl}/vehicle/consultRatingCar`,
      { headers }
    );
  }

  consultRatingMotorcycle(): Observable<any> {
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<any>(
      `${apiBaseUrl}/vehicle/consultRatingMotorcycle`,
      { headers }
    );
  }
  consultRatingScooter(): Observable<any> {
    const token = sessionStorage.getItem('token');

    // Configuración de la cabecera con el token de autorización
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<any>(
      `${apiBaseUrl}/vehicle/consultRatingScooter`,
      { headers }
    );
  }
}
