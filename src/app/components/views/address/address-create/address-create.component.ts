import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-create',
  templateUrl: `./address-create.component.html`,
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  id_cont: String = '';
  states: any[] = [];
  types: any[] = [];

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

  street = new FormControl('', [Validators.minLength(1)]);
  number = new FormControl('', [Validators.minLength(1)]);
  district = new FormControl('', [Validators.minLength(2)]);

  constructor(
    private service: AddressService,
    private routeAct: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.id_cont = this.routeAct.snapshot.paramMap.get('id_cont')!;
    this.states = this.service.states;
    this.types = this.service.types;
  }

  saveAddress(): void {
    this.service.saveAddress(this.address, this.id_cont).subscribe({
      next: () => {
        this.route.navigate([`contact/${this.id_cont}/address`]);
        this.service.messages('Endereço Cadastrado com Suceso!');
      },
      error: () => {
        this.route.navigate([`contact/${this.id_cont}/address`]);
        this.service.messages('Erro ao Criar novo Endereço, Verifique tamanho de caracteres dos numeros');
      }
    })
  }

  cancelBtn(): void {
    this.route.navigate([`contact/${this.id_cont}/address`]);
  }

  getMsg() {

    if (this.street.invalid) {
      return "O campo RUA deve ter de 1 a 150 caracteres"
    } else if (this.district.invalid) {
      return "Campo Bairro é obrigatorio"
    } else if (this.number.invalid) {
      return "Campo NUMERO é obrigatorio"
    }
    return false;
  }
}
