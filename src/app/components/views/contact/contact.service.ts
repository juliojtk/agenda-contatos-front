import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contaact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Pegando a url Base
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll(): Observable<Contact[]> {
    const url = `${this.baseUrl}/contact`
    return this.http.get<Contact[]>(url)
  }

  saveContact(contact: Contact): Observable<Contact> {
    const url = `${this.baseUrl}/contact`;
    return this.http.post<Contact>(url, contact);
  }

  deleteContact(id: String): Observable<void> {
    const url = `${this.baseUrl}/contact/${id}`;
    return this.http.delete<void>(url);
  }

  updateContact(contact: Contact): Observable<void> {
    const url = `${this.baseUrl}/contact/${contact.id}`;
    return this.http.put<void>(url, contact);
  }

  findById(id: String): Observable<Contact> {
    const url = `${this.baseUrl}/contact/${id}`
    return this.http.get<Contact>(url);
  }

  messages(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    })
  }

}
