/*
Author: Brian Lee
Function (Component) name: App
Input:
- Object: Component
- Dictionary: pageProps
Output: Renders all child elements passing in states for username, role and functions
*/


import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function App({ Component, pageProps }) {
  const [username, setUsername] = useState("admin")
  const [userRole, setUserRole] = useState("admin")

  const logOut = () => {
    setUserRole("")
    // localStorage.setItem("username", "")

    setUsername("")
    // localStorage.setItem("userRole", "")
  }

  const logIn = (username, userRole) => {
    setUsername(username)
    // localStorage.setItem("username", username)

    setUserRole(userRole)
    // localStorage.setItem("userRole", userRole)
  }

  return <Component {...pageProps} username={username} userRole={userRole} logIn={logIn} logOut={logOut} />
}