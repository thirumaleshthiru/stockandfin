import React, { useState } from 'react';
import '../CSS/Calculators.css';

function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [roi, setROI] = useState('');

  const calculateROI = (e) => {
    e.preventDefault();

    const initialInvestmentValue = parseFloat(initialInvestment);
    const finalValueValue = parseFloat(finalValue);
    const investmentPeriodValue = parseFloat(investmentPeriod);

    const roiValue = ((finalValueValue - initialInvestmentValue) / initialInvestmentValue) * (100 / investmentPeriodValue);

    setROI(roiValue.toFixed(2));
  };

  return (
    <main>
      <h1>Return on Investment Calculator</h1>
      <div className='roi-calculator'>
        <form onSubmit={calculateROI}>
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
                <td><label htmlFor="investmentPeriod">Investment Period (years):</label></td>
                <td><input
                  type="number"
                  id="investmentPeriod"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(e.target.value)}
                  required
                /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Calculate ROI</button>
        </form>
        {roi && (
          <div className='result'>
            <h3>Return on Investment (ROI): {roi}%</h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default ROICalculator;
