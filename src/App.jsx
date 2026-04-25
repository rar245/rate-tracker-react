import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const App = () => {
  const [ratesData, setRatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The "Source of Truth" URL from your other repository
  const DATA_URL = "https://raw.githubusercontent.com/rar245/rate-tracker/main/data/rates.json";

  useEffect(() => {
    fetch(DATA_URL)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch rates data');
        return response.json();
      })
      .then(data => {
        setRatesData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Syncing with Master Rate File...</div>;
  if (error) return <div style={{ padding: '40px', color: 'red' }}>Error: {error}</div>;

  // Extract bank names from the first data entry (excluding 'date')
  const bankNames = Object.keys(ratesData[0]).filter(key => key !== 'date');

  const option = {
    title: {
      text: 'Historical Savings APY Trends',
      subtext: 'Live Sync from rar245/rate-tracker',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      order: 'seriesDesc',
      valueFormatter: (value) => (value != null ? value.toFixed(2) + '%' : 'N/A')
    },
    legend: {
      data: bankNames,
      type: 'scroll',
      bottom: 50
    },
    dataZoom: [
      { type: 'slider', start: 85, end: 100 },
      { type: 'inside' }
    ],
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: 'APY (%)',
      min: 'dataMin',
      axisLabel: { formatter: '{value}%' }
    },
    series: bankNames.map(bank => ({
      name: bank,
      type: 'line',
      step: 'end',
      connectNulls: true,
      symbol: 'none',
      data: ratesData.map(item => [item.date, item[bank]])
    }))
  };

  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ height: '90%', backgroundColor: '#fff', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
        />
      </div>
    </div>
  );
};

export default App;
