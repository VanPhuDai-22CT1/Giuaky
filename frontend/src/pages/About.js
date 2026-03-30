// src/pages/About.js
import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function About() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL.replace(/\/api$/, '')}/about`)
      .then(res => res.json())
      .then(data => {
        setInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không lấy được thông tin');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Đang tải...</div>;
  if (error) return <div style={{color:'red',textAlign:'center',marginTop:40}}>{error}</div>;

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',minHeight:'60vh',background:'#f7f7f7'}}>
      <div style={{background:'#fff',padding:32,borderRadius:12,boxShadow:'0 2px 12px #0001',minWidth:350,marginTop:40}}>
        <h2 style={{textAlign:'center',marginBottom:24}}>Thông tin sinh viên</h2>
        <ul style={{listStyle:'none',padding:0,fontSize:18}}>
          <li style={{marginBottom:12}}><b>Họ tên:</b> {info.name}</li>
          <li style={{marginBottom:12}}><b>MSSV:</b> {info.mssv}</li>
          <li style={{marginBottom:12}}><b>Lớp:</b> {info.class}</li>
          <li style={{marginBottom:12}}><b>App:</b> {info.appName}</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
