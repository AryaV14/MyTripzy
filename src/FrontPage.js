import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './style.css'; // Import your CSS file

// Import images
import logo from './logoow.png'; // Adjust the path to your logo image
import bgImage from './bg1.avif'; // Adjust the path to your background image

const FrontPage = () => {
    return (
        <div classname="b">
            <nav className="navbar">
                <img src={logo} alt="Logo" className="logoo" />
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <div className="container">
                <p className="adventure-text">
                    Time for your<br /><b>next adventure</b>
                </p>
                <p className="plan">Let us plan it for you</p>
                <Link to="/app"> {/* Use Link instead of a tag */}
                    <button className="btn">Get Started</button>
                </Link>
            </div>

            {/* Background image with overlay */}
            <div className="background-image" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="overlay"></div>
            </div>
        </div>
    );
}

export default FrontPage;
