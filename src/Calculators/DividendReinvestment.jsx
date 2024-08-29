import React, { useState } from 'react';
import '../CSS/Calculators.css';

function DividendReinvestment() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [dividendFrequency, setDividendFrequency] = useState('');
  const [years, setYears] = useState('');
  const [totalValue, setTotalValue] = useState('');

  const calculateTotalValue = (e) => {
    e.preventDefault();

     const initialInvestmentValue = parseFloat(initialInvestment);
    const dividendYieldValue = parseFloat(dividendYield) / 100;  
    const dividendFrequencyValue = parseFloat(dividendFrequency);
    const yearsValue = parseFloat(years);

     const totalValue = initialInvestmentValue * Math.pow((1 + dividendYieldValue / dividendFrequencyValue), yearsValue * dividendFrequencyValue);

     setTotalValue(totalValue.toFixed(2));
  };

  return (
    <main>
         <h1>Dividend Reinvestment Calculator</h1>
      <div className='dividend-reinvestment'>
       
        <form onSubmit={calculateTotalValue}>
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
                <td><label htmlFor="dividendYield">Dividend Yield (%):</label></td>
                <td><input
                  type="number"
                  id="dividendYield"
                  value={dividendYield}
                  onChange={(e) => setDividendYield(e.target.value)}
                  required
                /></td>
              </tr>
              <tr>
                <td><label htmlFor="dividendFrequency">Dividend Frequency (per year):</label></td>
                <td><input
                  type="number"
                  id="dividendFrequency"
                  value={dividendFrequency}
                  onChange={(e) => setDividendFrequency(e.target.value)}
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
            </tbody>
          </table>
          <button type="submit">Calculate</button>
        </form>
        {totalValue && (
          <div className='result'>
            <h3>Total Value: ${totalValue}</h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default DividendReinvestment;
