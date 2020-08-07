/*
Author: Brian Lee
Function (Component) name: Election
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
- Candidates
- If the user is an admin or a spectator:
    - Vote opening time
    - Vote closing time
    - How many have voted
- If the user is a voter and voting is currently open:
    - Prompt and link to voting page
*/

import Layout from '../../components/layout';
import { getAllElectionsId, getElectionData } from '../../lib/elections'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function Election({ electionData, username, userRole, logOut, logIn }) {
    return (
        <Layout pageTitle={electionData.title} username={username} userRole={userRole} authorizedRoles={["admin", "student", "teacher"]} logOut={logOut} logIn={logIn} >
            {(electionData.voters.includes(username) || electionData.spectators.includes(username) || userRole === "admin") ? (<>
                <Col xs={{ span: 8, offset: 2 }}>
                    <h2>{electionData.title}</h2>
                    <h6>ID: {electionData.id}</h6>
                    <p>{electionData.description}</p>
                    <p>Voting opens at: {String(new Date(electionData.voteOpen))}</p>
                    <p>Voting closes at: {String(new Date(electionData.voteClose))}</p>
                    {(userRole === "admin" || electionData.spectators.includes(username)) ? (<>
                        <p>{Object.keys(electionData.voterRoll).filter(voter => electionData.voterRoll[voter] === 1).length} out of {electionData.voters.length} voted</p>
                    </>) : ""}
                    
                    <Alert variant="secondary">
                        {(electionData.voters.includes(username) && (Date.now() > electionData.voteOpen && Date.now() < electionData.voteClose)) ? (<>
                            <h3>Read the candidate descriptions before voting!</h3>
                            <p>If you have already, you can...</p>
                            <Button variant="secondary"><Link href="/elections/[id]/vote" as as={`/elections/${electionData.id}/vote`}>Skip to voting</Link></Button>
                        </>) : (
                            (userRole === "admin" || electionData.spectators.includes(username)) ? (electionData.voteOpen > Date.now() ? (<>
                                <p>Voting has not opened</p>
                                <p>Results are not available yet</p>
                            </>) : (electionData.voteClose < Date.now() ? (<>
                                <p>Voting has closed</p>
                                <Button variant="secondary"><Link href="/elections/[id]/result" as as={`/elections/${electionData.id}/result`}><p>Proceed to results</p></Link></Button>
                            </>) : (<>
                                <p>Voting is open at the moment</p>
                                <Button variant="secondary"><Link href="/elections/[id]/result" as as={`/elections/${electionData.id}/result`}><p>Proceed to results</p></Link></Button>
                            </>))) : <h3>Voting is not yet open</h3>
                        )}
                    </Alert>
                </Col>

                <Row style={{ "margin": "2rem 0"}}>    
                    {electionData.candidates.map(candidate => (
                        <Col xs={4} key={candidate} style={{ "margin": "0.5rem 0"}}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{candidate}</Card.Title>
                                    <Card.Text>This is some placeholder candidate description</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {(electionData.voters.includes(username) && Date.now() > electionData.voteOpen && Date.now() < electionData.voteClose) ? (
                    <div className="d-flex justify-content-center">
                        <Link href="/elections/[id]/vote" as as={`/elections/${electionData.id}/vote`}><Button variant="primary-outline">Proceed to voting</Button></Link>
                    </div>
                ) : ""}

                {electionData.voteOpen > Date.now() ? (
                    <Button>Delete election</Button>
                ) : ""}
            </>) : (
                <h3>Not authorised to view this page.</h3>
            )}
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