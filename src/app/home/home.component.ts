import { Component } from '@angular/core';
import { SymbolsComponent } from '../components/symbols/symbols.component';

@Component({
  selector: 'app-home',
  imports: [SymbolsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
}
