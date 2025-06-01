import logo from '../../image/mission3-login-logo.png'
import userImage from '../../image/user-image.png'
import { Link } from 'react-router'
import './header-style.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Header = () => {

    const optionMobileRef = useRef(null);

    const openMenu = () => {
        optionMobileRef.current.classList.add('active');
    }

    const closeMenu = () => {
        optionMobileRef.current.classList.remove('active');
    }

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setUser(currentUser);
    }, [navigate]);

    const userimgref = useRef(null);
    
    const openUserImg = () => {
        userimgref.current.classList.toggle('active');
    }

    // click outside userimgref handler
    useEffect(() => {
        const handleClickOutsideUserMenu = (event) => {
            const boxMenuOpen = userimgref.current;

            if (!boxMenuOpen) return;

            const clickedInsideBox = boxMenuOpen.contains(event.target);

            if (boxMenuOpen.classList.contains("active") && !clickedInsideBox) {
                boxMenuOpen.classList.remove("active");
            }
        };

        document.addEventListener("mousedown", handleClickOutsideUserMenu);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideUserMenu);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <>
        <header>
            <div className="card-header">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                 {user && user.email ?
                 (
                    <div className="box-option">
                        <div className="option">
                            <span className="user-category">Kategori</span>
                            <div className="user-img" onClick={openUserImg}>
                                <img src={userImage} alt="user image" />
                            </div>
                        </div>
                        <div className="list-box-set-option" ref={userimgref}>
                            <div className="card-option">
                                <Link to="/profile">Profile</Link>
                                <button type='button' onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </div>
                 )
                : (
                <div className="option">
                    <Link to="/login">Masuk</Link>
                    <Link to="/signup">Daftar</Link>
                </div>
                ) 
                }
                <div className="option-mobile">
                    <span className="show-menu" onClick={openMenu}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 12H19.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                            <path d="M4.5 17.7692H19.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                            <path d="M4.5 6.23077H19.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                        </svg>
                    </span>
                    <div className="list-option-mobile" ref={optionMobileRef}>
                        <div className="card-top-opt-mobile">
                            <div className="logo-option">
                                <img src={logo} alt="logo" />
                            </div>
                            <span className="close-menu" onClick={closeMenu}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 19L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="list-content-option-mobile">
                            {user && user.email ? (
                                <>
                                <Link to="/profile">Profile</Link>
                                <Link to="/login" onClick={logout}>Logout</Link>
                                </>
                            ) : (
                                <>
                                <Link to="/login">Masuk</Link>
                                <Link to="/signup">Daftar</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header