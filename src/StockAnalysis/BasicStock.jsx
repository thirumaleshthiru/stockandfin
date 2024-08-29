import React, { useState, useEffect } from 'react';
import bouncingSquaresSVG from '../bouncing-squares.svg'; 
import '../CSS/StockInfo.css';

function numberWithCommas(x) {
  if (typeof x === 'number') {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return '--';
  }
}

/*
const convertToPercentage = (earningsGrowth) => {
  if (earningsGrowth !== '--' && typeof earningsGrowth === 'number') {
      return (earningsGrowth * 100).toFixed(2) + '%';
  } else {
      return '--';
  }
};
*/

function BasicStock({ symbol }) {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/stock_info/${symbol}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (error) {
    return <div className="stock-card">Error: {error}</div>;
  }

  if (!stockData) {
    return (
      <div className="loader">
        <img src={bouncingSquaresSVG} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
    <div className="stock-card stock-basic">
      <div> 
    <h2>{stockData.longName} ({stockData.symbol}) ({stockData.exchange})</h2>
    <p><strong>Current Price: </strong> {stockData.currentPrice} {stockData.currency}</p> 
    <p>

      <strong>Address: </strong>
      {stockData.address1 && stockData.address1 !== ',,,' && (
      <>
      {stockData.address1},
      {' '}
      </>
      )}
      {stockData.city && (
      <>
      {stockData.city},
      {' '}
      </>
      )}
      {stockData.state && (
      <>
      {stockData.state},
      {' '}
      </>
      )}
      {stockData.country && stockData.country !== ',,,' ? stockData.country : '--'}
      </p>

        <p><strong>Industry: </strong>{stockData.industry || '--'}</p>
        <p><strong>Sector: </strong>{stockData.sector || '--'}</p>
        <p><strong>Description: </strong>{stockData.longBusinessSummary || '--'}</p>
          <p>
        <strong>Website: </strong>
        {stockData.website ? (
        <a href={stockData.website} target="_blank" rel="noreferrer">
        {stockData.website}
        </a>
        ) : (
        '--'
        )}
        </p>

      </div>

    
    </div>
    
    <div className='stock-card stock-card-basic' >
        <div> 
        <p><strong>Open: </strong>{stockData.open || '--' } {stockData.currency || '--'}</p>
        <p><strong>Total Market Capital: </strong> {numberWithCommas(stockData.marketCap) || '--'} {stockData.currency || '--'}</p> 
        <p><strong>Close: </strong>{stockData.previousClose || '--'} {stockData.currency || '--'}</p>
        <p><strong>Day High: </strong>{stockData.dayHigh || '--' } {stockData.currency || '--'}</p>
        <p><strong>Day Low: </strong>{stockData.dayLow || '--'} {stockData.currency || '--'}</p>
        <p><strong>Recent Trading Day Volume: </strong>{numberWithCommas(stockData.volume) || '--'}</p>
        <p><strong>Average 10 Days Volume: </strong>{numberWithCommas(stockData.averageVolume10days) || '--'}</p>
        <p><strong>Average  Volume: </strong>{numberWithCommas(stockData.averageVolume) || '--'}</p>
      </div>

      <div>
        <p><strong>52 Week High: </strong>{stockData.fiftyTwoWeekHigh || '--'} {stockData.currency || '--'}</p>
        <p><strong>52 Week Low: </strong>{stockData.fiftyTwoWeekLow || '--'} {stockData.currency || '--'}</p>
        <p><strong>50 Day High: </strong>{stockData.fiftyDayAverage || '--'} {stockData.currency || '--'}</p>
        <p><strong>Earning Growth: </strong>{stockData.earningsGrowth || '--'}</p>
      </div>

      <div> 
        <p><strong>Return on Assets: </strong>{stockData.returnOnAssets || '--'} </p>
        <p><strong>Return on Equity: </strong>{stockData.returnOnEquity || '--'}</p>
        <p><strong>Revenue Growth: </strong>{stockData.revenueGrowth || '--'}</p>
        <p><strong>Revenue per Share: </strong>{stockData.revenuePerShare || '--'}</p>
      </div>

      <div> 
        <p><strong>Cash on Hand: </strong>{numberWithCommas(stockData.totalCash)} {stockData.currency || '--'}</p>
        <p><strong>Total Cash per Share: </strong>{stockData.totalCashPerShare || '--'} {stockData.currency || '--'}</p>
        <p><strong>Total Debt: </strong>{numberWithCommas(stockData.totalDebt) || '--'} {stockData.currency || '--'}</p>
        <p><strong>Total Revenue: </strong>{numberWithCommas(stockData.totalRevenue) || '--'} {stockData.currency || '--'}</p>
      </div>
    </div>
    </>
  );
}

export default BasicStock;
