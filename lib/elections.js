import fetch from 'node-fetch'

export async function getAllElectionsData() {
    const res = await fetch("https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections");
    return res.json()
}

export async function getAllElectionsId() {
    const res = await fetch("https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections");
    const data = await res.json();

    return data.map(election => ({
        params: {
            id: election.id
        }
    }))
}

export async function getElectionData(id) {
    const res = await fetch(`https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections/${id}`);
    return res.json()
}