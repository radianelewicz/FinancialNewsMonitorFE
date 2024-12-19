import { inject, Injectable } from '@angular/core';
import { TSymbol } from '../model/symbol.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TStockData } from '../model/stockData.type';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private _apiUrl = 'https://localhost:44363/api';
  private _externalSegmentUrl = '/ExternalData/';
  private _financialSegmentUrl = '/Financial/';
  private _httpClient = inject(HttpClient);

  getExternalSymbols(keyword:string){
    return this._httpClient.get<Array<TSymbol>>(this._apiUrl + this._externalSegmentUrl + 'Symbols/' + keyword);
  }

  getExternalStockData(symbol:string){
    return this._httpClient.get<TStockData>(this._apiUrl + this._externalSegmentUrl + 'StockData/' + symbol);
  }
  
  getStoredSymbols() {
    return this._httpClient.get<Array<TSymbol>>(this._apiUrl + this._financialSegmentUrl);
  }
  
  getStoredStockData(symbol: string) {
    return this._httpClient.get<TStockData>(this._apiUrl + this._financialSegmentUrl + symbol);
  }

  createSymbolStockData(symbol:TSymbol, stockData:TStockData){
    return this._httpClient.post(this._apiUrl + this._financialSegmentUrl, { 
      symbolRequest: symbol,
      stockDataRequest:
      {
        metaDataRequest: stockData.metaDataResponse,
        stockValuesRequest: stockData.stockValuesResponse
      }
    });
  }

  updateSymbolStockData(symbol:TSymbol, stockData:TStockData){
    return this._httpClient.patch<boolean>(this._apiUrl + this._financialSegmentUrl, { 
        symbolRequest: symbol,
        stockDataRequest:
        {
          metaDataRequest: stockData.metaDataResponse,
          stockValuesRequest: stockData.stockValuesResponse
        }
      });
  }

  deleteSymbolStockData(symbol:string){
    return this._httpClient.delete<boolean>(this._apiUrl + this._financialSegmentUrl + symbol);
  }
}
