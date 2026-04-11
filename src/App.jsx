import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Professional color palette for the 10 banks
const BANK_COLORS = {
  "Chase": "#117aca", 
  "BofA": "#dc3545", 
  "Wells Fargo": "#d71e28",
  "Ally": "#5a2d81", 
  "Marcus": "#00833e", 
  "Discover": "#ff6000",
  "Amex": "#0070d1", 
  "Capital One": "#00355f", 
  "SoFi": "#00b2ff",
  "Wealthfront": "#8338ec"
};

export default function App() {
  const [data, setData] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    // Pointing to your Vanilla Vercel site's data
    const DATA_URL = "https://rate-tracker-alpha.vercel.app/data/rates.json";
    
    fetch(DATA_URL)
      .then(res => res.json())
      .then(json => {
        setData(json);
        // This automatically pulls every bank name from your JSON file
        if (json.length > 0) {
          const keys = Object.keys(json[0]).filter(k => k !== 'date');
          setBanks(keys);
        }
      })
      .catch(err => console.error("Data fetch error:", err));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#1a1a1a', fontSize: '2.5rem' }}>The Loyalty Tax</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Comparing Big Bank "Loyalty" vs. High-Yield Reality</p>
        </div>
        
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right:
