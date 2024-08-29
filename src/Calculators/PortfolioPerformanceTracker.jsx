import React, { useState } from 'react';

const PortfolioPerformanceTracker = () => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [investmentDate, setInvestmentDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [annualReturn, setAnnualReturn] = useState(null);
  const [totalGainLoss, setTotalGainLoss] = useState(null);
  const [error, setError] = useState('');

  const calculateAnnualReturn = (e) => {
    e.preventDefault();

    if (!initialInvestment || !currentValue || !investmentDate || !currentDate) {
      setError('Please fill in all fields.');
      return;
    }

    const startDate = new Date(investmentDate);
    const endDate = new Date(currentDate);

    if (startDate >= endDate) {
      setError('Current date should be after investment date.');
      return;
    }

    const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);

    const annualReturnRate = ((currentValue - initialInvestment) / initialInvestment) / years;
    setAnnualReturn(annualReturnRate * 100);

    const totalGainLossAmount = currentValue - initialInvestment;
    setTotalGainLoss(totalGainLossAmount);
    
    setError('');
  };

  return (
    <main>
      <h1>Portfolio Performance Tracker</h1>
      <div className='portfolio-performance'>
        <form onSubmit={calculateAnnualReturn}>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="initialInvestment">Initial Investment:</label></td>
                <td><input
                  type="number"
                  id="initialInvestment"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
                  required
                /></td>
              </tr>
              <tr>
                <td><label htmlFor="currentValue">Current Value:</label></td>
                <td><input
                  type="number"
                  id="currentValue"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(parseFloat(e.target.value))}
                  required
                /></td>
              </tr>
              <tr>
                <td><label htmlFor="investmentDate">Investment Date:</label></td>
                <td><input
                  type="date"
                  id="investmentDate"
                  value={investmentDate}
                  onChange={(e) => setInvestmentDate(e.target.value)}
                  required
                /></td>
              </tr>
              <tr>
                <td><label htmlFor="currentDate">Current Date:</label></td>
                <td><input
                  type="date"
                  id="currentDate"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  required
                /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Calculate</button>
        </form>
        {error && <div className='error'>{error}</div>}
        {annualReturn !== null && (
          <div className='result'>
            <h3>Annual Return Rate: {annualReturn.toFixed(2)}%</h3>
            <h3>Total Gain/Loss: {totalGainLoss.toFixed(2)}</h3>
          </div>
        )}
      </div>
    </main>
  );
};

export default PortfolioPerformanceTracker;
