import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Contact } from '../contaact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-read',
  templateUrl: `./contact-read.component.html`,
  styleUrls: ['./contact-read.component.css']
})
export class ContactReadComponent implements AfterViewInit {

  contacts: Contact[] = [];
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'address', 'actions'];

  dataSource = new MatTableDataSource<Contact>(this.contacts);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ContactService, private route: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({
      next: (response) => {
        for (let i = 0; i < response.length; i++) {
          var phoneFormat = this.formatPhone(response[i].phone)
          response[i].phone = phoneFormat
          this.contacts = response;
        }
        this.dataSource = new MatTableDataSource<Contact>(this.contacts);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  formatPhone(phone: String) {
    phone = phone.replace(/[^\d+]/g, "");
    return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "(0$1) $2-$3-$4")
  }

  goToContactCreate() {
    this.route.navigate(['contact/create']);
  }


}
