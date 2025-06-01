import Header from "../header/header"
import './profile-style.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Profile = () => {

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const deleteAccount = () => {
        localStorage.removeItem('users');
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(!currentUser) {
            navigate('/login');
        }
        setUser(currentUser);
    }, [navigate]);

    return (
        <>
        <Header />
        <div className="box-profile">
            <h1 className="title-profile">Profile</h1>
            <div className="list-detail">
                {user && user.email ?
                    <>
                        <div className="card-detail">
                            <p>Username</p>
                            <span>{user.username}</span>
                        </div>
                        <div className="card-detail">
                            <p>E-Mail</p>
                            <span>{user.email}</span>
                        </div>
                        <div className="card-detail">
                            <p>Phone Number</p>
                            <span>{user.phone}</span>
                        </div>
                        <div className="card-btn-detail">
                            <button type="button" onClick={deleteAccount}>Delete Account</button>
                            <button type="button" id="btn-logout" onClick={logout}>Logout</button>
                        </div>
                    </>
                : ""} 
            </div>
        </div>
        </>
    )
}

export default Profile