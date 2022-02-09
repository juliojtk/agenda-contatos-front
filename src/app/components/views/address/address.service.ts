import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllAddressByContact(id_cont: String): Observable<Address[]> {
    const url = `${this.baseUrl}/address?contact=${id_cont}`;
    return this.http.get<Address[]>(url);
  }

  findById(id: String): Observable<Address> {
    const url = `${this.baseUrl}/address/${id}`;
    return this.http.get<Address>(url);
  }

  saveAddress(address: Address, id_cont: String): Observable<Address> {
    const url = `${this.baseUrl}/address?contact=${id_cont}`;
    return this.http.post<Address>(url, address);
  }

  updateAddres(address: Address): Observable<Address> {
    const url = `${this.baseUrl}/address/${address.id}`;
    return this.http.put<Address>(url, address);
  }

  deleteAddress(id: String): Observable<void> {
    const url = `${this.baseUrl}/address/${id}`;
    return this.http.delete<void>(url);
  }

  messages(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
