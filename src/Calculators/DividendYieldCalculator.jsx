import React, { useState } from 'react';
import '../CSS/Calculators.css';

function DividendYieldCalculator() {
  const [annualDividend, setAnnualDividend] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [dividendYield, setDividendYield] = useState('');

  const calculateDividendYield = (e) => {
    e.preventDefault();

    // Convert input values to floating point numbers
    const annualDividendValue = parseFloat(annualDividend);
    const stockPriceValue = parseFloat(stockPrice);

    // Calculate dividend yield
    const dividendYieldValue = (annualDividendValue / stockPriceValue) * 100;

    // Set the calculated dividend yield
    setDividendYield(dividendYieldValue.toFixed(2));
  };

  return (
    <main><h1>Dividend Yield Calculator</h1>
      <div className='dividend-yield'>
        
        <form onSubmit={calculateDividendYield}>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="annualDividend">Annual Dividend:</label></td>
                <td><input
                  type="number"
                  id="annualDividend"
                  value={annualDividend}
                  onChange={(e) => setAnnualDividend(e.target.value)}
                  required
                /></td>
              </tr>
              <tr>
                <td><label htmlFor="stockPrice">Stock Price:</label></td>
                <td><input
                  type="number"
                  id="stockPrice"
                  value={stockPrice}
                  onChange={(e) => setStockPrice(e.target.value)}
                  required
                /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Calculate</button>
        </form>
        {dividendYield && (
          <div className='result'>
            <h3>Dividend Yield: {dividendYield}%</h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default DividendYieldCalculator;
