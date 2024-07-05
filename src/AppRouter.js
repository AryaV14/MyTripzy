import React from 'react';
import {Route, Routes } from 'react-router-dom'; // Import Route and Switch from react-router-dom
import FrontPage from './FrontPage'; // Import your FrontPage component
import App from './App'; // Import your App component

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />} /> {/* Route to FrontPage component */}
            <Route path="/app" element={<App/>} /> {/* Route to App component */}
        </Routes>
    );
}

export default AppRouter;
