export const BASE_URL = 'https://auth.nomoreparties.co';


export const register = ( email, password ) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((response => response.json()))
        .then((data) => {
            if (data.token){
                localStorage.setItem('token', data.token);
                return data;
            }
        })
        .catch(err => console.log(err))
};