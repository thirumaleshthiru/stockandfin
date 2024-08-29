import { useParams } from "react-router-dom";
import BasicStock from "./BasicStock";
import OneMonthStock from "./OneMonthStock";
import OneYearStock from "./OneYearStock";
 import StockRecomondations from "./StockRecomondations";
import MiscStockInfo from "./MiscStockInfo";
import StockCashFlow from "./StockCashFlow";
import StockIncomeStatement from "./StockIncomeStatement";
import BalanceSheet from "./BalanceSheet";
import StockSplits from "./StockSplits";
import Dividends from "./Dividends";
import OneWeekStock from "./OneWeekStock";
import { Helmet } from 'react-helmet';


function StockInfo(){
    const { symbol } = useParams();
    return (
        <>
        <main>
        
        <Helmet>
          <title>{`Stockinfo Info for ${symbol}`}</title>
          <meta name="description" content={`Stock and Fin - Stock Analytics, Insights and more`} />
        </Helmet>

        <h1>Stock Info</h1>
        <div className="stockinfo">
        <BasicStock symbol={symbol} />
        <OneWeekStock symbol={symbol} />
        <OneMonthStock symbol={symbol} />
        <OneYearStock symbol={symbol} />
        <StockRecomondations symbol={symbol} />
        <MiscStockInfo symbol={symbol} />
        <StockCashFlow symbol={symbol} />
        <StockIncomeStatement symbol={symbol} /> 
        <BalanceSheet symbol={symbol} />
        <StockSplits symbol={symbol} />
        <Dividends symbol={symbol} />
        </div>
        </main>
        </>
    )

}

export default StockInfo;