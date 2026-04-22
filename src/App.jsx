import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const App = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);

  // Expanded color map to cover all potential banks
  const bankColors = {
    "Marcus": "#003366", "Discover": "#FF6600", "Capital One": "#D10032",
    "Amex": "#0070D1", "Ally": "#500078", "SoFi": "#00C2FF",
    "Wealthfront": "#8E44AD", "Axos Bank": "#000000", "CIT Bank": "#2E8B57",
    "EverBank": "#C0C0C0", "Newtek": "#005596", "LendingClub": "#00A1E0",
    "BrioDirect": "#6CC24A", "Bread Savings": "#F2AF00", "National Avg": "#666666"
  };

  useEffect(() => {
    const dataUrl = `https://raw.githubusercontent.com/rar245/rate-tracker/main/data/rates.json?t=${new Date().getTime()}`;

    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        // 1. DYNAMIC KEY DETECTION
        // This looks at every entry to make sure no bank is left behind
        const allKeys = new Set();
        data.forEach(entry => {
          Object.keys(entry).forEach(key => {
            if (key !== 'date' && entry[key] !== null) allKeys.add(key);
          });
        });

        const bankNames = Array.from(allKeys);
        const dates = data.map(entry => entry.date);

        // 2. SERIES BUILDING
        const series = bankNames.map(name => ({
          name: name,
          type: 'line',
          // connectNulls: true ensures the line doesn't break if one day is missing
          connectNulls: true, 
          data: data.map(entry => entry[name]),
          smooth: true,
          showSymbol: false,
          lineStyle: { 
            width: name === 'National Avg' ? 2 : 3,
            type: name === 'National Avg' ? 'dashed' : 'solid',
            color: bankColors[name] || '#999' 
          },
          itemStyle: { color: bankColors[name] || '#999' }
        }));

        setChartOptions({
          title: { text: 'High Yield Savings Rate Tracker', left: 'center' },
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let res = `<b>${params[0].name}</b><br/>`;
              params.sort((a, b) => b.value - a.value).forEach(p => {
                if (p.value !== undefined && p.value !== null) {
                  res += `${p.marker} ${p.seriesName}: <b>${p.value}%</b><br/>`;
                }
              });
              return res;
            }
          },
          legend: {
            data: bankNames,
            bottom: 10,
            type: 'scroll'
          },
          grid: { top: '15%', left: '5%', right: '5%', bottom: '20%', containLabel: true },
          xAxis: { type: 'category', data: dates, boundaryGap: false },
          yAxis: { 
            type: 'value', 
            // 'dataMin' makes the chart zoom into the current rate range
            min: 'dataMin',
            axisLabel: { formatter: '{value}%' } 
          },
          series: series
        });
        setLoading(false);
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Syncing Live Bank Data...</div>;

  return (
    <div style={{ width: '100%', height: '95vh' }}>
      <ReactECharts option={chartOptions} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default App;
