import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/StockAnalysis.css';
import bouncingSquaresLoader from '../bouncing-squares.svg';
import { FaSearch } from "react-icons/fa";


function StockAnalysis() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true); 

    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${query.trim()}&apikey=pvmluXwNeJ45NGFZqqeNEcMK7SvTZDLN`
      );
      const data = await response.json();

      if (data.length === 0) {
        setResults([]);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const setSymbolDetails = (symbol) => {
    navigate(`/stockinfo/${symbol}`);
  };

  return (
    <main>
      <section className="stockinput">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter Symbol or Company Name (e.g. GOOG or Alphabet)"
        />
        <button onClick={handleSearch}>Search <FaSearch  /></button>
      </section>

      {loading ? (
        <div className="loader">
          <img src={bouncingSquaresLoader} alt="Loading..." />
        </div>
      ) : (
        <>
          {error && (
            <p className="error">{error}</p>
          )}

          {searched && results.length === 0 && !error && (  
            <p className="error">No results found.</p>
          )}

          {results.length > 0 && (  
            <section className="resulttable">
              <table>
                <thead>
                  <tr> 
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Currency</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, index) => (
                    <tr key={index}>
                      <td>{item.symbol}</td>
                      <td>{item.name}</td>
                      <td>{item.exchangeShortName || 'N/A'}</td>
                      <td>{item.currency || 'N/A'}</td>
                      <td>
                        <button
                          onClick={() => {
                            setSymbolDetails(item.symbol);
                          }}
                          className="select"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default StockAnalysis;
