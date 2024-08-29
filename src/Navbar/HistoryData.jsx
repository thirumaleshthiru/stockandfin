import { useState } from 'react';

function HistoryData() {
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleDownload = async () => {
   

    const apiUrl = `http://127.0.0.1:5000/download_stock_data?symbol=${symbol}&start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        window.open(apiUrl, '_blank');
        setError('');
      }
    } catch (error) {
      setError('An error occurred while fetching data');
    }
    if (!symbol || !startDate || !endDate) {
        setError('Please provide symbol, start date, and end date');
        return;
      }
  };

  return (
    <>
      <main>
        <div className='stock-download'>
          <h1>History Data</h1>
          <table>
            <tbody>
              <tr>
                <td><label>Symbol:</label></td>
                <td><input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} /></td>
              </tr>

              <tr>
                <td><label>Start Date:</label></td>
                <td><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></td>
              </tr>

              <tr>
                <td><label>End Date:</label></td>
                <td><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
          {error && <div className="error">{error}</div>}
          <button onClick={handleDownload} className='history-data'>Download</button>
        </div>
      </main>
    </>
  );
}

export default HistoryData;
