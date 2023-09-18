import React from 'react';
import './Commits.css';
import { useEffect, useState } from "react";
import VerticalBar from './VerticalBar';

// For initializing. Also as a value for when result data can be null
const defaultValue: Array<Object> = [{
    id: [],
    author_name: [],
    commited_date: [],
    title: []
}]

function Commits() {
    const [dataCommits, setDataCommits] = useState(Object);
    const [dataUsers, setDataUsers] = useState(Object);
    const [presentation, setPresentation] = useState("graph");
    const [defaultResultData, setDefaultResultData] = useState(defaultValue);
    const [searchedResultData, setSearchedResultData] = useState(defaultValue);
    const [lastSorted, setLastSorted] = useState("");
    const [sortSign, setSortSign] = useState(Object);

    // HTML Web Storage
    let url: string = localStorage.getItem("url") || "";
    let token: string = sessionStorage.getItem("token") || "";

    // On mount
    useEffect(() => {
        repoDataURL();
    }, []);

    // To toggle between graphs and tables
    const changePresentation = (event: any) => {
        setPresentation(event.target.value);
    };

    // To search in commits titles
    const updateSearch = (event: any) => {
        let searchedData = (defaultResultData || defaultValue).filter((data: any) => {
            if (data.title.toLowerCase().includes(event.target.value.toLowerCase())) {
                return data.title;
            }
        })
        setSearchedResultData(searchedData);
        jsonToTable();

        // If table is sorted before searching, we have to show that it is unsorted now
        let signObject: { [key: string]: string } = {
            author_name: "",
            committed_date: "",
            title: "",
        };
        setSortSign(signObject);
        setLastSorted("")
    };

    // For when we get first and last date, we need everything in the middle too
    function getDatesInRange(startDate: Date, endDate: Date) {
        const date = new Date(startDate.getTime());

        date.setDate(date.getDate());
        const dates = [];
        while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    // To sort and add symbol to the table header
    const sortTable = (value: string) => {
        let sortData;
        let signObject: { [key: string]: string } = {
            author_name: "",
            committed_date: "",
            title: "",
        };
        if (lastSorted != value) { // ascending, aka A->Z or 0->9
            sortData = (searchedResultData || defaultValue).sort(function (a: any, b: any) {
                a = a[value].toLowerCase();
                b = b[value].toLowerCase();
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            })
            setLastSorted(value);
            signObject[value] = "↓";
            setSortSign(signObject);
        } else { // descending, aka Z->A or 9->0
            sortData = (searchedResultData || defaultValue).sort(function (a: any, b: any) {
                a = a[value].toLowerCase();
                b = b[value].toLowerCase();
                return (a < b) ? 1 : (a > b) ? -1 : 0;
            })
            setLastSorted(""); // Reset value
            signObject[value] = "↑";
            setSortSign(signObject);
        }
        setSearchedResultData(sortData);
        jsonToTable();
    };

    // Convert json to table format
    function jsonToTable() {
        const list = searchedResultData.map((item: any) => (
            <tr key={item.id}>
                <td>{item.committer_name}</td>
                <td>{item.committed_date}</td>
                <td>{item.title}</td>
            </tr>
        ));
        return list;
    }

    async function repoDataURL() {
        //Get repo data about github user
        const api: string = ".no/api/v4/projects/";
        let urlArray: Array<string> = url.split(".no/");


        let dates: Array<Date> = [];
        let datesText: Array<string> = [];
        let labelsCommit: Array<string> = [];

        let users = new Map<string, number>();
        let values: number[] = [];
        let labelsUsers: string[] = [];
        await fetch(urlArray[0] + api + urlArray[1].replaceAll("/", "%2F") + "/repository/commits?private_token=" + token + "&per_page=100")
            .then((res) => res.json())
            .then(
                (result) => {
                    // For table
                    setDefaultResultData(result); // Need this as a constant for result, instead of fetching many times
                    setSearchedResultData(result); // Need this as something I can change many times.
                    jsonToTable();

                    // For graphs commit
                    result.map((item: any) => (
                        dates.push(new Date(item.committed_date))
                    ));
                    dates.sort((a: any, b: any) => a - b); // Old to new
                    let labelsDates: Array<Date> = getDatesInRange(dates[0], dates[dates.length - 1]); // Every date in range between start and end
                    for (let i = 0; i < labelsDates.length; i++) { // Convert to string
                        labelsCommit
                            .push(labelsDates[i].toString().slice(0, 15));
                    }
                    for (let i = 0; i < dates.length; i++) { // Convert to string
                        datesText.push(dates[i].toString().slice(0, 15));
                    }

                    const counts: { [key: string]: number } = {}; // Here we count number of commits per day
                    for (const num of datesText) {
                        counts[num] = counts[num] ? counts[num] + 1 : 1;
                    }

                    let dataCommits: Array<number> = new Array(labelsCommit.length).fill(0); // Make and array with zeros per label
                    for (let i = 0; i < labelsCommit.length; i++) { // For each label we fill in the correct amount of commits per day
                        dataCommits[i] = counts[labelsCommit[i]] || 0;
                    }

                    const dataObjectCommits: object = {
                        labels: labelsCommit,
                        dataValues: dataCommits
                    };
                    setDataCommits(dataObjectCommits);

                    // For graphs users
                    result.forEach((item: any) => { // Count up all commits per user
                        var name = item.committer_name;
                        if (users.has(name)) {
                            users.set(name, users.get(name)! + 1);
                        } else {
                            users.set(name, 1);
                        }
                    }
                    );
                    users.forEach((value, key) => { // 
                        values.push(value);
                        labelsUsers.push(key);
                    });

                    const dataObjectUsers: object = {
                        labels: labelsUsers,
                        dataValues: values
                    };
                    setDataUsers(dataObjectUsers);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    if (Object.keys(dataCommits).length === 0) { // Check if we have fetched yet
        return (
            <div className="Commits">
                <h1>Visualisering/presentasjon av GITLAB data</h1>
                <p>Loading...</p>
            </div>
        )
    } else {
        let visuals: any;
        if (presentation == "graph") {
            visuals = (
                <div className="graphs" >
                    < VerticalBar data={dataCommits} title='Number of commits each day' />
                    < VerticalBar data={dataUsers} title='Number of commits per user' />
                </div >
            );
        } else if (presentation == "table") {
            visuals = (
                <div className="table">
                    <input type="text" name="token" placeholder="Søk i commit message" onChange={updateSearch} /><br />
                    <table className="tableCommits">
                        <tbody>
                            <tr key="header">
                                <th onClick={() => sortTable('author_name')}>Name {sortSign.author_name}</th>
                                <th onClick={() => sortTable('committed_date')}>Date {sortSign.committed_date}</th>
                                <th onClick={() => sortTable('title')}>Commit Message {sortSign.title}</th>
                            </tr>
                            {jsonToTable()}
                        </tbody>
                    </table >
                </div>
            );
        } else {
            visuals = <div></div>
        }
        return (
            <div className="Commits">
                <h1>Visualisering/presentasjon av GITLAB data</h1>
                <p>Nå ser du på prosjektet med URL: {url}. Du kan visualisere dataen som grafer eller tabell. Tabellen kan sorteres ved å trykke på overskriftene i tabellen.</p>
                <select id="lang" onChange={changePresentation} value={presentation}>
                    <option value="graph">Show graph</option>
                    <option value="table">Show table</option>
                </select>
                {visuals}
            </div>
        );
    }
}

export default Commits;
