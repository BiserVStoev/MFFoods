const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_ry67d6EXX";
const kinveyAppSecret = "a4ecc0867207424dba98f9ef7823fd84";

function makeAuth(type) {
    return type === 'basic'
        ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        : 'Kinvey ' + sessionStorage.getItem('authtoken');
};

function constructUrl(module, endpoint, query) {
    let url = `${kinveyBaseUrl}${module}/${kinveyAppKey}/${endpoint}`;
    if (query) {
        url += '?query=' + JSON.stringify(query);
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


function get(module, endpoint, auth, query) {
    return fetch(constructUrl(module, endpoint, query), makeRequest('GET', auth));
};

function post(module, endpoint, auth, data) {
    const req = makeRequest('POST', auth);
    req.body = JSON.stringify(data);
    req.headers['Content-Type'] = 'application/json';
    return fetch(constructUrl(module, endpoint), req);
};

async function register(username, email, password) {
    const data = { username, email, password };
    const res = await post('user', '', 'basic', data);
    return await res.json();
};

async function login(username, password) {
    const data = { username, password };
    const res = await post('user', 'login', 'basic', data);
    return await res.json();
};

export { register, login };