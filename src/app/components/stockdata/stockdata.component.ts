import { Component, inject, input, output, OnInit, signal, ViewChild } from '@angular/core';
import { TStockData } from '../../model/stockData.type';
import { NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TStockValue } from '../../model/stockValue.type';
import { TMetaData } from '../../model/metaData.type';
import { FinancialService } from '../../services/financial.service';
import { TSymbol } from '../../model/symbol.type';
import { catchError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stockdata',
  imports: [NgIf, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule],
  templateUrl: './stockdata.component.html',
  styleUrl: './stockdata.component.css'
})
export class StockdataComponent implements OnInit {
  private _defaultMetaData: TMetaData = {
      information: '',
      lastRefreshed: new Date(),
      timeZone: ''
    };
  private _defaultStockValues: Array<TStockValue> = [
    ]; 
  private _defaultStockData: TStockData = {
      metaDataResponse: this._defaultMetaData,
      stockValuesResponse: this._defaultStockValues
    };
  private _financialService = inject(FinancialService);
  isForExternal = input(false);
  symbol = input<TSymbol>();
  isDeleted = output<boolean>();
  columnsToDisplay = signal(['date', 'open', 'high', 'low', 'close', 'volume']);
  storedSymbols = signal<Array<TSymbol>>([]);
  stockData = signal<TStockData>(this._defaultStockData);
  dataSource!: MatTableDataSource<TStockValue>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  ngOnInit(): void {
    if (!this.isForExternal()) {
      this._financialService
        .getStoredStockData(this.symbol()?.symbol as string)
        .pipe(catchError(err =>
          {
            console.log(err)
            throw err;
          }))
          .subscribe(storedStockData => {
            this.stockData.set(storedStockData);
            this.dataSource = new MatTableDataSource<TStockValue>(storedStockData.stockValuesResponse);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
    }
    else {
      this._financialService
        .getExternalStockData(this.symbol()?.symbol as string)
        .pipe(catchError(err =>
          {
            console.log(err)
            throw err;
          }))
        .subscribe(externalStockData => {
          this.stockData.set(externalStockData);
          this.dataSource = new MatTableDataSource<TStockValue>(externalStockData.stockValuesResponse);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this._financialService.getStoredSymbols()
        .pipe(catchError(err => {
          console.log(err)
            throw err;
        }))
        .subscribe(response => this.storedSymbols.set(response));
    }
  }

  deleteSymbolStockData() {
    return this._financialService.deleteSymbolStockData(this.symbol()?.symbol as string)
      .pipe(catchError(err => {
          console.log(err)
            throw err;
        }))
      .subscribe(response => {
        if (response) {
          this.isDeleted.emit(true);
        }
      });
  }

  saveSymbolStockData() {
    if (this.storedSymbols()?.find(x => x.symbol === this.symbol()?.symbol))
    {
      return this.updateSymbolStockData();
    }

    return this._financialService.createSymbolStockData(this.symbol() as TSymbol, this.stockData())
      .pipe(catchError(err => {
          console.log(err)
            throw err;
        }))
      .subscribe(() => this.storedSymbols().push(this.symbol() as TSymbol));
  }

  updateSymbolStockData() {
    return this._financialService.updateSymbolStockData(this.symbol() as TSymbol, this.stockData())
      .pipe(catchError(err => {
          console.log(err)
            throw err;
        }))
      .subscribe(response => {
        if(response){
          const itemIndex = this.storedSymbols().findIndex(obj => obj.symbol === this.symbol()?.symbol);
          this.storedSymbols()[itemIndex] = this.symbol() as TSymbol;
        }
      });
  }
}