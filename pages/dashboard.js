/*
Author: Brian Lee
Function (Component) name: Dashboard
Input:
- Array: elections (fetched from API)
- String: username
- String: userRole
- Function: logOut
- Function: logIn 
Output: Renders a page for the election according to parameter in URL with the following components if the user is authorised:
- Dashboard heading
- Button to create new electoin
- List of elections showing
  - Status (active, inactive, finished)
  - Election title
  - Election ID
*/

import Layout from '../components/layout'
import { getAllElectionsData } from '../lib/elections';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'

export default function Dashboard({ elections, username, userRole, logOut, logIn }) {
  return (
    <Layout pageTitle="Dashboard" username={username} userRole={userRole} authorizedRoles={["admin"]} logOut={logOut} logIn={logIn} >
      <div className="d-flex justify-content-between" style={{"margin": "20px 0px"}}>
        <h3>Dashboard</h3>
        <Link href="/create"><Button className="justify-content-end"><a>Create new election</a></Button></Link>
      </div>
      {elections.map(({ id, title, voteOpen, voteClose }) => (
        <Row key={id} style={{"borderBottom": "0.5px solid grey", "padding": "10px 0px"}}>
          <Col xs={1} ><h4>{voteOpen > Date.now() ? (
            <Badge variant="warning">Inactive</Badge>
          ) : (Date.now > voteClose ? (
            <Badge variant="warning">Closed</Badge>
          ) : (
            <Badge variant="success">Active</Badge>
          ))}</h4>
          </Col>
          <Col xs={10}>
            <h3><Link href="/elections/[id]" as={`/elections/${id}`}><a>{title}</a></Link></h3>
            <p>ID: {id}</p>
          </Col>
        </Row>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const elections = await getAllElectionsData();

  return {
    props: {
      elections
    }
  }
}
