const kinveyBaseUrl = "https://baas.kinvey.com";
const kinveyAppKey = "kid_ry67d6EXX";
const kinveyAppSecret = "a4ecc0867207424dba98f9ef7823fd84";

function makeAuth(type) {
    return type === 'basic'
        ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        : 'Kinvey ' + localStorage.getItem('authToken');
};

function constructUrl(module, endpoint, query) {
    let url = `${kinveyBaseUrl}/${module}/${kinveyAppKey}/${endpoint}`;
    if (query) {
        url += '?query=' + query
    }
    return url;
};

function makeRequest(method, auth) {
    return {
        method: method,
        headers: {
            'Authorization': makeAuth(auth),
        }
    };
};

export function get(module, endpoint, auth, query) {
    return fetch(constructUrl(module, endpoint, query), makeRequest('GET', auth));
};

export function post(module, endpoint, auth, data) {
    const req = makeRequest('POST', auth);
    req.body = JSON.stringify(data);
    req.headers['Content-Type'] = 'application/json';
    return fetch(constructUrl(module, endpoint), req);
};