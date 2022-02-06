import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contaact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: `./contact-update.component.html`,
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  contact: Contact = {
    id: '',
    name: '',
    phone: '',
    email: ''
  }

  constructor(private service: ContactService, private routeAct: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    // Recuperando o id que esta passando na url
    this.contact.id = this.routeAct.snapshot.paramMap.get('id')!;
    this.findById();

  }

  findById(): void {
    this.service.findById(this.contact.id!).subscribe({
      next: (response) => {
        this.contact.name = response.name;
        this.contact.phone = response.phone;
        this.contact.email = response.email;
      },
      error: (err) => {
      }
    })
  }

  updateContact():void{
    this.service.updateContact(this.contact).subscribe({
      next: () => {
        this.route.navigate(['contact']);
        this.service.messages(`Contato ID: ${this.contact.id} atualizado com sucesso!`);
      },
      error: (err) => {
        this.service.messages('Campos não podem ser vazios')
      }
    })
  }

  cancel(): void{
    this.route.navigate(['contact']);
  }

}
