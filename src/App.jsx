import React from 'react';
import ReactECharts from 'echarts-for-react';
import ratesData from './rates.json';

const App = () => {
  const bankNames = Object.keys(ratesData[0]).filter(key => key !== 'date');

  const option = {
    // 1. Cleaner Color Palette
    color: [
      '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', 
      '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#2f4554',
      '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'
    ],
    title: {
      text: 'Historical APY Comparison',
      subtext: 'High-Yield Savings Performance',
      left: '20px',
      top: '15px',
      textStyle: { fontSize: 20, color: '#1a1a1b', fontWeight: '600' },
      subtextStyle: { fontSize: 12, color: '#666' }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      padding: [12, 15],
      borderRadius: 8,
      borderWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      textStyle: { color: '#333', fontSize: 13 },
      order: 'seriesDesc',
      // UX: Better formatting for the tooltip items
      valueFormatter: (value) => value != null ? `<strong>${value.toFixed(2)}%</strong>` : 'N/A'
    },
    legend: {
      type: 'plain',
      bottom: '15px',
      left: 'center',
      itemGap: 15,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle', // UX: Modern circular legend icons
      textStyle: { color: '#555', fontSize: 12, padding: [0, 0, 0, 5] }
    },
    grid: {
      top: '100px',
      left: '40px',
      right: '40px',
      bottom: '160px', // Space for Zoom Slider + Legend
      containLabel: true
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 85,
        end: 100,
        bottom: '85px',
        height: 30,
        borderColor: 'transparent',
        backgroundColor: '#eef2f3',
        fillerColor: 'rgba(115, 192, 222, 0.2)',
        handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        showDetail: false // UX: Cleaner look while sliding
      },
      { type: 'inside' }
    ],
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#ddd' } },
      axisTick: { show: false },
      axisLabel: { color: '#999', margin: 15 }
    },
    yAxis: {
      type: 'value',
      name: 'ANNUAL PERCENTAGE YIELD',
      nameTextStyle: { color: '#999', fontSize: 10, padding: [0, 0, 10, 0] },
      min: 'dataMin',
      axisLabel: { 
        formatter: '{value}%',
        color: '#999'
      },
      splitLine: { lineStyle: { color: '#f0f0f0', type: 'solid' } }
    },
    series: bankNames.map(bank => ({
      name: bank,
      type: 'line',
      step: 'end',
      connectNulls: true,
      symbol: 'none',
      smooth: false, // Step charts shouldn't be "smoothed"
      lineStyle: { width: 2.5 },
      emphasis: {
        focus: 'series', // UX: Vital for readability with 15+ lines
        lineStyle: { width: 4, shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' }
      },
      data: ratesData.map(item => [item.date, item[bank]])
    }))
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#f8fafc', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px' 
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '1200px',
        height: '90%', 
        backgroundColor: '#ffffff', 
        borderRadius: '20px', 
        padding: '20px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative'
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
