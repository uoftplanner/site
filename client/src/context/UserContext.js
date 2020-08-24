import {createContext} from 'react';

const UserContext = createContext({loggedIn: false, user: {}});

export {
  UserContext
};