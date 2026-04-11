import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // We fetch the data from your OTHER repo automatically!
    const DATA_URL = "https://cdn.jsdelivr.net/gh/rar245/rate-tracker@main/data/rates.json";
    fetch(DATA_URL)
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Loyalty Tax Tracker (React)</h1>
      <div style={{ width: '100%', height: 400, background: 'white', padding: '20px', borderRadius: '10px' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit="%" domain={[0, 6]} />
            <Tooltip />
            <Legend />
            {/* The Top 3 Hero Banks */}
            <Line type="monotone" dataKey="Marcus" stroke="#00833e" strokeWidth={3} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="Wealthfront" stroke="#8338ec" strokeWidth={3} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="Chase" stroke="#117aca" strokeWidth={5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
