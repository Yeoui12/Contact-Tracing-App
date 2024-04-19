import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHome: React.FC = () => {

const [data, setData] = useState<any[]>([]);
const [data2, setData2] = useState<any[]>([]);

const [idNum, setidNum] = useState('');
const [name, setName] = useState('');
const [province, setProvince] = useState('');
const [cityOrTown, setCityOrTown] = useState('');
const [day, setDay] = useState('');
const [time, setTime] = useState('');

const [searchQuery, setSearchQuery] = useState('');



const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
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


  return (
    <>
      <h2>Contact Tracing Admin</h2>
      <div>
        <h3>Search</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div>
            <label>Search:</label>
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>

      <div>
        {searchResults.length >0 && (
          <div>
            <h1>Search Results</h1>
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
                {searchResults.map((item: any) => (
                  <tr>
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

      <div>
        <h1>All Logs</h1>
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
            {data2.map((item: any) => (
              <tr>
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

      <div>
        <h1>All Users</h1>
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
            {data.map((item: any) => (
              <tr>
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
    </>
  );
};

export default AdminHome;
