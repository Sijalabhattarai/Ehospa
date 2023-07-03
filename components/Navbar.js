import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">EHospa</div>

      <ul className="nav-links">
        <li><Link href="/" className="nav-link">Home</Link></li>
        <li><Link href="/about" className="nav-link">About</Link></li>
        <li><Link href="/doctors" className="nav-link">Doctors</Link></li>
      </ul>

      <div className="btn btn-primary">
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;

