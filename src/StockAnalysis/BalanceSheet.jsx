import React, { useState, useEffect } from 'react';
import '../CSS/StockInfo.css';
import bouncingSquaresSVG from '../bouncing-squares.svg';

function numberWithCommas(x) {
  if (typeof x === 'number') {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return '--';
  }
}

function parseJSONWithNaN(jsonString) {
  const fixedJSONString = jsonString.replace(/NaN/g, "null");
  return JSON.parse(fixedJSONString);
}

function BalanceSheet({ symbol }) {
  const [balanceSheetData, setBalanceSheetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalanceSheetData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/balance_sheet/${symbol}`);
        if (!response.ok) {
          throw new Error('Failed to fetch balance sheet data');
        }
        const text = await response.text();
        const data = parseJSONWithNaN(text);
        setBalanceSheetData(data.balance_sheet);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBalanceSheetData();
  }, [symbol]);

  const convertToCSV = () => {
    if (!balanceSheetData) return '';

    let csv = '';

     const dates = Object.keys(balanceSheetData);
    const headings = Object.keys(balanceSheetData[dates[0]]);

     const transposedData = {};
    headings.forEach((heading) => {
      transposedData[heading] = {};
      dates.forEach((date) => {
        transposedData[heading][date] = balanceSheetData[date][heading];
      });
    });

     csv += 'Date,' + headings.join(',') + '\n';

     dates.forEach((date) => {
      csv += date + ',';
      headings.forEach((heading) => {
        const value = transposedData[heading][date];
        csv += typeof value === 'number' ? `"${numberWithCommas(value)}",` : `${value},`;
      });
      csv += '\n';
    });

    return csv;
  };

  const downloadCSV = () => {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${symbol}_balance_sheet.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="loader">
        <img src={bouncingSquaresSVG} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div className="stock-card">No data available.</div>;
  }

  if (!balanceSheetData || Object.keys(balanceSheetData).length === 0) {
    return <div className="stock-card">No data available.</div>;
  }

   const dates = Object.keys(balanceSheetData);
  const headings = Object.keys(balanceSheetData[dates[0]]);

  return (
    <div className="stock-card stock-card-table">
      <h2>{symbol} Balance Sheet</h2>
      <button onClick={downloadCSV}>Download CSV</button>
      <table>
        <thead>
          <tr>
            <th></th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {headings.map((heading) => (
            <tr key={heading}>
              <td>{heading}</td>
              {dates.map((date) => (
                <td key={`${heading}-${date}`} style={{ padding: '10px' }}>
                  {numberWithCommas(balanceSheetData[date][heading])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default BalanceSheet;
