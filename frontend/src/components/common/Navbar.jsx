import React, { useState } from 'react';
import {navbarStyles as s} from '../../assets/dummyStyles';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  // to toggle the menu for mobile
    const toggleMenu = () => setIsOpen(!isOpen);

    //navlinks
    const navLinks = (
        <>
        {(!user || user.role !== "buyer" ) && (
            <Link to="/properties" className={s.navLink} onClick={() => setIsOpen(false)} >
                Browse Properties
            </Link>
        )}
        {user && user.role === "buyer" && (
            <>
            <Link to="/" className={s.navLink} onClick={() => setIsOpen(false)} >
                Home
            </Link>
            <Link to="/properties" className={s.navLink} onClick={() => setIsOpen(false)} >
                Property
            </Link>
            <Link to="/wishlist" className={s.navLink} onClick={() => setIsOpen(false)} >
                Wishlist
            </Link>
            <Link to='/chat-messages' className={s.navLink} onClick={() => setIsOpen(false)} >
                Messages
            </Link>
            <Link to='/contacts' className={s.navLink} onClick={() => setIsOpen(false)} >
                Contact Us
            </Link>
            </>
        )}

        {!user && (
            <>
            <Link to="/login" className={s.navLink} onClick={() => setIsOpen(false)} >
                Login
            </Link>
            
            <Link to="/register" className={s.navLink} onClick={() => setIsOpen(false)} >
                Register
            </Link>
            </>
        )}

        {/* for seller */}
        {user && user.role === "seller" && (
            <>
            <Link to="/dashboard" className={s.navLink} onClick={() => setIsOpen(false)} >
                Dashboard
            </Link>
            </>
        )}

        {/* for admin */}
        {user && user.role === "admin" && (
            <>
            <Link to='/admin-dashboard' className={s.navLink} onClick={() => setIsOpen(false)} >
                Admin Panel
            </Link>
            </>
        )}
        </>
    );

  return (
    <>
    <nav className={s.navbar}>
        <div className={s.container}>
            <div className={s.grid}>
                <div className='justify-self-start'>
                    <Logo />
                </div>
                <div className={s.desktopMenu}>
                    {navLinks}
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar