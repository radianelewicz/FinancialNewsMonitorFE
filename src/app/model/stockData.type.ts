import { TMetaData } from "./metaData.type"
import { TStockValue } from "./stockValue.type";

export type TStockData = {
    metaData:TMetaData;
    stockValues:Array<TStockValue>
}