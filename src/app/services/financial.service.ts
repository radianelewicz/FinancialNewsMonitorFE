import { inject, Injectable } from '@angular/core';
import { TSymbol } from '../model/symbol.type';
import { HttpClient } from '@angular/common/http';
import { TSymbolStockData } from '../model/symbolStockData.type';
import { TStockData } from '../model/stockData.type';
import { TMetaData } from '../model/metaData.type';
import { TStockValue } from '../model/stockValue.type';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private _apiUrl = 'https://localhost:44363/api';
  private _externalSegmentUrl = '/ExternalData/';
  private _financialSegmentUrl = '/Financial/';
  private _httpClient = inject(HttpClient);

  private _mockMetaData: TMetaData = {
    information: 'test',
    date: new Date(),
    symbol: 'a',
    timeZone: 'b'
  };

  private _mockStockValues: Array<TStockValue> = [
    {
      close: 0,
      date: new Date(),
      high: 0,
      low: 0,
      open: 0,
      volume: 0
    },
    {
      close: 0,
      date: new Date(),
      high: 0,
      low: 0,
      open: 0,
      volume: 0
    }
  ];

  mockStockData: TStockData = {
    metaData: this._mockMetaData,
    stockValues: this._mockStockValues
  };

  mockSymbols: Array<TSymbol> = [
    {
      symbol: 'b',
      name: 'b',
      type: 'c',
      region: 'd',
      marketOpen: 'e',
      marketClose: 'f',
      timezone: 'g',
      currency: 'h',
      matchScore: 0
    },
    {
      symbol: 'a',
      name: 'b',
      type: 'c',
      region: 'd',
      marketOpen: 'e',
      marketClose: 'f',
      timezone: 'g',
      currency: 'h',
      matchScore: 0
    },
    {
      symbol: 'aa',
      name: 'bb',
      type: 'cc',
      region: 'dd',
      marketOpen: 'ee',
      marketClose: 'ff',
      timezone: 'gg',
      currency: 'hh',
      matchScore: 1
    }
  ];

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
    return this._httpClient.get<TStockData>(this._apiUrl + '/'+ symbol);
  }

  createSymbolStockData(symbol:TSymbol, stockData:TStockData){
    return this._httpClient.post<TSymbolStockData>(this._apiUrl + this._financialSegmentUrl, {symbol, stockData});
  }

  updateSymbolStockData(symbol:TSymbol, stockData:TStockData){
    return this._httpClient.patch<TSymbolStockData>(this._apiUrl + this._financialSegmentUrl, {symbol, stockData});
  }

  deleteSymbolStockData(symbol:string){
    return this._httpClient.delete<boolean>(this._apiUrl + this._financialSegmentUrl + symbol);
  }
}
