import React from 'react';

// defualt blank user is a must to run build
const user = {
  user_metadata:{}
}
const UserContext = React.createContext(user)

export default UserContext