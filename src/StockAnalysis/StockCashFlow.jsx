import React, { useState, useEffect } from 'react';
import '../CSS/StockInfo.css';
import bouncingSquaresSVG from '../bouncing-squares.svg';

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

function StockCashFlow({ symbol }) {
    const [cashFlowData, setCashFlowData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCashFlowData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/cashflow/${symbol}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cash flow data');
                }
                const text = await response.text();
                const data = parseJSONWithNaN(text);
                console.log(data); // Log the cashFlowData to check if it's null or undefined
                setCashFlowData(data.cashflow);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCashFlowData();
    }, [symbol]);

    const convertToCSV = () => {
        if (!cashFlowData || Object.keys(cashFlowData).length === 0) return '';

        let csv = '';

        const dates = Object.keys(cashFlowData);
        const headings = Object.keys(cashFlowData[dates[0]]);

       
        csv += ',';
        dates.forEach((date) => {
            csv += `"${date}",`;
        });
        csv += '\n';

         headings.forEach((heading) => {
            csv += `"${heading}",`;
            dates.forEach((date) => {
                const value = cashFlowData[date] ? cashFlowData[date][heading] : undefined;
                csv += `"${typeof value === 'number' ? numberWithCommas(value) : value || '--'}",`;
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
        link.download = `${symbol}_cash_flow.csv`;
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

    if (!cashFlowData || Object.keys(cashFlowData).length === 0) {
        return <div className="stock-card">No data available.</div>;
    }

    const dates = Object.keys(cashFlowData);
    const headings = Object.keys(cashFlowData[dates[0]]);

    return (
        <div className="stock-card stock-card-table">
            <h2>{symbol} Cash Flow</h2>
            <button onClick={downloadCSV}>Download CSV</button>

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
                                <td key={`${heading}-${date}`}>{cashFlowData[date] ? numberWithCommas(cashFlowData[date][heading]) : '--'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockCashFlow;
