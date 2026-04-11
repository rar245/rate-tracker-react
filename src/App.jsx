import React, { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

export default function App() {
  const [options, setOptions] = useState({});
  const echartsRef = useRef(null);

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
          lineStyle: { width: bank === "Chase" ? 5 : 2.5 },
          emphasis: { focus: 'series' }
        }));

        setOptions({
          title: { 
            text: 'Rate Beat', 
            subtext: 'Click a bank below to toggle it on/off',
            left: 'center',
            textStyle: { fontSize: 24, fontWeight: 'bold' }
          },
          tooltip: { trigger: 'axis' },
          legend: { 
            bottom: 0, 
            type: 'scroll',
            selectedMode: 'multiple', // This makes it clear you can toggle
            padding: [20, 0, 0, 0]
          },
          grid: { top: '15%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
          xAxis: { type: 'category', data: dates, boundaryGap: false },
          yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
          series: series,
          color: ['#117aca', '#dc3545', '#d71e28', '#5a2d81', '#00833e', '#ff6000', '#0070d1', '#00355f', '#00b2ff', '#8338ec']
        });
      });
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '600px', margin: '10px auto' }}>
            Compare high-yield savings reality against big-bank averages.
          </p>
        </div>

        <ReactECharts 
          ref={echartsRef}
          option={options} 
          style={{ height: '600px', width: '100%' }} 
        />

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#999' }}>
          Updated daily. Sources include individual bank rate disclosures.
        </div>
      </div>
    </div>
  );
}
