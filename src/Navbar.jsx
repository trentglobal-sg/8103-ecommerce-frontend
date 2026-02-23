import React, { useState } from 'react'
import { Link, useLocation } from 'wouter';
import { useJwt } from './UserStore';

export default function Navbar() {

    const [isNavbarShowing, setNavbarShowing] = useState(false);
    const [location] = useLocation();
    const toggleNavbar = () => {
        setNavbarShowing(!isNavbarShowing);
    }
    const { getJwt } = useJwt();
    const jwt = getJwt();

    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="/">E-Shop</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === "/" ? "active" : ""}`} aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === "/products" ? "active" : ""}`} href="/products">Products</Link>
                        </li>
                        {
                            jwt ? (<>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location === "/cart" ? "active" : ""}`} href="/cart">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location === "profile" ? "active" : ""}`} href="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location === "/logout" ? "active" : ""}`} href="/logout">Logout</Link>
                                </li>
                            </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location === "/register" ? "active" : ""}`} href="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location === "/login" ? "active" : ""}`} href="/login">Login</Link>
                                    </li>
                                </>
                            )
                        }




                    </ul>
                </div>
            </div>
        </nav>

    </>)
}