import { Component, inject, OnInit, signal, Type } from '@angular/core';
import { FinancialService } from '../services/financial.service';
import { TSymbol } from '../model/symbol.type';
import { SymbolsComponent } from '../components/symbols/symbols.component';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [SymbolsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private financialService = inject(FinancialService);
  storedSymbols = signal<Array<TSymbol>>([]);

  ngOnInit(): void {
    //this.storedSymbols.set(this.financialService.mockSymbols);
    this.financialService
      .getStoredSymbols()
      .pipe(catchError(err =>
        {
          console.log(err)
          throw err;
        }))
      .subscribe(symbols => this.storedSymbols.set(symbols));
  }
}
