"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user', { email, password });
            if (response.data.user) {
                localStorage.setItem('authenticatedUser', JSON.stringify(response.data.user));
                router.push('/dashboard');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mb-5 pb-5 mt-5">
                <div className="my-5 pb-5">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="mt-2">Login</h2>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-form-label text-md-end col-md-12">Email Address</label>
                                    <div className="col-12">
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={email}
                                            onChange={handleInputChange}
                                            required
                                            autoComplete="email"
                                            autoFocus
                                        />
                                        {errors.email && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{errors.email}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-form-label text-md-end col-md-12">Password</label>
                                    <div className="col-12">
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={password}
                                            onChange={handleInputChange}
                                            required
                                            autoComplete="current-password"
                                        />
                                        {errors.password && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{errors.password}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="row mb-0">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-dark btn-block">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
