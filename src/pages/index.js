import React from 'react'
import PropTypes from 'prop-types'
// import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { isLoggedIn } from "../services/auth"

import Protected from './Protected';
import Public from './Public';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import netlifyIdentity from 'netlify-identity-widget';



const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', user => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    netlifyAuth.isAuthenticated ? (
      <p>
        Welcome!{' '}{netlifyAuth.user.user_metadata.full_name}{' '}
        <button
          onClick={() => {
            netlifyAuth.signout(() => history.push('/'));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        netlifyAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class Login extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default class IndexPage extends React.Component {

  // rcocn
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
    // window.netlifyIdentity = netlifyIdentity;
    // You must run this once before trying to interact with the widget
    netlifyIdentity.init()
    console.log('netlify id inited....')

    // FIXME, check user here is must ! @2018/12/11
    const user = netlifyIdentity.currentUser();
    // console.log({ user });
    if(user){
      netlifyAuth.isAuthenticated = true
      netlifyAuth.user = user
    }
    
  }
  
  
  // cdm
  componentDidMount() {

  }

  render() {
    const { data } = this.props
    // const { edges: posts } = data.allMarkdownRemark

    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={Protected} />
        </div>
      </Router>
    )
  }
}

IndexPage.propTypes = {
  // data: PropTypes.shape({
  //   allMarkdownRemark: PropTypes.shape({
  //     edges: PropTypes.array,
  //   }),
  // }),
}

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] },
//       filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
//     ) {
//       edges {
//         node {
//           excerpt(pruneLength: 100)
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             templateKey
//             date(formatString: "MMMM DD, YYYY")
//           }
//         }
//       }
//     }
//   }
// `
