import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contaact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-delete',
  templateUrl: `./contact-delete.component.html`,
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {

  contact: Contact = {
    id: '',
    name: '',
    phone: '',
    email: ''
  }

  constructor(private service: ContactService, private routeAct: ActivatedRoute, private route: Router) { }

  // Metodo que excuta toda vez que a aplicaçao é iniciada
  ngOnInit(): void {
    this.contact.id = this.routeAct.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.contact.id!).subscribe({
      next: (response) => {
        this.contact.name = response.name;
        this.contact.phone = response.phone;
        this.contact.email = response.email;
      }
    })
  }

  deleteContact(): void {
    this.service.deleteContact(this.contact.id!).subscribe({
      next: (response) => {
        this.route.navigate(['contact']);
        this.service.messages('Contato Deletado com Sucesso');
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        this.service.messages(err.error.msg);
      }
    })
  }

  cancel(): void {
    this.route.navigate(['contact']);
  }

}
