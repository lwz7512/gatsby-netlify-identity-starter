import React from 'react';

import { navigate } from "gatsby"

import Layout from '../components/Layout'
import Login from '../components/Login'

const LoginPage = () => (
  <Layout>
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
  </Layout>
)

export default LoginPage