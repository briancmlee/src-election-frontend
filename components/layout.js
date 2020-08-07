/*
Author: Brian Lee
Function (Component) name: Layout
Input:
- Object: children
- String: pageTitle
- String: username
- String: userRole
- Array: authorizedRoles
- Function: logOut
- Function: logIn 
Output: Acts as a wrapper component for children components and authentication, rendering the following
- If the user is authenticated:
  - If the user is authroised to be on the page:
    - Children components passed between this component
  - If the user is unauthorised:
    - Unauthorised error message
- If the user is unauthenticated:
  - Login form
*/

import Head from "next/head";
import Link from "next/link";
import Header from "./header";
import { useState } from "react";
import LoginForm from "./login"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function Layout({ children, pageTitle, username, userRole, authorizedRoles, logIn, logOut }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle + " - SRC Election Software"}</title>
      </Head>

      {(username && userRole) ? (
        <div>
          <Header username={username} logOut={logOut} />
          {authorizedRoles.includes(userRole) ? (
            <Container>{children}</Container>
          ) : (
            <Container>
            {/* If the user is unauthorised */}
              <Col xs={{ span: 6, offset: 3 }} style={{"margin-top": "20vh"}}>
                <p>You are not authorised to access this page.</p>
                <p>Log into an authorised account and try again.</p>
                <Button onClick={logOut} variant="outline-primary">Log out</Button>
              </Col>
            </Container>
          )}
        </div>
      ) : (
        <Container>
        {/* If the user is unauthenticated */}
          <LoginForm handleLogin={logIn} />
        </Container>
      )}
    </>
  );
}
