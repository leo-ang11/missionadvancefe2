import logo from '../../image/mission3-login-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { getusers, processsignup } from '../../api/authApi';
import './signup-style.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countryNumber, setCountryNumber] = useState(false);
    const [number, setNumber] = useState('+62');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullPhoneNumber, setFullPhoneNumber] = useState('');

    const handleCountryNumber = (value) => {
        setNumber(value);
        setCountryNumber(false);
        setFullPhoneNumber('');
        setPhoneNumber('');
    };

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;
        setPhoneNumber(newPhoneNumber);
        setFullPhoneNumber(number + newPhoneNumber);
    };

    const homepageButton = () => {
        window.location.href = '/'
    }

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!email || !password || !name || !fullPhoneNumber) {
            alert('Semua field harus diisi!');
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert('Email tidak valid!');
            return;
        }

        if (!/^\d+$/.test(phoneNumber)) {
            alert('Nomor telepon harus berupa angka!');
            return;
        }

        if (password.length < 6) {
            alert('Password minimal 6 karakter');
            return;
        }

        if (password !== Confirmpassword) {
            alert('Password tidak sama!');
            return;
        }

        try {
            const allUsers = await getusers();
            const emailExists = allUsers.data.some((u) => u.email === email);

            if (emailExists) {
                alert('Email sudah terdaftar!');
                return;
            }

            await processsignup(email, password, name, fullPhoneNumber);
            alert('Signup berhasil!');
            navigate('/login');

        } catch (err) {
            console.error(err);
            alert('Signup gagal: ' + err.message);
        }
    };

    return (
        <div className="container">
            <header>
                <div className="logo" onClick={homepageButton}>
                    <img src={logo} alt="logo" />
                </div>
            </header>
            <div className="out-box-signup">
                <div className="box-signup">
                    <form onSubmit={handleSignup}>
                        <h1>Pendaftaran Akun</h1>
                        <p>Yuk, daftarkan akunmu sekarang juga!</p>

                        <div className="form-group">
                            <label htmlFor="username">Nama Lengkap <span className="required-icon">*</span></label>
                            <input type="text" id="username" required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-Mail <span className="required-icon">*</span></label>
                            <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="out-country-card-number">
                            <label htmlFor="phone-number">No. Hp <span className="text-red-500">*</span></label>
                            <div className="box-input-number">
                                <div className="box-countryid">
                                    <div className="countryid" onClick={() => setCountryNumber(!countryNumber)}>
                                        <p>{number}</p>
                                        <span id="icon-chevron">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 8.41693L10.5866 15.0037C10.9633 15.375 11.471 15.5831 12 15.5831C12.529 15.5831 13.0367 15.375 13.4134 15.0037L20 8.41693" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                    {countryNumber ? (
                                        <div className="option-list-number">
                                            <p onClick={() => handleCountryNumber('+62')}>+62</p>
                                            <p onClick={() => handleCountryNumber('+65')}>+65</p>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <input type="tel" name="phone-number" id="phone-number" required value={phoneNumber} onChange={handlePhoneNumberChange} />
                            </div>
                        </div>
                        <label htmlFor="password-create">Kata Sandi <span className="required-icon">*</span></label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} id="password-create" required onChange={(e) => setPassword(e.target.value)} />
                            <button type='button' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <span className="i-pw">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.89899 12.7346C2.80091 12.5052 2.75 12.2542 2.75 12C2.75 11.7458 2.80091 11.4948 2.89899 11.2654C3.70725 9.34502 4.99868 7.72989 6.61515 6.61781C8.23161 5.50574 10.1029 4.945 12 5.00426C13.8971 4.945 15.7684 5.50574 17.3849 6.61781C19.0013 7.72989 20.2928 9.34502 21.101 11.2654C21.1991 11.4948 21.25 11.7458 21.25 12C21.25 12.2542 21.1991 12.5052 21.101 12.7346C20.2928 14.655 19.0013 16.2701 17.3849 17.3822C15.7684 18.4943 13.8971 19.055 12 18.9957C10.1029 19.055 8.23161 18.4943 6.61515 17.3822C4.99868 16.2701 3.70725 14.655 2.89899 12.7346Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="i-pw">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.45 16.92C4.34837 15.8766 3.47942 14.6123 2.9 13.21C2.80095 12.9794 2.74988 12.731 2.74988 12.48C2.74988 12.229 2.80095 11.9806 2.9 11.75C3.66971 9.87608 4.96076 8.26226 6.62 7.09998C8.1945 5.99969 10.0797 5.43202 12 5.47998C13.3815 5.44566 14.7518 5.73684 16 6.32998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.56 8.04999C19.6553 9.09282 20.5204 10.3531 21.1 11.75C21.199 11.9806 21.2501 12.229 21.2501 12.48C21.2501 12.731 21.199 12.9794 21.1 13.21C20.3303 15.0839 19.0392 16.6977 17.38 17.86C15.8055 18.9603 13.9203 19.5279 12 19.48C10.6185 19.5143 9.24821 19.2231 8 18.63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.70997 13.65C8.5693 13.2761 8.49813 12.8796 8.49997 12.48C8.49997 11.5518 8.86872 10.6615 9.5251 10.0051C10.1815 9.34876 11.0717 8.98002 12 8.98002C12.3995 8.97817 12.796 9.04934 13.17 9.19002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.29 11.31C15.4307 11.684 15.5019 12.0805 15.5 12.48C15.5 13.4083 15.1313 14.2985 14.4749 14.9549C13.8185 15.6112 12.9283 15.98 12 15.98C11.6005 15.9818 11.204 15.9107 10.83 15.77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 20L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>
                        <label htmlFor="password-confirm">Konfirmasi Kata Sandi <span className="required-icon">*</span></label>
                        <div className="relative">
                            <input type={showConfirmPassword ? 'text' : 'password'} id="password-confirm" required onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                                {showConfirmPassword ? (
                                    <span className="i-pw-confirm">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.89899 12.7346C2.80091 12.5052 2.75 12.2542 2.75 12C2.75 11.7458 2.80091 11.4948 2.89899 11.2654C3.70725 9.34502 4.99868 7.72989 6.61515 6.61781C8.23161 5.50574 10.1029 4.945 12 5.00426C13.8971 4.945 15.7684 5.50574 17.3849 6.61781C19.0013 7.72989 20.2928 9.34502 21.101 11.2654C21.1991 11.4948 21.25 11.7458 21.25 12C21.25 12.2542 21.1991 12.5052 21.101 12.7346C20.2928 14.655 19.0013 16.2701 17.3849 17.3822C15.7684 18.4943 13.8971 19.055 12 18.9957C10.1029 19.055 8.23161 18.4943 6.61515 17.3822C4.99868 16.2701 3.70725 14.655 2.89899 12.7346Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="i-pw-confirm">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.45 16.92C4.34837 15.8766 3.47942 14.6123 2.9 13.21C2.80095 12.9794 2.74988 12.731 2.74988 12.48C2.74988 12.229 2.80095 11.9806 2.9 11.75C3.66971 9.87608 4.96076 8.26226 6.62 7.09998C8.1945 5.99969 10.0797 5.43202 12 5.47998C13.3815 5.44566 14.7518 5.73684 16 6.32998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.56 8.04999C19.6553 9.09282 20.5204 10.3531 21.1 11.75C21.199 11.9806 21.2501 12.229 21.2501 12.48C21.2501 12.731 21.199 12.9794 21.1 13.21C20.3303 15.0839 19.0392 16.6977 17.38 17.86C15.8055 18.9603 13.9203 19.5279 12 19.48C10.6185 19.5143 9.24821 19.2231 8 18.63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.70997 13.65C8.5693 13.2761 8.49813 12.8796 8.49997 12.48C8.49997 11.5518 8.86872 10.6615 9.5251 10.0051C10.1815 9.34876 11.0717 8.98002 12 8.98002C12.3995 8.97817 12.796 9.04934 13.17 9.19002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.29 11.31C15.4307 11.684 15.5019 12.0805 15.5 12.48C15.5 13.4083 15.1313 14.2985 14.4749 14.9549C13.8185 15.6112 12.9283 15.98 12 15.98C11.6005 15.9818 11.204 15.9107 10.83 15.77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 20L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>
                        <p id="error-pw-notif">Kata sandi tidak sesuai</p>
                        <div className="forgot-pw">
                            <a href="#">Lupa Password?</a>
                        </div>
                        <button type="submit" className="btn btn-primary" id="post-signup">Daftar</button>
                        <Link to="/login" className="btn btn-secondary">Masuk</Link>
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
    )
}

export default Signup; 