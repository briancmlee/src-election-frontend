/*
Author: Brian Lee
Function (Component) name: Vote
Input:
- Dictionary: electionData (fetched from API)
- String: username
- String: userRole
- Function: logOut
- Function: logIn 
Output: Renders a page for the election according to parameter in URL with the following components if the user is authorised:
- Election Title
- Election Name
- Election Description
- Vote opening time
- Vote closing time
- Link back to election info page
- Select forms for ballot preferences
- Double-check checkbox
- Ballot submission button
*/

import Layout from '../../../components/layout';
import { getAllElectionsId, getElectionData } from '../../../lib/elections'
import Link from 'next/link'
import { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';

function CandidateSelect(props) {
    return (
        <Form.Group key={props.id}>
            <InputGroup>
                <InputGroup.Prepend>
                    {/* Shows text for preference position (e.g. "1" for 1st preference input field) */}
                    <InputGroup.Text>{props.id + 1}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" id={props.id} value={props.value[props.id]} onChange={props.handleChange}>
                    <option value={""}> -- select an option -- </option>
                    {/* Creates an option for each candidate */}
                    {props.candidates.map((candidate, index) => (
                        {/* Disables the option if the candidate has already been selected in another field */}
                        <option value={candidate} key={index} disabled={props.value.includes(candidate)} >{candidate}</option>
                    ))}
                </Form.Control>
            </InputGroup>
        </Form.Group>
    )
}

function BallotForm(props) {
    return (
        <ul>
            {props.candidates.map((item, index) => (
                <CandidateSelect 
                    key={index} 
                    id={index} 
                    handleChange={props.changeHandler} 
                    value={props.ballotInput} 
                    candidates={props.candidates} 
                />
            ))}
        </ul>
    )
}


export default function Vote({ electionData, username, userRole, logOut, logIn }) {
    const [ballotInput, setBallotInput] = useState(Array(electionData.candidates.length).fill(""))
    const [checked, setChecked] = useState(false);
    const [voted, setVoted] = useState(false);

    // Event handler for select field change which updates the state
    const handleChange = (event) => {
        let updatedArr = [...ballotInput];
        updatedArr[event.target.id] = event.target.value
        if (event.target.id === "") {
            updatedArr[0] = event.target.value
        }
        setBallotInput(updatedArr)       
    }

    // Event handler for checking the double-check checkbox
    const toggleCheck = (event) => {
        setChecked(prev => !prev)
    }

    // Event handler for submitting the ballot
    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch(`https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections/${electionData.id}/vote`, {
            method: "POST",
            headers: {
                "username": username,
                "userRole": userRole
            },
            body: JSON.stringify({
                "ballot": ballotInput
            })
        }).then(res => res.json()).catch(err => console.error(err));

        setVoted(true);
    }

    return (
        <Layout pageTitle={electionData.title} username={username} userRole={userRole} authorizedRoles={["admin", "student", "teacher"]} logOut={logOut} logIn={logIn} >  
            <Col xs={{ span: 8, offset: 2 }}>
                <h2>{electionData.title}</h2>
                <h6>ID: {electionData.id}</h6>
                <p>{electionData.description}</p>
                <p>Voting opens at: {String(new Date(electionData.voteOpen))}</p>
                <p>Voting closes at: {String(new Date(electionData.voteClose))}</p>
                <Link href="/elections/[id]" as as={`/elections/${electionData.id}`}><a>Return to election page</a></Link>
                {!(voted) ? (electionData.voters.includes(username) ? (
                    (electionData.voterRoll[username] === 0 && (Date.now() > electionData.voteOpen && Date.now() < electionData.voteClose)) ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Text><h3>Select the candidates in order of preference</h3></Form.Text>
                            <BallotForm candidates={electionData.candidates} changeHandler={handleChange} ballotInput={ballotInput} />
                            <Form.Group>
                                {/* Checkbox is disabled until all select fields are filled out */}
                                <Form.Check type="checkbox" checked={checked} onChange={toggleCheck} disabled={ballotInput.includes("")} label="I have double checked my ballot" />
                            </Form.Group>
                            {/* Submission is diabled until the  checkbox is ticked */}
                            <Button disabled={!(checked)} type="submit" >Submit ballot</Button>
                        </Form>
                    ) : (
                        <h3>You cannot vote.</h3>
                    )
                ) : <h3>You are not a voter for this election.</h3>) : (
                    <h4>Thanks for voting</h4>
                )}
                
                
            </Col>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllElectionsId()

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const electionData = await getElectionData(params.id)
    return {
        props: {
            electionData
        }
    }
}