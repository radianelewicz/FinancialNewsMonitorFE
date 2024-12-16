import { Component } from '@angular/core';

@Component({
  selector: 'app-external',
  imports: [],
  templateUrl: './external.component.html',
  styleUrl: './external.component.css'
})
export class ExternalComponent {

  eventKeyUpHandler(event: KeyboardEvent){
    console.log('user presed the: ' + event.key + ' key');
  }

}
