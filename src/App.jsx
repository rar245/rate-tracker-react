import React from 'react';
import ReactECharts from 'echarts-for-react';
import ratesData from './rates.json';

const App = () => {
  const bankNames = Object.keys(ratesData[0]).filter(key => key !== 'date');

  const option = {
    title: {
      text: 'APY Performance Tracking (2009 - 2026)',
      left: 'center',
      textStyle: { fontWeight: 'normal', color: '#333' }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      order: 'seriesDesc',
      valueFormatter: (value) => (value != null ? value.toFixed(2) + '%' : 'N/A')
    },
    legend: {
      // Changed from 'scroll' to 'plain' to show all banks at once
      type: 'plain', 
      bottom: 0,      // Anchored to the very bottom
      left: 'center',
      orient: 'horizontal',
      padding: [0, 5, 10, 5],
      textStyle: { fontSize: 11 }
    },
    grid: {
      top: 60,
      left: '3%',
      right: '4%',
      // Increased bottom margin significantly to fit both the slider and the full list of banks
      bottom: 160, 
      containLabel: true
    },
    dataZoom: [
      { 
        type: 'slider', 
        start: 90, 
        end: 100,
        bottom: 80,   // Moved up to sit between the chart and the legend
        height: 25    // Slimmer bar to save space
      },
      { type: 'inside' }
    ],
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#888' } }
    },
    yAxis: {
      type: 'value',
      name: 'APY (%)',
      min: 'dataMin',
      axisLabel: { formatter: '{value}%' },
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: bankNames.map(bank => ({
      name: bank,
      type: 'line',
      step: 'end',
      connectNulls: true,
      symbol: 'none',
      lineStyle: { width: 2 },
      emphasis: { 
        focus: 'series',
        lineStyle: { width: 3 } 
      },
      data: ratesData.map(item => [item.date, item[bank]])
    }))
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#f4f7f6', padding: '10px', boxSizing: 'border-box' }}>
      <div style={{ 
        height: '100%', 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        padding: '10px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
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
