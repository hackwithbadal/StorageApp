import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <div>
        <Link to='/home'>login</Link>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Login