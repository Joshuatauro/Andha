import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './State/AuthContext';
import { ChakraProvider } from "@chakra-ui/react"
import { PostsProvider } from './State/PostsContext';
import { UserProfileProvider } from './State/UserProfileContext'
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    greenFlair: {
      100: "#00AE81",
    },
  },
})


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
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


