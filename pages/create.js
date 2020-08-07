/*
Author: Brian Lee
Function (Component) name: CreateElection
Input:
- Dictionary: electionData (fetched from API)
- String: username
- String: userRole
- Function: logOut
- Function: logIn 
Output: Renders a page for the election according to parameter in URL with the following components if the user is authorised:
- Create new election heading
- Following input fields and labels
  - Election title
  - Election ID
  - Description
  - Voter usernames
  - Spectator usernames
  - Candidate names
  - Vote opening time
  - Vote closing time
  - Number of winners
- Button to create election
*/


import Layout from '../components/layout';
import { getAllElectionsData  } from '../lib/elections'
import Link from 'next/link'
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function CreateElection({ electionData, username, userRole, logOut, logIn }) {
  const [formData, setFormData] = useState({
    "id": "",
    "title": "",
    "desc": "",
    "votersStr": "",
    "specsStr": "",
    "candsStr": "",
    "openStr": "",
    "closeStr": "",
    "winnerCount": 1
  })
  const [created, setCreated] = useState(false)

  // Event handler for input field change which syncs with the application state
  const handleChange = (event) => {
    let data = {
      ...formData
    }
    data[event.target.name] = event.target.value

    setFormData(data)
  }

  // Event handler for submission which creates the election
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData)

    fetch(`https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections`, {
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "userRole": userRole,
        "id": formData.id,
        "title": formData.title,
        "description": formData.desc,
        "voteOpen": Date.parse(formData.openStr),
        "voteClose": Date.parse(formData.closeStr),
        "winnerCount": formData.winnerCount,
        "voters": formData.votersStr.split(","),
        "spectators": formData.specsStr.split(","),
        "candidates": formData.candsStr.split(","),
      })
    }).then(res => res.json()).catch(err => console.error(err));

    setCreated(true);
  }

  return (
    <Layout pageTitle="Create election" username={username} userRole={userRole} authorizedRoles={["admin"]} logOut={logOut} logIn={logIn} >  
      <h4>Create new election</h4>
      {created ? (
        {/* Show after creating election */}
        <Link href="/dashboard"><p>Return to dashboard</p></Link>
      ) : (
        <Form onSubmit={handleSubmit} >
          <Form.Group>
            <Form.Label htmlFor="title">Election title</Form.Label>
            <Form.Control size="lg" type="text" placeholder="Election Title" name="title" value={formData.title} onChange={handleChange} maxlength="30" required/>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="id">Electoin ID</Form.Label>
            <Form.Control type="text" placeholder="Election ID" name="id" value={formData.id} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="desc">Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter description" name="desc" value={formData.desc} onChange={handleChange} maxlength="500" required/>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="votersStr">Voter usernames</Form.Label>
            <Form.Control as="textarea" placeholder="Enter voter usernames" name="votersStr" value={formData.votersStr} onChange={handleChange} required/>
            <Form.Text>Please separate usernames with a comma</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="specsStr">Spectator usernames</Form.Label>
            <Form.Control as="textarea" placeholder="Enter spectator usernames" name="specsStr" value={formData.specsStr} onChange={handleChange} required/>
            <Form.Text>Please separate usernames with a comma</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="candsStr">Candidates</Form.Label>
            <Form.Control as="textarea" placeholder="Enter candidate names" name="candsStr" value={formData.candsStr} onChange={handleChange} required/>
            <Form.Text>Please separate candidate names with a comma</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="openStr">Vote opening time</Form.Label>
            <input className="form-control" type="datetime-local" onChange={handleChange} name="openStr" value={formData.openStr} max={formData.closeStr} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="closeStr">Vote opening time</Form.Label>
            <input className="form-control" type="datetime-local" onChange={handleChange} name="closeStr" value={formData.closeStr} min={formData.openStr} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="winnerCount">Number of winners</Form.Label>
            <Form.Control type="number" onChange={handleChange} name="winnerCount" value={formData.winnerCount} min="1" max={formData.candsStr.split(",").length} required/>
          </Form.Group>
          <Button type="submit">Create election</Button>
        </Form>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const electionData = await getAllElectionsData()
  return {
      props: {
        electionData
      }
  }
}