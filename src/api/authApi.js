import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

export const processsignup = async (email, password, name, phone) => {
  return await axios.post(API_URL, { email, password, name, phone });
};

export const getusers = async () => {
  return await axios.get(API_URL);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const updateUser = async (id, updatedData) => {
  return await axios.put(`${API_URL}/${id}`, updatedData);
};

export const processlogin = async (email, password) => {
  try {
    const res = await axios.get(API_URL); // Ambil semua user

    const user = res.data.find((u) => u.email === email);

    if (!user || user.password !== password) {
      return { error: 'Email atau password salah' };
    }

    return { user };
  } catch (err) {
    console.error('Axios error:', err);
    return { error: 'Terjadi kesalahan saat menghubungi server' };
  }
};

