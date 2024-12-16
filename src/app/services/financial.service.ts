import { inject, Injectable } from '@angular/core';
import { Symbol } from '../model/symbol.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private _apiUrl = 'https://localhost:44363/api/';
  private _httpClient = inject(HttpClient);

  items: Array<Symbol> = [
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


  getStoredSymbols() {
    return this._httpClient.get<Array<Symbol>>(this._apiUrl+'Financial');
  }

  getSymbolStockData(symbol:string) {
    return this._httpClient.get<Array<Symbol>>(this._apiUrl+symbol);
  }
}
