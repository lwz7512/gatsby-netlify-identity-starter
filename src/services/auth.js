import netlifyIdentity from 'netlify-identity-widget';

// for temporarily cache in client
// @2018/12/21
const GlobalObj = {};
Object.defineProperty(GlobalObj, 'pathname', {value: '/', writable: true});


// 1. check log status
export const isLoggedIn = () => {
  // const user = getUser()
  if(typeof netlifyIdentity.currentUser !== `undefined`){
    return !!netlifyIdentity.currentUser();
  }
  return false
}
// 2. log in
export const loginNI = callback => {
  netlifyIdentity.open()
  netlifyIdentity.on('login', (user)=>{
    netlifyIdentity.close()
    callback(user)
  })
}

// 3. log out
export const logoutNI = callback => {
  netlifyIdentity.logout();
  netlifyIdentity.on('logout', callback)
}

// 4. get user data
export const getUser = () =>
  isBrowser() && netlifyIdentity.currentUser()
    ? netlifyIdentity.currentUser()
    : {}

// 5. save pathname
export const setPathname = path => GlobalObj.pathname = path

// 6. get pathname
export const getPathname = () => GlobalObj.pathname


export const isBrowser = () => typeof window !== "undefined"


export const setUser = user => {
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
  return true;
}

export const handleLogin = ({ username, password }) => {
  if (username === `john` && password === `pass`) {
    return setUser({
      username: `john`,
      name: `Johnny`,
      email: `johnny@example.org`,
    })
  }

  return false
}
