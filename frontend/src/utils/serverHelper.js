import { URL } from "./config";

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

// Function to make an authenticated POST request to a specified route with a given body
export const makeAuthPostReq = async (route, body) => {
    // Retrieve the authentication token
    const token = getToken();
    // Send a POST request to the specified URL with JSON-formatted body and authorization header
    const response = await fetch(URL + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    // Parse and return the JSON response
    const formattedResponse = await response.json();
    return formattedResponse;
}

// Function to make an authenticated GET request to a specified route
export const makeAuthGetReq = async (route) => {
    // Retrieve the authentication token
    const token = getToken();
    // Send a GET request to the specified URL with authorization header
    const response = await fetch(URL + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    // Parse and return the JSON response
    const formattedResponse = await response.json();
    return formattedResponse;
}

// Function to retrieve the authentication token from the cookie
const getToken = () => {
    // Extract the token from the cookie using regular expression
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
