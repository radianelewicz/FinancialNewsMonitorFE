import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TStockData } from '../../model/stockData.type';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TStockValue } from '../../model/stockValue.type';
import { TMetaData } from '../../model/metaData.type';
import { FinancialService } from '../../services/financial.service';
import { TSymbol } from '../../model/symbol.type';
import { catchError } from 'rxjs';
import { TSymbolStockData } from '../../model/symbolStockData.type';

@Component({
  selector: 'app-stockdata',
  imports: [NgIf, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './stockdata.component.html',
  styleUrl: './stockdata.component.css'
})
export class StockdataComponent implements OnInit {
  private _metaData: TMetaData = {
      information: '',
      date: new Date(),
      symbol: '',
      timeZone: ''
    };
  private _stockValues: Array<TStockValue> = [
    ]; 
  private _defaultStockData: TStockData = {
      metaData: this._metaData,
      stockValues: this._stockValues
    };
  stockData = signal<TStockData>(this._defaultStockData);
  private _financialService = inject(FinancialService);
  isForExternal = input(false);
  symbol = input<TSymbol>();
  columnsToDisplay = signal(['date', 'open', 'high', 'low', 'close', 'volume']);
  storedSymbols = signal<Array<TSymbol>>([]);

  ngOnInit(): void {
    if (!this.isForExternal()) {
      //this.stockData.set(this._financialService.mockStockData);
      this._financialService
        .getStoredStockData(this.symbol()?.symbol as string)
        .pipe(catchError(err =>
          {
            console.log(err)
            throw err;
          }))
        .subscribe(storedStockData => this.stockData.set(storedStockData));
    }
    else {
      //this.stockData.set(this._financialService.mockStockData);
      this._financialService
        .getExternalStockData(this.symbol()?.symbol as string)
        .pipe(catchError(err =>
          {
            console.log(err)
            throw err;
          }))
        .subscribe(storedStockData => this.stockData.set(storedStockData));
    }
  }

  deleteSymbolStockData() {
    return this._financialService.deleteSymbolStockData(this.symbol()?.symbol as string)
      .pipe(catchError(err => {
          console.log(err)
            throw err;
        }))
      .subscribe(response => response);
  }

  saveSymbolStockData() {
    this._financialService.getStoredSymbols()
      .pipe(catchError(err => {
        console.log(err)
          throw err;
      }))
      .subscribe(response => this.storedSymbols.set(response));

    if (this.storedSymbols().find(x => x.symbol === this.symbol()?.symbol))
    {
      return this.updateSymbolStockData();
    }

    return this._financialService.createSymbolStockData(this.symbol() as TSymbol, this.stockData())
      .pipe(catchError(err => {
          console.log(err)
            throw err;
        }))
      .subscribe(response => response);
  }

  updateSymbolStockData() {
    return this._financialService.updateSymbolStockData(this.symbol() as TSymbol, this.stockData())
      .pipe(catchError(err => {
          console.log(err)
            throw err;
        }))
      .subscribe(response => response);
  }
}