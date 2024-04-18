    import React, { useState } from 'react';
    import "../styles/adlogstyles.css";
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import  AdminHome from "./AdminHome"; 

    function AdminLogin (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [correct, setCorrect] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status


    const presetUsername = 'admin';
    const presetPassword = 'password';

    const handleLogin = (e: any) => {
        e.preventDefault();

        if (username === presetUsername && password === presetPassword) {
        console.log('Login successful');
        setCorrect('Successful! Redirecting to Dashboard...');
        setError(""); 

        setTimeout(() => {
            setIsLoggedIn(true);
        }, 3000); 
        } 
        else {
        setError('Invalid username or password');
        setCorrect('');      
        }
    };
    if (isLoggedIn) {
        return <AdminHome />;
      }

    return (
        <div className="admin-login-container">
        <h2>Admin Login</h2>
        <p className='line6'></p>
        <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="username">Username</label>
            <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>

        {error && <div className="error-message">{error}</div>}
        {correct && <div className="correct-message">{correct}</div>}
        
        <button type='submit'>Login</button>
        </form>
        </div>
    );
    };

    export default AdminLogin;