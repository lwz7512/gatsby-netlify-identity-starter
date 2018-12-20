/**
 * base page component with user context
 * @2018/12/12
 */
import React from 'react';

import netlifyIdentity from 'netlify-identity-widget'
import UserContext from '../context/UserContext'
// import Layout from '../components/Layout'
import BaseLayout from './BaseLayout'

export default class BasePage extends React.Component {


  constructor(props) {
    super(props)
  
    this.state = {
       user: null
    }
  }
  
  // called by outside
  updateUser(user) {
    this.setState({user:user})
    console.log('update user:', user);
  }

  componentDidMount() {
    const user = netlifyIdentity.currentUser();
    // console.log({ user });
    if(user) this.setState({user})
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <BaseLayout>
        {this.props.children} 
        </BaseLayout>
      </UserContext.Provider>
    )
  }


}