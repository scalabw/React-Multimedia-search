export const fetchWrapper = {
    get: request("GET"),
};

function request(method: string) {
    return async (params: string) => {
        const baseUrl = `https://api.themoviedb.org/3/search/`;

        const requestOptions: RequestInit = {
            method,
            headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
        };

        const urlWithApiKey = `${baseUrl}/${params}`;
        return fetch(urlWithApiKey, requestOptions).then(handleResponse);
    };
}

async function handleResponse(response: Response) {
    const isJson = response.headers
        ?.get("content-type")
        ?.includes("application/json");
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {

        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    return data;
}
