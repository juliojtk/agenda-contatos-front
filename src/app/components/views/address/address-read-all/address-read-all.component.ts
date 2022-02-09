import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-read-all',
  templateUrl: `./address-read-all.component.html`,
  styleUrls: ['./address-read-all.component.css']
})
export class AddressReadAllComponent implements AfterViewInit {

  address: Address[] = [];
  displayedColumns: string[] = ['id', 'cep', 'street', 'district', 'number', 'city', 'state', 'propertyType', 'actions'];

  id_cont: String = ''

  dataSource = new MatTableDataSource<Address>(this.address);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: AddressService,
    private routeAct: ActivatedRoute,
    private router: Router,
  ) { }

  ngAfterViewInit() {
    this.id_cont = this.routeAct.snapshot.paramMap.get('id_cont')!
    this.findAll();
  }

  findAll(): void {
    this.service.findAllAddressByContact(this.id_cont).subscribe({
      next: (response) => {
        this.address = response;
        this.dataSource = new MatTableDataSource<Address>(this.address);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  goToCreateAddress(): void {
    this.router.navigate([`contact/${this.id_cont}/address/create`])
  }
}

