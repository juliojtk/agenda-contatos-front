import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-delete',
  templateUrl: `./address-delete.component.html`,
  styleUrls: ['./address-delete.component.css']
})
export class AddressDeleteComponent implements OnInit {

  id_cont: String = '';

  address: Address = {
    id: '',
    cep: '',
    street: '',
    district: '',
    number: '',
    city: '',
    state: '',
    propertyType: '',
  }

  constructor(
    private service: AddressService,
    private routeAct: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.id_cont = this.routeAct.snapshot.paramMap.get('id_cont')!;
    this.address.id = this.routeAct.snapshot.paramMap.get('id_adress')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.address.id!).subscribe({
      next: (response) => {
        this.address = response;
      }
    })
  }

  deleteAddress(): void {
    this.service.deleteAddress(this.address.id!).subscribe({
      next: () => {
        this.route.navigate([`contact/${this.id_cont}/address`]);
        this.service.messages('Enredeço deletado com sucesso!');
      },
      error: () => {
        this.service.messages('Falha ao deletar endereço');
      },
    })
  }

  cancelBtn(): void {
    this.route.navigate([`contact/${this.id_cont}/address`]);
  }

}
