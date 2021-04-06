import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"


const Footer = () => {

    return (
        <div className="footerBar">
            <div className="container">
                <div className="footer-nav">
                    <nav className="footer-menu">
                        <Link to="/News">News</Link>
                        <Link to="/Sport">Sport</Link>
                        <Link to="/?category=Culture">Culture</Link>
                        <Link to="/?category=Politics">Politics</Link>
                        <Link to="/Medicine">Medicine</Link>
                    </nav>

                    <div className="copy">Copyright © 2021 BBC</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;