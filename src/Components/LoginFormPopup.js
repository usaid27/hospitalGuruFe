import React, { useState } from 'react';
import { login, register, logout, forgotPassword, resetPassword } from '../Services/apiService';


function LoginFormPopup({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log('Logged in:', data); // Handle the received JWT token
            onClose();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await register(email, password);
            console.log('Registered:', data);
            setIsSignUp(false); // Switch to sign-in mode after registration
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        isOpen && (
            <div className="popup-overlay">
                <div className={`popup-container ${isSignUp ? 'sign-up-mode' : ''}`}>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleLogin}>
                            <h2>Sign In</h2>
                            <div className="form-group">
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button className="submit-btn" type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleRegister}>
                            <h2>Sign Up</h2>
                            <div className="form-group">
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button className="submit-btn" type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default LoginFormPopup;
