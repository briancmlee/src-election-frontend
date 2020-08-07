/*
Author: Brian Lee
Function (Component) name: Header
Input:
- String: username
- Function: logOut
Output: renders a navbar with a button for logging out
*/

import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


export default function Header({ username, logOut }) {
  return (
    <Navbar bg="light" sticky="top" >
      <Navbar.Brand><Link href="/dashboard">SRC Election Software</Link></Navbar.Brand>
      <Navbar.Collapse className="justify-content-end" >
        <Navbar.Text style={{ "marginRight": "10px" }}>
          Signed in as: {username}
        </Navbar.Text>
        <Button onClick={logOut} variant="outline-primary">Log out</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}