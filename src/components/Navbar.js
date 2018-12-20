import React from 'react'
import { Link, navigate } from 'gatsby'
// import github from '../img/github-icon.svg'
// import logo from '../img/logo.svg'
// import saoke from '../img/saoke.png'
import lisao from '../img/lisao.png'
import avatar from '../img/abstract-user-flat-3.svg'

import UserContext from '../context/UserContext'

const Navbar = class extends React.Component {


  handleUserNavigate() {
    console.log('user avatar clicked!')
    navigate('/login')
  }

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {
 
     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
 
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);
 
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
 
       });
     });
   }
 }
 
 render() {

  let {user} = this.context
  // console.log(this.context)
  // console.log('user in nvbar:', user)


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
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/products">
              Services
            </Link>
            <Link className="navbar-item" to="/contact">
            Contact
            </Link>
            <Link className="navbar-item" to="/about">
              About
            </Link>
            {/*<Link className="navbar-item" to="/contact/examples">
              Form Examples
            </Link>*/}
          </div>
          <div className="navbar-end has-text-centered">
            <div
              className="navbar-item"
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.handleUserNavigate}
              >
              {user?
                (<span className="username-navbar">Welcome {user.user_metadata.full_name}</span>):
                (<span className="icon"><img src={avatar} alt="User" /></span>)
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )}
}

Navbar.contextType = UserContext

export default Navbar
