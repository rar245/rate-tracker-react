import React from 'react';
import ReactECharts from 'echarts-for-react';
import ratesData from './rates.json';

const App = () => {
  // Extract bank names from the first data entry (excluding 'date')
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
      order: 'seriesDesc', // Keeps the highest rates at the top of the list
      valueFormatter: (value) => (value != null ? value.toFixed(2) + '%' : 'N/A')
    },
    legend: {
      data: bankNames,
      type: 'scroll',
      bottom: 10
    },
    grid: {
      top: 60,
      left: '3%',
      right: '4%',
      bottom: 80,
      containLabel: true
    },
    dataZoom: [
      { type: 'slider', start: 90, end: 100 }, // Defaults to a zoomed-in recent view
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
      min: 'dataMin', // Focuses Y-axis only on the range where data exists
      axisLabel: { formatter: '{value}%' },
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: bankNames.map(bank => ({
      name: bank,
      type: 'line',
      // --- THE "SMOOTHNESS" SETTINGS ---
      step: 'end',        // Forces vertical/horizontal "staircase" transitions
      connectNulls: true, // Prevents the line from breaking between update dates
      symbol: 'none',     // Removes the "dots" for a cleaner, unified line look
      // ---------------------------------
      lineStyle: { width: 2 },
      emphasis: { 
        focus: 'series',  // Highlights the hovered bank and fades others
        lineStyle: { width: 3 } 
      },
      data: ratesData.map(item => [item.date, item[bank]])
    }))
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#f4f7f6', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ 
        height: '100%', 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        padding: '15px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
      }}>
        <ReactECharts
