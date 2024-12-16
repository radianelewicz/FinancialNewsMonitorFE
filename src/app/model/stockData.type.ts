import { MetaData } from "./metaData.type"
import { StockValue } from "./stockValue.type";

export type StockData = {
    metaData:MetaData;
    stockValues:Array<StockValue>
}