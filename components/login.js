/*
Author: Brian Lee
Function (Component) name: LoginForm
Input:
- Function: handleLogin
- String: username
- String: password
Output: Renders a login form with the following
- Text input for username
- Text input for password
- Login button
- If username and password are incorrect:
  - Error message
*/

import { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const loginData = {
  "admin": {
    "password": "admin",
    "role": "admin"
  },
  "lee0112": {
    "password": "test",
    "role": "student"
  },
  "abc0001": {
    "password": "test1233",
    "role": "student"
  },
  "xyz9999": {
    "password": "samplepassw",
    "role": "student"
  },
  "p.drew": {
    "password": "asdadadcasd",
    "role": "teacher"
  }
}


export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  // Event handler for input field change which updates state with input values
  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value)
    } else {
      setPassword(event.target.value)
    }
  }

  // Event handler for submission which logins users
  const handleSubmit = (event) => {
    event.preventDefault();

    if ((username in loginData) && (password === loginData[username]["password"])) {
      handleLogin(username, loginData[username]["role"])
    } else {
      // If the passwords don't match, show error
      setError(true)
    }
  }

  return (
    <Row>
      <Col xs={{ span: 6, offset: 3 }} style={{"margin-top": "20vh"}}>
        <p>To access the application, please log in.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control name="username" type="text" value={username} placeholder="Enter Username" onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control name="password" type="password" value={password} placeholder="Enter Password" onChange={handleChange} required />
          </Form.Group>
          <Button type="submit">Login</Button>
          {/* If the password and username don't match */}
          {error ? (
            <Form.Text>The username or password is incorrect.</Form.Text>
          ) : ""}
        </Form>
      </Col>
    </Row>
  )
}