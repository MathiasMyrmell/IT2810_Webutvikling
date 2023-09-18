import React from 'react';
import './Issues.css';
import { useEffect, useState, useContext, createContext } from "react";
import IssuesList from './IssuesList';
import './IssuesList.css';

export type IssuesContextState = {
    open: Array<Object>;
    closed: Array<Object>;
};

// For initializing
const issuesDefaultValues: IssuesContextState = {
    open: [],
    closed: [],
};
export const IssuesContext = createContext<IssuesContextState>(issuesDefaultValues);

function Issues() {
    const [repoData, setRepoData] = useState<IssuesContextState>(issuesDefaultValues);

    let url: string = localStorage.getItem("url") || "";
    let token: string = sessionStorage.getItem("token") || "";

    // On mount
    useEffect(() => {
        repoDataURL();
    }, []);

    async function repoDataURL() {
        // Get repo data about github user
        const api: string = ".no/api/v4/projects/";
        let urlArray: Array<string> = url.split(".no/");

        let openIssues: Array<Object> = [];
        let closedIssues: Array<Object> = [];
        await fetch(urlArray[0] + api + urlArray[1].replaceAll("/", "%2F") + "/issues" + "?private_token=" + token)
            .then((res) => res.json())
            .then(
                (result) => {
                    result.map((item: any) => {
                        if (item.closed_by == null) { // If the issue is open or not
                            openIssues.push({ id: item.iid, title: item.title });

                        } else {
                            closedIssues.push({ id: item.iid, title: item.title });

                        }
                    });
                    var issuesValues: IssuesContextState = {
                        open: openIssues,
                        closed: closedIssues,
                    };
                    setRepoData(issuesValues);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    if (repoData == issuesDefaultValues) { // Check if we have fetched yet
        return (
            <div className='Issues'>
                <h1>Visualisering/presentasjon av GITLAB data</h1>
                <p>Loading...</p>
            </div>
        );
    } else {
        return (
            <div className='Issues'>
                <h1>Visualisering/presentasjon av GITLAB data</h1>
                <p>Nå ser du på prosjektet med URL: {url}. På denne siden har vi brukt Context API for å videreføre GITLAB data.</p>
                <IssuesContext.Provider value={repoData}>
                    <IssuesList ></IssuesList>
                </IssuesContext.Provider>
            </div>
        );
    }
}

export default Issues;
