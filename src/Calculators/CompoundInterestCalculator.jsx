import React, { useState } from 'react';
import '../CSS/Calculators.css';

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [compoundingPeriodsPerYear, setCompoundingPeriodsPerYear] = useState('');
  const [years, setYears] = useState('');
  const [futureValue, setFutureValue] = useState('');
  const [interestBreakdown, setInterestBreakdown] = useState([]);

  const calculateFutureValue = (e) => {
    e.preventDefault();

   
    if (!principal || !interestRate || !compoundingPeriodsPerYear || !years) {
      alert('Please fill in all fields.');
      return;
    }

    const principalValue = parseFloat(principal);
    const interestRateValue = parseFloat(interestRate) / 100;
    const compoundingPeriodsPerYearValue = parseFloat(compoundingPeriodsPerYear);
    const yearsValue = parseFloat(years);

     const periods = compoundingPeriodsPerYearValue * yearsValue;
    const ratePerPeriod = interestRateValue / compoundingPeriodsPerYearValue;
    const futureValue = principalValue * Math.pow(1 + ratePerPeriod, periods);
    setFutureValue(futureValue.toFixed(2));

     const interestBreakdown = [];
    let totalInterest = 0;
    for (let i = 1; i <= periods; i++) {
      const interest = principalValue * Math.pow(1 + ratePerPeriod, i) - principalValue;
      totalInterest += interest;
      interestBreakdown.push({ period: i, interest: interest.toFixed(2) });
    }
    setInterestBreakdown(interestBreakdown);
  };

  return (
    <main>
      <h1>Compound Interest Calculator</h1>
      <div className='compound-interest-calculator'>
        <form onSubmit={calculateFutureValue}>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="principal">Principal:</label></td>
                <td><input
                  type="number"
                  id="principal"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  required
                /></td>
              </tr>
              <tr>
                <td><label htmlFor="interestRate">Interest Rate (%):</label></td>
                <td><input
                  type="number"
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  required
                /></td>
              </tr>
              <tr>
                <td><label htmlFor="compoundingPeriodsPerYear">Compounding Periods per Year:</label></td>
                <td><input
                  type="number"
                  id="compoundingPeriodsPerYear"
                  value={compoundingPeriodsPerYear}
                  onChange={(e) => setCompoundingPeriodsPerYear(e.target.value)}
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
        {futureValue && (
          <div className='result'>
            <h3>Future Value: ${futureValue}</h3>
            <h4>Interest Breakdown:</h4>
            <ul>
              {interestBreakdown.map((item) => (
                <li key={item.period}>Period {item.period}: ${item.interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default CompoundInterestCalculator;
