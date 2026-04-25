import React from 'react';
import ReactECharts from 'echarts-for-react';
// Corrected to your filename
import ratesData from '../rates.json';

const App = () => {
  // Logic to handle empty or malformed data safety
  if (!ratesData || ratesData.length === 0) {
    return <div>Loading chart data...</div>;
  }

  // Extract bank names from the first data entry (excluding 'date')
  const bankNames = Object.keys(ratesData[0]).filter(key => key !== 'date');

  const option = {
    title: {
      text: 'Historical Savings APY Trends',
      subtext: 'Data tracked from 2009 - 2026',
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

  const containerStyle = { 
    width: '100%', 
    height: '100vh', 
    padding: '20px', 
    boxSizing: 'border-box' 
  };

  return (
    <div style={containerStyle}>
      <div style={{ height: '90%', backgroundColor: '#fff', borderRadius: '8px', padding: '10px' }}>
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
