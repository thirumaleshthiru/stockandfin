import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import bouncingSquaresSVG from '../bouncing-squares.svg';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function OneYearStock({ symbol }) {
  const [historicalData, setHistoricalData] = useState(null);
  const [error, setError] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/stock_history_one_year/${symbol}`);
        if (!response.ok) {
          throw new Error('Failed to fetch historical data');
        }
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHistoricalData();
  }, [symbol]);

  useEffect(() => {
    if (historicalData) {
      renderChart();
    }
  }, [historicalData]);

  const renderChart = () => {
    const ctx = document.getElementById('one-year-chart').getContext('2d');

    if (chart) {
      chart.destroy();
    }

    const labels = historicalData.map(data => formatDate(data.Date));
    const openingPrices = historicalData.map(data => data.Open);
    const closingPrices = historicalData.map(data => data.Close);
    const highPrices = historicalData.map(data => data.High);
    const lowPrices = historicalData.map(data => data.Low);
    const volumes = historicalData.map(data => data.Volume);
    const changes = historicalData.map(data => data.Change);  

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Opening Price',
            data: openingPrices,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
            yAxisID: 'price',
          },
          {
            label: 'Closing Price',
            data: closingPrices,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
            yAxisID: 'price',
          },
          
          {
            label: 'Volume',
            data: volumes,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false,
            yAxisID: 'volume',
          },
          {
            label: 'Change',
            data: changes,
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            fill: false,
            yAxisID: 'change',
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `One Year Historical Data for ${symbol}`,
            font: {
              size: 16
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'x'
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          price: {
            display: false,  
          },
          volume: {
            display: false,  
          },
          change: {
            display: false,  
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2
      }
    });

    setChart(newChart);
  };

  if (error) {
    return <div className="stock-card">Error: {error}</div>;
  }

  if (!historicalData || !Array.isArray(historicalData)) {
    return (
      <div className="loader">
        <img src={bouncingSquaresSVG} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="stock-card stock-card-chart">
      <canvas id="one-year-chart" style={{ width: '100%', height: '400px' }}></canvas>
    </div>
  );
}

export default OneYearStock;
