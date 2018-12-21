import React from 'react'
import { Link,  } from 'gatsby'

import lisao from '../img/lisao.png'
import avatar from '../img/avatar.png'

import UserContext from '../context/UserContext'
import { getPathname } from '../services/auth'

const Navbar = class extends React.Component {


  componentDidMount() {

    // ADD PAGE MENU EXPAND OR CLOSE SWITH
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {
 
     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
 
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);// id="navMenu"
 
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
 
       });
     });
   }

 }
 
 render() {

  let {user} = this.context;
  let pathname = getPathname();

  return (
  
    <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={lisao} alt="Kaldi" style={{ width: 'auto' }} />
          </Link>
          {/* Hamburger menu in mobile mode */}
          <div className="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start has-text-centered">
            <Link className={`navbar-item gap ${pathname==='/'?'active':''}`} to="/">
              Home
            </Link>
            <Link className={`navbar-item gap ${pathname==='/products'?'active':''}`} to="/products">
              Services
            </Link>
            <Link className={`navbar-item gap ${pathname==='/contact'?'active':''}`} to="/contact">
              Contact
            </Link>
            <Link className={`navbar-item gap ${pathname==='/about'?'active':''}`} to="/about">
              About
            </Link>
          </div>
          
          <div className="navbar-end has-text-centered">
            <Link className="navbar-item gap" to="/app/profile">
              {user?
                (<span className="username-navbar">Welcome {user.user_metadata.full_name}</span>):
                (<span className="icon"><img src={avatar} alt="User" /></span>)
              }
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )}
}

Navbar.contextType = UserContext

export default Navbar
