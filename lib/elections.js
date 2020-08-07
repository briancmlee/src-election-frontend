/*
Author: Brian Lee
Library name: election
Purpose: to fetch data from backend API to render on frontend
Functions:
- getAllElectionsData
- getAllElectionsID
- getElectionData
- getElectionResult
*/


/*
Function name: getAllElectionData
Input: None
Output: array of elections (with all data) retried from backendAPI
*/
export async function getAllElectionsData() {
    const res = await fetch("https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections", {
        headers: {
            "username": "admin",
            "userRole": "admin"
        }
    });
    return res.json()
}

/*
Function name: getAllElectionsId
Input: None
Output: array of elections (with just id) retrieved from backend API
*/
export async function getAllElectionsId() {
    const res = await fetch("https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections", {
        headers: {
            "username": "admin",
            "userRole": "admin"
        }
    });
    const data = await res.json();

    return data.map(election => ({
        params: {
            id: election.id
        }
    }))
}

/*
Function name: getAllElectionsId
Input: 
- String: id
Output: data for target election retrieved from backend API
*/
export async function getElectionData(id) {
    const res = await fetch(`https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections/${id}`, {
        headers: {
            "username": "admin",
            "userRole": "admin"
        }
    });
    return res.json()
}

/*
Function name: getAllElectionsId
Input: 
- String: id
Output: data for target election retrieved from backend API after calculating results
*/
export async function getElectionResult(id) {
    const res = await fetch(`https://4oo6qc4hh3.execute-api.ap-southeast-2.amazonaws.com/dev/elections/${id}/calculate`, {
        headers: {
            "username": "admin",
            "userRole": "admin"
        }
    });
    const data = res.json()
}