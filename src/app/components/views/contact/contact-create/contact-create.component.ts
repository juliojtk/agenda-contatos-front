import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contaact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: `./contact-create.component.html`,
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contact: Contact = {
    id: '',
    name: '',
    phone: '',
    email: ''
  }

  constructor(private service: ContactService, private route: Router) { }

  ngOnInit(): void {
  }

  saveContact() {
    this.service.saveContact(this.contact).subscribe({
      next: () => {
        this.route.navigate(['contact']);
        this.service.messages('Contato Criado com Sucesso!');
      },
      error: (err) => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.messages(err.error.errors[i].msg)
        }
      }
    })
  }

  cancelBtn(): void {
    this.route.navigate(['contact']);
  }

}
