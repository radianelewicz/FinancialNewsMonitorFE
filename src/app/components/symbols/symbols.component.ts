import { Component, inject, input, signal } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TSymbol } from '../../model/symbol.type';
import { NgIf } from '@angular/common';
import { StockdataComponent } from '../stockdata/stockdata.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-symbols',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, StockdataComponent, NgIf],
  templateUrl: './symbols.component.html',
  styleUrl: './symbols.component.css'
})
export class SymbolsComponent {
  private _defaultSymbol: TSymbol = {
    symbol: '',
    name: '',
    type: '',
    region: '',
    marketOpen: '',
    marketClose: '',
    timezone: '',
    currency: '',
    matchScore: 0
  };
  symbol = signal<TSymbol>(this._defaultSymbol);
  isForExternal = input(false);
  symbols = input<Array<TSymbol>>([]);
  showStockDataComponent = signal(false);
  columnsToDisplay = signal(['symbol', 'name', 'type', 'region', 'marketOpen', 'marketClose', 'timezone', 'currency', 'matchScore', 'details']);

  showStockData(symbol:TSymbol){
    this.symbol.set(symbol);
    this.showStockDataComponent.set(true);
  }
}
