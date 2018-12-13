import React from 'react';

import { navigate } from "gatsby"

import BasePage from '../components/BasePage'
import Login from '../components/Login' // form



export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)

  };
  
  componentDidMount() {
    
  }

  render() {
    return (
      <BasePage>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Login First</h1>
            </div>
    
            <Login 
              onSuccess={()=>navigate(`/`)} 
              onFailure={()=>console.log('login failured!')}
              />
    
          </div>
        </section>
      </BasePage>
    )
  }

}