
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "../styles/adlogstyles.css";

function AdminLogin (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [correct, setCorrect] = useState('');

    const navigate = useNavigate();
    const presetUsername = 'admin';
    const presetPassword = 'password';

    const handleLogin = (e:any) => {
        e.preventDefault();

        if (username === presetUsername && password === presetPassword) {
            console.log('Login successful');
            setCorrect('Successful! Redirecting to Dashboard...');
            setError(""); 

            
            localStorage.setItem('isLoggedIn', 'true');
        } 
        else {
            setError('Invalid username or password');
            setCorrect('');      
        }
    };
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
      
        setTimeout(() => {
            navigate("/admin");
          }, 5000);
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
