import { Component } from '@angular/core';
import { SPServicio } from'./servicios/sp-servicio';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crear-editar-empleado';
}
