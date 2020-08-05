import Layout from '../../components/layout';
import { getAllElectionsId, getElectionData } from '../../lib/elections'

export default function Election({ electionData }) {
    return (
        <Layout>
            <h1>{electionData.title}</h1>
            <h4>ID: {electionData.id}</h4>

            <p>{electionData.description}</p>

            <ul>{electionData.candidates.map(candidate => (
                <li id={candidate}>
                    {candidate}
                </li>
            ))}</ul>
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