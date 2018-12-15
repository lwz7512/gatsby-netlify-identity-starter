import React from 'react';

// import { navigate } from "gatsby"
import { navigate } from "@reach/router"

import BasePage from '../components/BasePage'
// import Login from '../components/Login' // form
import Spinner from '../components/Spinner'

import { isLoggedIn, loginNI, logoutNI } from "../services/auth"


export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      loading: false,
      logged : false,
      user   : null
    }
    this.basepage = React.createRef()
  };
  
  componentDidMount() {
    this.setState({logged:isLoggedIn()})
  }

  // DO NOT NAVIGATE TO '/' PROGRAMINGLY, OR CAUSE LOGIN BACKEND 
  // 2018/12/14
  login() {
    console.log('login...')
    loginNI((user) => {
      console.log(user);
      console.log('logged in!')
      this.setState({logged: true})
      this.basepage.current.updateUser(user)
      this.goHome()
    })
  }

  logout() {
    console.log('logout....')
    this.setState({loading:true})
    logoutNI(() => {
      this.setState({loading:false, logged: false})
      this.basepage.current.updateUser(null)
      // this.goHome()
    })
  }

  goHome() {
    setTimeout(()=>navigate('/', { replace: true }), 200)
  }

  render() {

    console.log(this.state)

    const button = {
      display: 'block',
      marginBottom: 10,
      height: '2.25em',
      color: '#FFF',
      borderRadius: 4,
      borderColor: 'transparent',
      width: 80,
      fontSize: '1em',
    }

    const oBtn = {
      ...button,
      backgroundColor: '#3273dc',
    }

    const bBtn = {
      ...button,
      backgroundColor: '#FC461E',
    }


    return (<BasePage ref={this.basepage}>
        <section className="section">
          <div className="container">
            {this.state.logged?
              (<>
                <div className="content">
                  <h1 className="has-text-weight-bold is-size-2">Welcome Dear</h1>
                </div>
                <button style={oBtn} onClick={this.logout.bind(this)}>Logout</button>
                {<button style={bBtn} onClick={this.goHome.bind(this)}>GoHome</button>}
                {this.state.loading?<Spinner/>:false}
              </>):
              (<>
                <div className="content">
                  <h1 className="has-text-weight-bold is-size-2">Login First</h1>
                </div>
                <button style={oBtn} onClick={this.login.bind(this)}>Login</button>
              </>)
            }
            {/*<Login onSucces="" onFailure=""/>*/}
          </div>
        </section>
      </BasePage>)

  }

}