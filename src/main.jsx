import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from './components/homepage-content/homepage-content.jsx'
import Login from './components/login/login-content.jsx'
import Signup from './components/signup/signup-content.jsx'
import Profile from './components/profile/profile-content.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'

const cardsData = [
  {
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kelas yang fleksibel.',
    imageUrl: 'learning-edu.png',
    author: 'Jenna Ortega',
    authorImg: 'author-picture.png',
    position: 'Senior Accountant',
    company: 'Gojek',
    rating: '3.5',
    people: '86',
    price: 'Rp 300K'

  },
  {
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kelas yang fleksibel.',
    imageUrl: 'learning-edu.png',
    author: 'Jenna Ortega',
    authorImg: 'author-picture.png',
    position: 'Senior Accountant',
    company: 'Gojek',
    rating: '3.5',
    people: '86',
    price: 'Rp 300K'

  },
  {
    title: 'Big 4 Auditor Financial Analyst',
    description: 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kelas yang fleksibel.',
    imageUrl: 'learning-edu.png',
    author: 'Jenna Ortega',
    authorImg: 'author-picture.png',
    position: 'Senior Accountant',
    company: 'Gojek',
    rating: '3.5',
    people: '86',
    price: 'Rp 300K'

  },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage getData={cardsData} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
