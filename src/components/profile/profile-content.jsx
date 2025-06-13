import Header from "../header/header";
import './profile-style.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getusers, deleteUser, updateUser } from "../../api/authApi"; // pastikan `updateUser` sudah ada

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: ''});
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const deleteAccount = async (id) => {
        if (window.confirm('Hapus akun ini?')) {
            await deleteUser(id);
            localStorage.removeItem('currentUser');
            alert('Akun berhasil dihapus');
            navigate('/login');
        }
    };

    const handleEditClick = () => {
        setEditing(true);
        setEditForm({ name: user.name });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await updateUser(user.id, editForm);
            const updatedUser = { ...user, ...editForm };
            setUser(updatedUser);
            setEditing(false);
            alert('User berhasil diupdate');
        } catch (err) {
            console.error(err);
            alert('Gagal update user');
        }
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/login');
        } else {
            fetchUserProfile(currentUser.email);
        }
    }, [navigate]);

    const fetchUserProfile = async (email) => {
        try {
            const response = await getusers();
            const foundUser = response.data.find(u => u.email === email);
            if (foundUser) {
                setUser(foundUser);
            } else {
                alert("User tidak ditemukan");
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="box-profile">
                <h1 className="title-profile">Profile</h1>
                <div className="list-detail">
                    {user ? (
                        editing ? (
                            <>
                                <div className="card-detail">
                                    <p>Username</p>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="card-btn-detail">
                                    <button type="button" id="btn-cancel" onClick={() => setEditing(false)}>Batal</button>
                                    <button type="button" id="btn-update" onClick={handleUpdate}>Simpan</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="card-detail">
                                    <p>Username</p>
                                    <span>{user.name}</span>
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
                                    <button type="button" id="btn-delete" onClick={() => deleteAccount(user.id)}>Delete Account</button>
                                    <button type="button" id="btn-logout" onClick={logout}>Logout</button>
                                    <button type="button" id="btn-edit" onClick={handleEditClick}>Edit</button>
                                </div>
                            </>
                        )
                    ) : <p>Memuat data user...</p>}
                </div>
            </div>
        </>
    );
};

export default Profile;
