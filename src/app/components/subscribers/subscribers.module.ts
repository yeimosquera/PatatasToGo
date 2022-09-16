import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateSubscriberComponent } from './create-subscriber/create-subscriber.component';
import { ReactiveFormsModule } from '@angular/forms';



//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalDeleteComponent } from './dashboard/modal-delete/modal-delete.component';
import { ModalUpdateComponent } from './dashboard/modal-update/modal-update.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateSubscriberComponent,
    ModalDeleteComponent,
    ModalUpdateComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class SubscribersModule { }
