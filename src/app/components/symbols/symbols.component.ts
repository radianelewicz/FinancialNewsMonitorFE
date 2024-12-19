import { Component, ComponentRef, inject, input, OnInit, signal, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TSymbol } from '../../model/symbol.type';
import { StockdataComponent } from '../stockdata/stockdata.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FinancialService } from '../../services/financial.service';
import { catchError } from 'rxjs';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-symbols',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule],
  templateUrl: './symbols.component.html',
  styleUrl: './symbols.component.css'
})
export class SymbolsComponent implements OnInit {
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
  private _viewContainerRef = viewChild('stockDataContainer', {read: ViewContainerRef});
  private _stockDataComponentRef? : ComponentRef<StockdataComponent>;
  private _financialService = inject(FinancialService);
  isForExternal = input(false);
  keyword = input('');
  columnsToDisplay = signal(['symbol', 'name', 'type', 'region', 'marketOpen', 'marketClose', 'timezone', 'currency', 'matchScore', 'details']);
  symbol = signal<TSymbol>(this._defaultSymbol);
  dataSource!: MatTableDataSource<TSymbol>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  ngOnInit(): void {
    if (!this.isForExternal()) {
      this._financialService
      .getStoredSymbols()
      .pipe(catchError(err =>
        {
          console.log(err)
          throw err;
        }))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<TSymbol>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    else {
      this._financialService
      .getExternalSymbols(this.keyword())
      .pipe(catchError(err =>
        {
          console.log(err)
          throw err;
        }))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource<TSymbol>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  showStockData(symbol:TSymbol){
    if (this.symbol().symbol === symbol.symbol) {
      return;
    }
    else {
      this.destroyCurrentStockDataComponent(true);
    }
    this.symbol.set(symbol);
    this._stockDataComponentRef = this._viewContainerRef()?.createComponent(StockdataComponent);
    this._stockDataComponentRef?.setInput('symbol', this.symbol());
    this._stockDataComponentRef?.setInput('isForExternal', this.isForExternal());
    this._stockDataComponentRef?.instance.isDeleted.subscribe(
      ($event) => {
        if ($event){
          this.destroyCurrentStockDataComponent($event);
          this.deleteRowFromDataSource(symbol.symbol);
        }
      }
    )
  }

  private destroyCurrentStockDataComponent(shouldBeRemoved: boolean) {
    if (shouldBeRemoved) {
      this._stockDataComponentRef?.destroy();
    }
  }

  private deleteRowFromDataSource (symbol:string) {
    const itemIndex = this.dataSource.data.findIndex(obj => obj.symbol === symbol);
    this.dataSource.data.splice(itemIndex, 1);
    this.dataSource.paginator = this.paginator;
  }
}
