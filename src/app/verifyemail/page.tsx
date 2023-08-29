"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function verifyEmailPage() {

    const [token, setToken] = useState(""); // stores token;
    const [verified, setVerified] = useState(false); // user is verified or not (boolean);
    const [error, setError] = useState(false); // check for error (boolean);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token}) // Grab the url and update the token;
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {

        const urlToken = window.location.search.split("=")[1]; // get token from url;
        setToken(urlToken || ""); // store token in useState;

    }, []) // When first time user land on the page;

    useEffect(() => {
        // Check if Token is changed or not, if yes verify user email again;
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]) // if there is change in token useEffect work; Which is initally empty string;

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl ">Verify Email</h1>
            <h1 className="p-2 bg-orange-500 text-black">{token? `${token}`:"no token"}</h1>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href='/login'>Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
    
    
}