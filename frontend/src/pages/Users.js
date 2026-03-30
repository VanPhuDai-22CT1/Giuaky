import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Lỗi khi tải users');
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Lỗi khi tải users: ' + (err.message || 'Không kết nối được backend hoặc database.'));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!name) {
      setError('Vui lòng nhập tên');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error('Lỗi khi thêm user');
      setName('');
      setSuccess('Thêm user thành công!');
      fetchUsers();
    } catch (err) {
      setError('Lỗi khi thêm user');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Lỗi khi xóa user');
      setSuccess('Xóa user thành công!');
      fetchUsers();
    } catch (err) {
      setError('Lỗi khi xóa user');
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',minHeight:'60vh',background:'#f7f7f7'}}>
      <div style={{background:'#fff',padding:32,borderRadius:12,boxShadow:'0 2px 12px #0001',minWidth:350,marginTop:40}}>
        <h2 style={{textAlign:'center',marginBottom:24}}>Danh sách Users</h2>
        {loading ? <p>Đang tải...</p> : (
          <ul style={{paddingLeft:0,listStyle:'none',marginBottom:24}}>
            {users.map(u => (
              <li key={u.id} style={{padding:'8px 0',borderBottom:'1px solid #eee',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span>{u.name}</span>
                <button onClick={() => handleDelete(u.id)} style={{marginLeft:12,padding:'4px 12px',borderRadius:4,border:'none',background:'#e53935',color:'#fff',cursor:'pointer'}}>Xóa</button>
              </li>
            ))}
            {users.length === 0 && <li>Chưa có user nào.</li>}
          </ul>
        )}
        <form onSubmit={handleSubmit} style={{display:'flex',gap:8,marginBottom:8}}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Tên mới" style={{flex:1,padding:8,borderRadius:4,border:'1px solid #ccc'}} />
          <button type="submit" style={{padding:'8px 16px',borderRadius:4,border:'none',background:'#1976d2',color:'#fff',fontWeight:'bold',cursor:'pointer'}}>Thêm User</button>
        </form>
        {error && <p style={{color:'red',margin:0}}>{error}</p>}
        {success && <p style={{color:'green',margin:0}}>{success}</p>}
      </div>
    </div>
  );
}

export default Users;
