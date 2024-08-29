import React, { useState } from 'react';
import '../CSS/Calculators.css' 

function StockReturn ()  {
   const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [years, setYears] = useState('');
  const [annualDividends, setAnnualDividends] = useState('');
  const [stockReturn, setStockReturn] = useState('');

   const calculateStockReturn = (e) => {
    e.preventDefault();

     const initialInvestmentValue = parseFloat(initialInvestment);
    const finalValueValue = parseFloat(finalValue);
    const yearsValue = parseFloat(years);
    const annualDividendsValue = parseFloat(annualDividends);

     const totalReturn = finalValueValue - initialInvestmentValue + (annualDividendsValue * yearsValue);
    const stockReturnPercentage = ((totalReturn / initialInvestmentValue) * 100).toFixed(2);

     setStockReturn(stockReturnPercentage);
  };

  return (
    <main>
    <div className='stockreturn'>
      <h2>Stock Return Calculator</h2>
      <form onSubmit={calculateStockReturn}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="initialInvestment">Initial Investment:</label></td>
              <td><input
                type="number"
                id="initialInvestment"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="finalValue">Final Value:</label></td>
              <td><input
                type="number"
                id="finalValue"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="years">Years:</label></td>
              <td><input
                type="number"
                id="years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                required
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="annualDividends">Annual Dividends:</label></td>
              <td><input
                type="number"
                id="annualDividends"
                value={annualDividends}
                onChange={(e) => setAnnualDividends(e.target.value)}
                required
              /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Calculate</button>
      </form>
      {stockReturn && (
        <div className='result'>
          <h3>Stock Return: {stockReturn}%</h3>
        </div>
      )}
    </div>
    </main>
  );
};

export default StockReturn;
