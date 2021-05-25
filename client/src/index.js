import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './State/AuthContext';
import { ChakraProvider } from "@chakra-ui/react"
import { PostsProvider } from './State/PostsContext';
import { UserProfileProvider } from './State/UserProfileContext'
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <PostsProvider>
          <UserProfileProvider>
            <App />
          </UserProfileProvider>
        </PostsProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


