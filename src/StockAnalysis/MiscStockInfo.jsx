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

/*const convertToPercentage = (earningsGrowth) => {
  if (earningsGrowth !== '--' && typeof earningsGrowth === 'number') {
      return (earningsGrowth * 100).toFixed(2) + '%';
  } else {
      return '--';
  }
};
*/

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString(); // Adjust date format as needed
}

function MiscStockInfo({ symbol }) {
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
    <div className="stock-card"> 
    <h2>Miscellaneous Stock Information</h2>


      <div> 
         <p><strong>Current Ratio: </strong>{numberWithCommas(stockData.currentRatio) || '--'}</p>
        <p><strong>Date Short Interest: </strong>{stockData.dateShortInterest ? formatDate(stockData.dateShortInterest) : '--'}</p>
        <p><strong>Debt to Equity: </strong>{stockData.debtToEquity || '--'}</p>
        <p><strong>Ebitda: </strong>{numberWithCommas(stockData.ebitda) || '--'}</p>
      </div>
      
      <div> 
        <p><strong>Enterprise Value: </strong>{numberWithCommas(stockData.enterpriseValue) || '--'}</p>
        <p><strong>Float Shares: </strong>{numberWithCommas(stockData.floatShares) || '--'}</p>
        <p><strong>Forward EPS: </strong>{stockData.forwardEps || '--'}</p>
        <p><strong>Forward PE: </strong>{stockData.forwardPE || '--'}</p>
      </div>

      <div> 
        <p><strong>ask: </strong>{stockData.ask || '--'}</p>
        <p><strong>ask Size: </strong>{stockData.askSize || '--'}</p>
        <p><strong>Audit Risk: </strong>{stockData.auditRisk || '--'}</p>
        <p><strong>bid: </strong>{stockData.bid || '--'}</p>
        <p><strong>bidSize: </strong>{stockData.bidSize || '--'}</p>

      </div>


      <div> 
        <p><strong>Board Risk: </strong>{stockData.boardRisk || '--'}</p>
        <p><strong>Book Value: </strong>{stockData.bookValue || '--'}</p>
        <p><strong>Compensation As of Epoch Date: </strong>{stockData.compensationAsOfEpochDate ? formatDate(stockData.compensationAsOfEpochDate) : '--'}</p>
        <p><strong>Compensation Risk: </strong>{stockData.compensationRisk || '--'}</p>
      </div>

      <div> 
        <p><strong>Target High Price: </strong>{stockData.targetHighPrice || '--'}</p>
        <p><strong>Target Low Price: </strong>{stockData.targetLowPrice || '--'}</p>
        <p><strong>Target Mean Price: </strong>{stockData.targetMeanPrice || '--'}</p>
        <p><strong>Target Median Price: </strong>{stockData.targetMedianPrice || '--'}</p>
</div>

<div> 
        <p><strong>UUID: </strong>{stockData.uuid || '--'}</p>
        <p><strong>ZIP: </strong>{stockData.zip || '--'}</p>
         
</div>


    </div>
    </>

  );
}

export default MiscStockInfo;
