import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contaact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-read',
  templateUrl: `./contact-read.component.html`,
  styleUrls: ['./contact-read.component.css']
})
export class ContactReadComponent implements OnInit {

  contacts: Contact[] = [];

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'address', 'actions'];

  constructor(private service: ContactService, private route: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      console.log(response);
      this.contacts = response;
    })
  }

  goToContactCreate(){
    this.route.navigate(['contact/create']);
  }


}
