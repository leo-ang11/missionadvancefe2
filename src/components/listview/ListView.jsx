import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataList } from "../../store/redux/reducer";
import { getusers } from "../../api/authApi";
import { deleteUser } from "../../api/authApi";
import { deleteItem } from "../../store/redux/reducer";
import { processsignup } from "../../api/authApi";
import { addItem } from "../../store/redux/reducer";
import { updateUser } from "../../api/authApi";
import { updateItem } from "../../store/redux/reducer";
import { useState } from "react";
import './list-view.css';

const ListView = () => {
    const dispatch = useDispatch();
    const dataList = useSelector((state) => state.data.dataList);

    const [showAddForm, setShowAddForm] = useState(false);

    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", phone: "" });


    const [addForm, setAddForm] = useState({
        name: '',
        password: '',
        email: '',
        phone: '',
    });


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getusers();
            dispatch(setDataList(response.data)); 
        } catch (error) {
            console.error("Gagal fetch data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            try {
                await deleteUser(id);
                dispatch(deleteItem(id));
                alert("Data berhasil dihapus");
            } catch (err) {
                console.error(err);
                alert("Gagal menghapus data");
            }
        }
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddForm((prev) => ({ ...prev, [name]: value }));
    };


    const handleAdd = async () => {

        const { name, email, password, phone } = addForm;

        if (!name || !email || !password || !phone) {
            alert("Semua kolom wajib diisi");
            return;
        }

        try {
            const response = await processsignup(
                addForm.email,
                addForm.password,
                addForm.name,
                addForm.phone
            );
            dispatch(addItem(response.data));
            setShowAddForm(false);
            alert("Data berhasil ditambahkan");
            setAddForm({ name: '', password: '', email: '', phone: '' });
        } catch (err) {
            console.error(err);
            alert("Gagal tambah data");
        }
    };


    const handleEditClick = (item) => {
        setEditId(item.id);
        setEditForm({ name: item.name, phone: item.phone });

    };

    const handleEdit = async (id, updatedFields) => {
        try {
            const response = await updateUser(id, updatedFields);
            dispatch(updateItem(response.data));
            setEditId(null);
            alert("Data berhasil diupdate");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="card-top-tagline">
                <h2 className="tagline">Daftar User</h2>
                <button type="button" className="btn" onClick={() => setShowAddForm(true)}>Add New User</button>
            </div>
            <div className="box-table-data">
                <table className="table-data">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Tindakan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td className="card-btn-option">
                                    <button onClick={() => handleEditClick(item)}>Edit</button>
                                    <button onClick={() => handleDelete(item.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editId && (
                <div className="out-box-form">
                    <div className="box-form-card" id="edit-form">
                        <h3 className="form-title-tagline" >Edit Data</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nama"
                            value={editForm.name}
                            onChange={handleInputChange}
                        />
                        <input
                            name="phone"
                            placeholder="Phone"
                            value={editForm.phone}
                            onChange={handleInputChange}
                        />
                        <div className="card-btn-form">
                            <button className="btn" onClick={() => handleEdit(editId, editForm)}>Simpan</button>
                            <button className="btn" onClick={() => setEditId(null)}>Batal</button>
                        </div>
                    </div>
                </div>
            )}

            {showAddForm && (
                <div className="out-box-form">
                    <div className="box-form-card" id="add-form">
                        <h3 className="form-title-tagline">Tambah Data</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nama"
                            value={addForm.name}
                            onChange={handleAddChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={addForm.email}
                            onChange={handleAddChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={addForm.password}
                            onChange={handleAddChange}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={addForm.phone}
                            onChange={handleAddChange}
                            required
                        />
                        <div className="card-btn-form">
                            <button className="btn" onClick={handleAdd}>Tambah</button>
                            <button className="btn" onClick={() => setShowAddForm(false)}>Batal</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ListView;
