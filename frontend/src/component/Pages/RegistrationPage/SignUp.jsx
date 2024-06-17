import React, { useRef } from 'react';
import { Button } from "devextreme-react/button";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {

    const signUpRef = useRef();
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        try {
            const email = signUpRef.current[0].value;
            const password = signUpRef.current[1].value;
            const confirmPassword = signUpRef.current[2].value;
            const response = await fetch("/api/auth/signup", {
                method: 'POST',
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    confirmPassword
                }),
            });
            const userDetail = await response.json();
            localStorage.setItem("user", JSON.stringify(userDetail));
            navigate("/Dashboard");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'grid', minHeight: '84vh', gridTemplateColumns: 'repeat(1, 1fr)' }}>
                <main
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        gridColumn: 'span 7 / span 7',
                    }}
                >
                    <div style={{ maxWidth: '36rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ marginTop: '0.75rem', fontSize: '3rem', fontWeight: 'bold', color: '#1f2937' }}>
                                Welcome to AI Form Builder
                            </h1>
                        </div>

                        <form ref={signUpRef}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    style={{
                                        marginTop: '0.25rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.375rem',
                                        border: '1px solid #d1d5db',
                                        backgroundColor: 'white',
                                        color: '#374151',
                                    }}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div style={{ marginTop: '1.25rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    style={{
                                        marginTop: '0.25rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.375rem',
                                        border: '1px solid #d1d5db',
                                        backgroundColor: 'white',
                                        color: '#374151',
                                    }}
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div style={{ marginTop: '1.25rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    style={{
                                        marginTop: '0.25rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.375rem',
                                        border: '1px solid #d1d5db',
                                        backgroundColor: 'white',
                                        color: '#374151',
                                    }}
                                    placeholder="Enter your confirm password"
                                />
                            </div>

                            <Button
                                text='Sign Up'
                                style={{
                                    marginTop: '1.5rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.375rem',
                                    border: 'none',
                                    backgroundColor: '#1f2937',
                                    color: 'white',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'background-color 150ms, color 150ms',
                                }}
                                onClick={handleRegister}
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                                <a style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none' }} href="#">
                                    Forgot your password?
                                </a>

                                <a style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none' }} onClick={() => { navigate('/Login') }}>
                                    Login Account
                                </a>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>

    )
}

export default SignUp
