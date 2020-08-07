/*
Author: Brian Lee
Function (Component) name: ElectoinResult
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
- How many have voted
- Ordered list of election winners
*/

import Layout from '../../../components/layout';
import { getAllElectionsId, getElectionResult, getElectionData } from '../../../lib/elections'

import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


export default function ElectionResult({ electionData, username, userRole, logOut, logIn }) {
    return (
        <Layout pageTitle={electionData.title} username={username} userRole={userRole} authorizedRoles={["admin", "teacher"]} logOut={logOut} logIn={logIn} >            
            <Col xs={{ span: 8, offset: 2 }}>
                <h2>{electionData.title}</h2>
                <h6>ID: {electionData.id}</h6>
                <p>{electionData.description}</p>
                <p>Voting opens at: {String(new Date(electionData.voteOpen))}</p>
                <p>Voting closes at: {String(new Date(electionData.voteClose))}</p>
                {/* Shows how many voters have voted out of eligible votes */}
                <p>{Object.keys(electionData.voterRoll).filter(voter => electionData.voterRoll[voter] === 1).length} out of {electionData.voters.length} voted</p>
                <Alert variant="primary">
                    <h3>The winners of the election are:</h3>
                    <ol>
                    {/* Creates a list item for each winner */}
                    {(winnersArray in electionData) ? (
                        electionData.winnersArray.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))
                    ) : (
                        ""
                    )}
                    </ol>
                </Alert>
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