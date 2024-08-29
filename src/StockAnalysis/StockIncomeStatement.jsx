import React, { useState, useEffect } from 'react';
import '../CSS/StockInfo.css';
import bouncingSquaresSVG from '../bouncing-squares.svg';
import { FaFileDownload } from "react-icons/fa";


function parseJSONWithNaN(jsonString) {
    const fixedJSONString = jsonString.replace(/NaN/g, "null");
    return JSON.parse(fixedJSONString);
}

function numberWithCommas(x) {
    if (typeof x === 'number') {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return '--';
    }
}

function StockIncomeStatement({ symbol }) {
    const [incomeData, setIncomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/income_statement/${symbol}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch income statement data');
                }
                const text = await response.text();
                const data = parseJSONWithNaN(text);
                setIncomeData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchIncomeData();
    }, [symbol]);
    const convertToCSV = () => {
        if (!incomeData) return '';
    
        let csv = '';
    
         const dates = Object.keys(incomeData);
        const headings = Object.keys(incomeData[dates[0]]);
    
         csv += ',';
        dates.forEach((date) => {
            csv += `"${date}",`;
        });
        csv += '\n';
    
         headings.forEach((heading) => {
            csv += `"${heading}",`;
            dates.forEach((date) => {
                const value = incomeData[date][heading];
                csv += `"${typeof value === 'number' ? numberWithCommas(value) : value}",`;
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
        link.download = `${symbol}_income_statement.csv`;
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

    if (!incomeData) {
        return <div className="stock-card">No data available.</div>;
    }

    const dates = Object.keys(incomeData);
    const headings = Object.keys(incomeData[dates[0]]);

    return (
        <div className="stock-card stock-card-table">
            <h2>{symbol} Income Statement</h2>
            <button onClick={downloadCSV}>Download CSV <FaFileDownload /></button>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        {dates.map(date => (
                            <th key={date}>{date}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {headings.map(heading => (
                        <tr key={heading}>
                            <td>{heading}</td>
                            {dates.map(date => (
                                <td key={`${heading}-${date}`}>{numberWithCommas(incomeData[date][heading])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockIncomeStatement;
