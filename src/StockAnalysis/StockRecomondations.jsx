import React, { useState, useEffect } from 'react';
import bouncingSquaresSVG from '../bouncing-squares.svg';

const StockRecommendations = ({ symbol }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/stock_recommendations/${symbol}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data);
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

  if (!recommendations || !recommendations.period) {
    return (
      <div className='stock-card'><p>No recommendations available</p></div>
    )
  }

  const getMonth = (index) => {
    const months = ["Current Month", "Previous Month", "2 Months Ago", "3 Months Ago"];
    return months[index];
  };

  return (
    <div className='stock-card'>
      <h2>Recommendations for {symbol}</h2>
      <table>
        <thead>
          <tr>
            <th>Period</th>
            <th>Buy</th>
            <th>Hold</th>
            <th>Sell</th>
            <th>Strong Buy</th>
            <th>Strong Sell</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(recommendations.period).map((key, index) => (
            <tr key={index}>
              <td>{getMonth(index)}</td>
              <td>{recommendations.buy[key]}</td>
              <td>{recommendations.hold[key]}</td>
              <td>{recommendations.sell[key]}</td>
              <td>{recommendations.strongBuy[key]}</td>
              <td>{recommendations.strongSell[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockRecommendations;
