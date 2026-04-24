import React from 'react';
import ReactECharts from 'echarts-for-react';
// Ensure this filename matches your local file exactly
import ratesData from './rates_no_robinhood.json';

const App = () => {
  // Extract bank names from the first data entry (excluding 'date')
  const bankNames = Object.keys(ratesData[0]).filter(key => key !== 'date');

  const option = {
    title: {
      text: 'Historical Savings APY Trends (2009 - 2026)',
      subtext: 'Source: Verified Deposit Data',
      left: 'center',
      textStyle: { color: '#333', fontSize: 18 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: { color: '#000' },
      order: 'seriesDesc', 
      valueFormatter: (value) => (value != null ? value.toFixed(2) + '%' : 'N/A')
    },
    legend: {
      data: bankNames,
      type: 'scroll',
      bottom: 50,
      padding: [5, 10]
    },
    grid: {
      top: 80,
      left: '3%',
      right: '4%',
      bottom: 100,
      containLabel: true
    },
    dataZoom: [
      { type: 'slider', start: 85, end: 100 },
      { type: 'inside' }
    ],
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#999' } }
    },
    yAxis: {
      type: 'value',
      name: 'APY (%)',
      min: 'dataMin',
      axisLabel: { formatter: '{value}%' },
      splitLine: { lineStyle: { type: 'dashed', color: '#eee' } }
    },
    series: bankNames.map(bank => ({
      name: bank,
      type: 'line',
      step: 'end',
      connectNulls: true,
      symbol: 'none',
      lineStyle: { width: 2 },
      emphasis: { focus: 'series', lineStyle: { width: 4 } },
      data: ratesData.map(item => [item.date, item[bank]])
    }))
  };

  // Styles defined as a constant to avoid inline string issues
  const containerStyle = { 
    width: '100%', 
    height: '100vh', 
    padding: '20px', 
    backgroundColor: '#f9f9f9' 
  };
  
  const chartWrapperStyle = { 
    backgroundColor: '#fff', 
    padding: '20px', 
    borderRadius: '12px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    height: '90%'
  };

  return (
    <div style={containerStyle}>
      <div style={chartWrapperStyle}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <p style={{ textAlign: 'center', marginTop: '15px', color: '#666', fontSize: '12px' }}>
        Note: Chart reflects explicit rate change dates. Horizontal lines between points represent maintained rates.
      </p>
    </div>
  );
};

export default App;
