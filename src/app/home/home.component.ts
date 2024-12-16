import { Component, inject, OnInit, signal } from '@angular/core';
import { FinancialService } from '../services/financial.service';
import { Symbol } from '../model/symbol.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  financialService = inject(FinancialService);
  router = inject(Router);
  mockSymbols = signal<Array<Symbol>>([]);
  storedSymbols = signal<Array<Symbol>>([]);
  columnsToDisplay = signal(['symbol', 'name', 'type', 'region', 'marketOpen', 'marketClose', 'timezone', 'currency', 'matchScore', 'details']);

  ngOnInit(): void {
    this.mockSymbols.set(this.financialService.items);
    this.financialService
      .getStoredSymbols()
      .pipe(catchError(err =>
        {
          console.log(err)
          throw err;
        }))
      .subscribe(symbols => this.storedSymbols.set(symbols));
  }

  showStockData(symbol:string){
    this.router.navigate(['/'+symbol]);
    //this.financialService.getSymbolStockData(symbol);
  }
}
