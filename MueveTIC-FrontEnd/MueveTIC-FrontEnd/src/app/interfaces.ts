export interface Admin {

  name: string;
  surname: string;
  email:string;
  validation:number;
  dni:string;
  phone:string;
  city:string;
  role:string;
  password:string;
}

export interface Personal {
  name: string;
  surname: string;
  email:string;
  validation:number;
  carnet: string;
  experience:number;
  city:string;
  dni: string;
  role:string;
  password:string;
}


export interface User {
  name: string;
  surname: string;
  email:string;
  validation:number;
  role:string;
  dni:string;
  numerPhone:string;
  birthDate:string;
  carnet:string;
  password:string;
}

export interface Car {
  vehicle:any;
  nSeats: number;
  type: string;
  licensePlate:string;
  model:string;
  address:string;
  battery:number;
  state:number;
  mean:number;
  rating:number;
  available:boolean;
  unAvailable:boolean;
  reserved:boolean;
  pendingCharging:boolean;
  ocupied:boolean;
  deactivated:boolean;
}

export interface Motorcycle {
  vehicle:any;
  helmet: boolean;
  type: string;
  licensePlate:string;
  model:string;
  address:string;
  battery:number;
  state:number;
  mean:number;
  rating:number;


}

export interface Scooter {
  color: string;
  type: string;
  licensePlate:string;
  model:string;
  address:string;
  battery:number;
  state:number;
  vehicle:any;
  mean:number;
  rating:number;
}

export interface Booking {
  id:number;
  state: number;
  date: string;
  user:User;
  vehicle:any;
  rating: number;
  comment: string;
  price:number;
  statechange:string
}

export interface VehicleType {
  type:string;
}



