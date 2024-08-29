import React, { useState, useEffect } from 'react';
import bouncingSquaresSVG from '../bouncing-squares.svg';

function Dividends({ symbol }) {
  const [dividendData, setDividendData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dividends/${symbol}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dividends data');
        }
        const data = await response.json();
        setDividendData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    } else {
      setLoading(false);
    }
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

  if (dividendData.length === 0) {
    return <div className='stock-card'>No dividend data available for {symbol}</div>;
  }

  return (
    <div className='stock-card stock-card-table'>
      <h2>Dividend Data for {symbol}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Dividend</th>
          </tr>
        </thead>
        <tbody>
          {dividendData.map((dividend, index) => (
            <tr key={index}>
              <td>{dividend.Date}</td>
              <td>{dividend.Day}</td>
              <td>{dividend.Dividend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dividends;
