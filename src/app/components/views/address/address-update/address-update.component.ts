import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-update',
  templateUrl: `./address-update.component.html`,
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {

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

  types: any[] = [
    { name: 'Casa' },
    { name: 'Apartamento' },
    { name: 'Comercio' },
    { name: 'Chacara' },
    { name: 'Fazenda' },
    { name: 'Barracao' },
    { name: 'Lote' },
];

states: any = [
  {name: 'Acre - AC'},
  {name: 'Alagoas - AL'},
  {name: 'Amapá - AP'},
  {name: 'Amazonas - AM'},
  {name: 'Bahia - BA'},
  {name: 'Ceará - CE'},
  {name: 'Espírito Santo - ES'},
  {name: 'Goiás - GO'},
  {name: 'Maranhão - MA'},
  {name: 'Mato Grosso - MT'},
  {name: 'Mato Grosso do Sul - MS'},
  {name: 'Minas Gerais - MG'},
  {name: 'Pará - PA'},
  {name: 'Paraíba - PB'},
  {name: 'Paraná - PR'},
  {name: 'Pernambuco - PE'},
  {name: 'Piauí - PI'},
  {name: 'Rio de Janairo - RJ'},
  {name: 'Rio Grande do Norte - RN'},
  {name: 'Rio Grande do Sul - RS'},
  {name: 'Rondônia - RO'},
  {name: 'Roraima - RR'},
  {name: 'Santa Catarina - SC'},
  {name: 'São Paulo - SP'},
  {name: 'Sergipe - SE'},
  {name: 'Tocantins - TO'},
  {name: 'Distrito Federal - DF'},
]

  street = new FormControl('', [Validators.minLength(1)]);
  district = new FormControl('', [Validators.minLength(1)]);
  number = new FormControl('', [Validators.minLength(1)]);

  constructor(
    private service: AddressService,
    private routeAct: ActivatedRoute,
    private route: Router,
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

  updateAddress(): void {
    this.service.updateAddres(this.address).subscribe({
      next: (response) => {
        console.log(response);
        this.route.navigate([`contact/${this.id_cont}/address`]);
        this.service.messages(`Endereço de ID: ${this.address.id} Atualizado com Sucess! `);
      },
      error: () => {
        this.route.navigate([`contact/${this.id_cont}/address`]);
        this.service.messages(`Erro ao Atualizar Endereço ${this.address.id}`);
      }
    })
  }

  cancelBtn(): void {
    this.route.navigate([`contact/${this.id_cont}/address`]);
  }

  getMsg() {
    if (this.street.invalid) {
      return "O campo RUA deve ter de 1 a 150 caracteres"
    }else if(this.district.invalid){
      return "Campo Bairro é obrigatorio"
    }else if (this.number.invalid) {
      return "Campo NUMERO é obrigatorio"
    }
    return false;
  }

}
