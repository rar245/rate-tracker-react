import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function App() {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const DATA_URL = "https://rate-tracker-lovat.vercel.app/data/rates.json";
    
    fetch(DATA_URL)
      .then(res => res.json())
      .then(data => {
        const dates = data.map(d => d.date);
        const banks = Object.keys(data[0]).filter(k => k !== 'date');

        const series = banks.map(bank => ({
          name: bank,
          type: 'line',
          data: data.map(d => d[bank]),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: bank === "Chase" ? 5 : 2 },
          emphasis: { focus: 'series' } // Fades out other lines when hovering over one
        }));

        setOptions({
          title: { text: 'The Loyalty Tax', left: 'center' },
          tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          legend: { bottom: 0, type: 'scroll' },
          grid: { top: '15%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
          xAxis: { type: 'category', data: dates, boundaryGap: false },
          yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
          series: series,
          color: ['#117aca', '#dc3545', '#d71e28', '#5a2d81', '#00833e', '#ff6000', '#0070d1', '#00355f', '#00b2ff', '#8338ec']
        });
      });
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <ReactECharts option={options} style={{ height: '600px', width: '100%' }} />
      </div>
    </div>
  );
}
