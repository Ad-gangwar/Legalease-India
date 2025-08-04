const URL = process.env.REACT_APP_URL;

// Function to make an unauthenticated POST request to a specified route with a given body
export const makeUnauthPostReq = async (route, body) => {
    // Send a POST request to the specified URL with JSON-formatted body
    const response = await fetch(URL + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    
    // Parse and return the JSON response
    const formattedResponse = await response.json();
    return formattedResponse;
}

export const makeUnauthGetReq = async (route, body) => {
    // Send a GET request to the specified URL with JSON-formatted body
    const response = await fetch(URL + route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    
    // Parse and return the JSON response
    const formattedResponse = await response.json();
    return formattedResponse;
}

// Function to make an authenticated POST request to a specified route with a given body
export const makeAuthPostReq = async (route, body) => {
    // Send a POST request to the specified URL with JSON-formatted body and authorization header
    const response = await fetch(URL + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("legalToken")}`,
        },
        body: JSON.stringify(body),
    });

    // Parse and return the JSON response
    const formattedResponse = await response.json();
    return formattedResponse;
}

// Function to make an authenticated GET request to a specified route
export const makeAuthGetReq = async (route) => {
    // Send a GET request to the specified URL with authorization header
    const response = await fetch(URL + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("legalToken")}`,
        },
    });

    // Parse and return the JSON response
    const formattedResponse = await response.json();
    return formattedResponse;
}