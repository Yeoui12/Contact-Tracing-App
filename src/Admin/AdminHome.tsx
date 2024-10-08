import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/adminstyles.css';

const AdminHome: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/adminlogin');
    }
    fetchUsers();
    fetchLogs();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4502/adminusers.php');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response2 = await fetch('http://localhost:4502/adminlist.php');
      const jsonData2 = await response2.json();
      setData2(jsonData2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    const results = data2.filter((item) => {
      const searchString = `${item.address.toLowerCase()} ${item.idNum} ${item.fullName.toLowerCase()} ${item.day} ${item.timeIN} ${item.timeOUT}`;
      return searchString.includes(searchQuery.toLowerCase());
    });
    setSearchResults(results);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/adminlogin');
  };

  return (
    <div className="admin-container">
      
      <div className='header-row'>
      <h2 className="centered-header">Contact Tracing Admin</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="search-section">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div className="admin-form-group">
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </div>
        </form>
      </div>

      <div className="search-results">
        {searchResults.length > 0 && (
          <div>
            <h1 className="centered-header">Search Results</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time in</th>
                  <th>Time out</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.idNum}</td>
                    <td>{item.fullName}</td>
                    <td>{item.day}</td>
                    <td>{item.timeIN}</td>
                    <td>{item.timeOUT}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="attendance-logs">
        <h1 className="centered-header">Attendance Logs</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time in</th>
              <th>Time out</th>
            </tr>
          </thead>
          <tbody>
            {data2.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.idNum}</td>
                <td>{item.fullName}</td>
                <td>{item.day}</td>
                <td>{item.timeIN}</td>
                <td>{item.timeOUT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="registered-users">
        <h1 className="centered-header">Registered Users</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.idNum}</td>
                <td>{item.fullName}</td>
                <td>{item.address}</td>
                <td>{item.contactNum}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;