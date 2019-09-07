import React from 'react';
import {
    GoogleLogin
} from 'react-google-login';

const fetchJWTFromGoogleToken = async (google_token) => {
    const jwt_response = await fetch('/auth/google/get_jwt',
        {
            method: 'POST', mode: 'cors', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ token: google_token.tokenId })
        })

    const jwt_response_json = await jwt_response.json()
}

function GoogleLoginButton() {

    return (
        <GoogleLogin
            clientId="1043781547741-t5lgl8nb3910cpffumdb1q6d1ii9hhj4.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={fetchJWTFromGoogleToken}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default GoogleLoginButton;