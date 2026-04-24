import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const App = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);

  // The Full Master List of Bank Colors
  const bankColors = {
    "Marcus": "#003366",
    "Newtek": "#005596",
    "EverBank": "#0072CE",
    "Axos Bank": "#000000",
    "Bread Savings": "#F2AF00",
    "CIT Bank": "#2E8B57",
    "SoFi": "#00C2FF",
    "Ally": "#500078",
    "Discover": "#FF6600",
    "Capital One": "#D10032",
    "Amex": "#0070D1",
    "Wealthfront": "#8E44AD",
    "LendingClub": "#00A1E0",
    "BrioDirect": "#6CC24A",
    "Wells Fargo": "#DB1103"
  };

  useEffect(() => {
    const dataUrl = `https://raw.githubusercontent.com/rar245/rate-tracker/main/data/rates.json?t=${new Date().getTime()}`;

    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        // Banks to ignore (keep the chart focused on high yield)
        const denylist = ["Chase", "Bank of America", "BofA", "National Avg", "Wells Fargo"];
        
        const allKeys = new Set();
        data.forEach(entry => {
          Object.keys(entry).forEach(key => {
            // Only add if it's not the date, not null, and not on the denylist
            if (key !== 'date' && entry[key] !== null && !denylist.includes(key)) {
              allKeys.add(key);
            }
          });
        });

        const bankNames = Array.from(allKeys);
        const dates = data.map(entry => entry.date);

        const series = bankNames.map(name => ({
          name: name,
          type: 'line',
          connectNulls: true, 
          data: data.map(entry => entry[name]),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 3, color: bankColors[name] },
          itemStyle: { color: bankColors[name] }
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
            min: 'dataMin', // Automatically zooms to the best range
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
