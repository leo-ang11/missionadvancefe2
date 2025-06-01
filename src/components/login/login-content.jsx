import logo from '../../image/mission3-login-logo.png'
import { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import './login-style.css'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
        if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/');
        } else {
        alert('E-Mail Or Password Incorrect!');
        }
    };

        useEffect(() => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                navigate('/');
            } 
        }, [navigate]);

    return(
        <>
        <div className="container">
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </header>
            <div className="out-box-login">
                <div className="box-login">
                    <form onSubmit={handleLogin}>
                        <h1>Masuk ke Akun</h1>
                        <p>Yuk, lanjutin belajarmu di videobelajar.</p>
                        <div className="form-group">
                            <label htmlFor="email">E-Mail <span className="required-icon">*</span></label>
                            <input type="email" id="email" required onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Kata Sandi <span className="required-icon">*</span></label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} id="password" required onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <span className='i-pw'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M2.899 12.735a1.87 1.87 0 0 1 0-1.47c.808-1.92 2.1-3.535 3.716-4.647S10.103 4.945 12 5.004c1.897-.059 3.768.502 5.385 1.614s2.908 2.727 3.716 4.647a1.87 1.87 0 0 1 0 1.47c-.808 1.92-2.1 3.535-3.716 4.647S13.897 19.055 12 18.996c-1.897.059-3.768-.502-5.385-1.614S3.707 14.655 2.9 12.735"
                                                ></path>
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
                                                ></path>
                                            </svg>
                                        </span>
                                    ) : (
                                        <span className='i-pw'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M5.45 16.92a10.8 10.8 0 0 1-2.55-3.71 1.85 1.85 0 0 1 0-1.46A10.6 10.6 0 0 1 6.62 7.1 9 9 0 0 1 12 5.48a8.8 8.8 0 0 1 4 .85M18.56 8.05a10.85 10.85 0 0 1 2.54 3.7 1.85 1.85 0 0 1 0 1.46 10.6 10.6 0 0 1-3.72 4.65A9 9 0 0 1 12 19.48a8.8 8.8 0 0 1-4-.85"
                                                ></path>
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M8.71 13.65a3.3 3.3 0 0 1-.21-1.17 3.5 3.5 0 0 1 3.5-3.5c.4-.002.796.07 1.17.21M15.29 11.31c.14.374.212.77.21 1.17a3.5 3.5 0 0 1-3.5 3.5 3.3 3.3 0 0 1-1.17-.21M3 20 19 4"
                                                ></path>
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="forgot-pw">
                            <Link to="../forgot-password">Lupa Password?</Link>
                        </div>

                        <button type="submit" className="btn btn-primary">Masuk</button>
                        <Link to="/signup" className="btn btn-secondary">Daftar</Link>

                        <div className="divider">
                            <hr />
                            <p>atau</p>
                        </div>

                        <button type="button" className="btn btn-google">
                            <span id="icon-google">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.55 19.55C18.0663 19.9611 17.5477 20.3291 17 20.65C14.7044 21.9769 11.9759 22.3377 9.41428 21.6533C6.85269 20.9688 4.6678 19.295 3.34 17C3.23018 16.8188 3.13004 16.6318 3.04 16.44L6.24 13.94C6.65125 15.1428 7.42682 16.1877 8.45903 16.9296C9.49124 17.6715 10.7288 18.0736 12 18.08C13.0547 18.0751 14.0895 17.7923 15 17.26C15.0991 17.2095 15.1929 17.1492 15.28 17.08L18.55 19.55Z" fill="#2BA24C" />
                                    <path d="M5.91 12C5.9123 12.6572 6.02382 13.3094 6.24 13.93L3 16.43C2.33133 15.0495 1.98917 13.5338 2 12C1.99548 10.4277 2.36934 8.87739 3.09 7.47998L6.26 9.99998C6.02665 10.6409 5.90816 11.3179 5.91 12Z" fill="#F0B501" />
                                    <path d="M18.59 5.40998L16.74 7.25998C16.619 7.36821 16.4623 7.42805 16.3 7.42805C16.1377 7.42805 15.981 7.36821 15.86 7.25998C15.1742 6.70071 14.3743 6.29841 13.5164 6.08136C12.6585 5.8643 11.7635 5.83776 10.8943 6.0036C10.0251 6.16944 9.20271 6.52364 8.48501 7.0413C7.76731 7.55895 7.17168 8.22751 6.74 8.99998C6.55409 9.32025 6.3936 9.65461 6.26 9.99998L3.09 7.47998C3.17 7.31998 3.25 7.15998 3.34 7.00998C4.07676 5.73504 5.086 4.63854 6.29562 3.79881C7.50524 2.95909 8.88537 2.39687 10.3374 2.15231C11.7895 1.90775 13.2777 1.98689 14.6956 2.38408C16.1135 2.78127 17.4263 3.4867 18.54 4.44998C18.6087 4.5082 18.6648 4.57986 18.7047 4.66055C18.7447 4.74124 18.7677 4.82925 18.7724 4.91918C18.7771 5.00911 18.7633 5.09904 18.732 5.18345C18.7006 5.26785 18.6523 5.34495 18.59 5.40998Z" fill="#E43E2B" />
                                    <path d="M22 12.08C22.0083 13.502 21.7035 14.9084 21.1073 16.1993C20.511 17.4903 19.6379 18.6343 18.55 19.55L15.31 17.08C16.3885 16.3857 17.2184 15.3667 17.68 14.17H13.09C13.0043 14.1713 12.9191 14.1554 12.8397 14.1232C12.7602 14.0911 12.688 14.0432 12.6274 13.9826C12.5667 13.922 12.5189 13.8498 12.4867 13.7703C12.4545 13.6908 12.4386 13.6057 12.44 13.52V10.91C12.4386 10.8247 12.4545 10.74 12.4868 10.6611C12.5191 10.5821 12.5671 10.5106 12.6279 10.4507C12.6887 10.3909 12.761 10.344 12.8404 10.3129C12.9198 10.2819 13.0047 10.2673 13.09 10.27H21.24C21.393 10.2693 21.5414 10.3218 21.66 10.4185C21.7786 10.5151 21.8599 10.65 21.89 10.8C21.9653 11.2224 22.0021 11.6509 22 12.08Z" fill="#3B7DED" />
                                </svg>
                            </span>
                            Masuk dengan Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login