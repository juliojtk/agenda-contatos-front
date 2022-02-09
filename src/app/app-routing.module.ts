import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressCreateComponent } from './components/views/address/address-create/address-create.component';
import { AddressDeleteComponent } from './components/views/address/address-delete/address-delete.component';
import { AddressReadAllComponent } from './components/views/address/address-read-all/address-read-all.component';
import { AddressUpdateComponent } from './components/views/address/address-update/address-update.component';
import { ContactCreateComponent } from './components/views/contact/contact-create/contact-create.component';
import { ContactDeleteComponent } from './components/views/contact/contact-delete/contact-delete.component';
import { ContactReadComponent } from './components/views/contact/contact-read/contact-read.component';
import { ContactUpdateComponent } from './components/views/contact/contact-update/contact-update.component';
import { HomeComponent } from './components/views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactReadComponent
  },
  {
    path: 'contact/create',
    component: ContactCreateComponent
  },
  {
    path: 'contact/update/:id',
    component: ContactUpdateComponent
  },
  {
    path: 'contact/delete/:id',
    component: ContactDeleteComponent
  },
  {
    path: 'contact/:id_cont/address',
    component: AddressReadAllComponent
  },
  {
    path: 'contact/:id_cont/address/create',
    component: AddressCreateComponent
  },
  {
    path: 'contact/:id_cont/address/:id_adress/update',
    component: AddressUpdateComponent
  },
  {
    path: 'contact/:id_cont/address/:id_adress/delete',
    component: AddressDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
