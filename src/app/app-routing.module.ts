import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
