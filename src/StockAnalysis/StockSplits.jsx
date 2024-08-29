import React, { useState, useEffect } from 'react';
import bouncingSquaresSVG from '../bouncing-squares.svg';

function StockSplits({ symbol }) {
  const [stockSplits, setStockSplits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/stock_splits/${symbol}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock splits');
        }
        const data = await response.json();
        setStockSplits(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="loader">
        <img src={bouncingSquaresSVG} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div className="stock-card">Error: {error}</div>;
  }

  if (stockSplits.length === 0) {
    return <div className='stock-card'>No stock splits available for {symbol}</div>;
  }

  return (
    <div className='stock-card'>
      <h2>Stock Splits for {symbol}</h2>
      {stockSplits.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Cumulative Multiple</th>
              <th>Multiple</th>
              <th>Split Ratio</th>
              <th>Stock Splits</th>
            </tr>
          </thead>
          <tbody>
            {stockSplits.map((split, index) => (
              <tr key={index}>
                <td>{split.Date}</td>
                <td>{split["Cumulative multiple"]}</td>
                <td>{split.Multiple}</td>
                <td>{split.Split}</td>
                <td>{split["Stock Splits"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StockSplits;
