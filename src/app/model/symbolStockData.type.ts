import { TStockData } from "./stockData.type";
import { TSymbol } from "./symbol.type"

export type TSymbolStockData = {
    symbol:TSymbol;
    stockData:TStockData;
}