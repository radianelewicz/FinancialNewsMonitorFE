import { Component, inject, signal } from '@angular/core';
import { FinancialService } from '../services/financial.service';
import { SymbolsComponent } from '../components/symbols/symbols.component';
import { NgIf } from '@angular/common';
import { TSymbol } from '../model/symbol.type';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-external',
  imports: [SymbolsComponent, NgIf, FormsModule],
  templateUrl: './external.component.html',
  styleUrl: './external.component.css'
})
export class ExternalComponent {
  private _financialService = inject(FinancialService);
  externalSymbols = signal<Array<TSymbol>>([]); 
  keyword = signal('');
  isDataLoaded = signal(false);

  getExternalSymbols(){
    //this.externalSymbols.set(this._financialService.mockSymbols);
    this._financialService
      .getExternalSymbols(this.keyword())
      .pipe(catchError(err =>
        {
          console.log(err)
          throw err;
        }))
      .subscribe(symbols =>
        {
          this.externalSymbols.set(symbols);
          this.isDataLoaded.set(true);     
        });
  }
}
