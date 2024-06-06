import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './pages/Default';
import Admin from './pages/Admin';
import Login from './pages/Login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Default />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;
