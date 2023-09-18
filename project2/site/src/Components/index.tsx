import React from 'react';
import './index.css';
import { useEffect, useState } from "react";
import { ErrorMessage } from 'formik';

function Home() {
    const [url, setUrl] = useState("");
    const [token, setToken] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(Boolean);
    const [textColor, setTextColor] = useState('black');
    const [errorText, setErrorText] = useState(<p></p>);

    let gotStoredUrl: boolean = !(localStorage.getItem("url") === null);
    let gotStoredToken: boolean = !(sessionStorage.getItem("token") === null);
    useEffect(() => { // When the component gets mounted
        if (gotStoredUrl && gotStoredToken) { // Same session
            setUrl(localStorage.getItem("url") || "");
            setToken(sessionStorage.getItem("token") || "");
            setLoggedIn(true);
        } else if (gotStoredUrl) { // Different session, but we remember the last url (and not token)
            setUrl(localStorage.getItem("url") || "");
            setLoggedIn(false);
        } else { // "Logged out" or never gotten an URL before
            setLoggedIn(false);
        }
    }, []);

    // Update values
    const updateUrl = (event: any) => {
        setUrl(event.target.value);
    };
    const updateToken = (event: any) => {
        setToken(event.target.value);
    };

    function incorrectInput() {
        setErrorText(<p style={{ color: "red" }}>Kombinasjon av URL og token er ikke gyldig.</p>);
    }

    function newUrlAndToken() { // When you want to choose a different URL and Token
        localStorage.clear();
        sessionStorage.clear();
        setUrl("");
        setToken("");
        setLoggedIn(false);
    }

    async function repoDataURL() {
        //Get repo data about github user
        const api: string = ".no/api/v4/projects/"
        let urlArray: Array<string> = url.split(".no/");
        if (urlArray.length !== 2) {
            incorrectInput();
            return;
        }

        await fetch(urlArray[0] + api + urlArray[1].replaceAll("/", "%2F") + "/repository/commits?private_token=" + token)
            .then((res) => res.json(),
                (error) => {
                    incorrectInput();
                    console.log(error);
                })
            .then(
                (result) => {
                    if ('message' in result) {
                        incorrectInput();
                        return;
                    }
                    console.log("videre");
                    setErrorText(<p></p>);
                    if (typeof (Storage) !== "undefined") {
                        // Store
                        localStorage.setItem("url", url);
                        sessionStorage.setItem("token", token);
                        setLoggedIn(true);
                    }
                },
                (error) => {
                    incorrectInput();
                    console.log(error);
                }
            );
    }

    // Conditional Rendering
    var returnValue;
    if (gotStoredUrl && gotStoredToken) { // Same session
        returnValue = (
            <div className="StartScreen">
                <p>Nå har du tilgang til å visualisere data for {url}. Trykk på en av elementene i navbaren.</p>
                <p>Eller velg en ny url.</p>
                <button onClick={newUrlAndToken}>New URL</button>
            </div>
        );
    } else if (gotStoredUrl) { // Different session, but we remember the last url (and not token)
        returnValue = (
            <div className="StartScreen">
                <p>Forrige gang var du på {url}. Legg til token for å visualisere data for dette prosjektet. NB, du må legge inn informasjon i tekstboksen under for å få tilgang til resten av nettsiden.</p>
                <h3>Token:</h3>
                <input type="text" name="token" onChange={updateToken} /><br />
                {errorText}
                <button onClick={repoDataURL}>Submit</button>
                <p>Eller velg en ny url.</p>
                <button onClick={newUrlAndToken}>New URL</button>
            </div>
        );
    } else { // Never gotten an URL before
        returnValue = (
            <div className="StartScreen">
                <p>Legg til URL link og token for å visualisere data. Eksempel på url er https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-XX/prosjekt. NB, du må legge inn informasjon i tekstboksene under for å få tilgang til resten av nettsiden.</p>
                <h3>URL Link:</h3>
                <input type="text" name="link" onChange={updateUrl} /><br />
                <h3>Token:</h3>
                <input type="text" name="token" onChange={updateToken} /><br />
                {errorText}
                <button onClick={repoDataURL}>Submit</button>
            </div>
        );
    }

    return (
        <div className="Home">
            <h1>Visualisering/presentasjon av GITLAB data</h1>
            {returnValue}
        </div>
    );
}

export default Home;
