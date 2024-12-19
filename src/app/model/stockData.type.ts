import { TMetaData } from "./metaData.type"
import { TStockValue } from "./stockValue.type";

export type TStockData = {
    metaDataResponse:TMetaData;
    stockValuesResponse:Array<TStockValue>
}