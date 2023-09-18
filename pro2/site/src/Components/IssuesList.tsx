import { IssuesContext } from "./Issues";
import './IssuesList.css';

function valueToTable(values: any) { // Converts object to two tables
    var openList;
    if (values.open.length == 0) {
        openList = (
            <tr key="1">
                <td>No open issues.</td>
            </tr>
        )
    } else {
        openList = values.open.map((item: any) => (
            <tr key={item.id}>
                <td>#{item.id}: {item.title}</td>
            </tr>
        ));
    }

    var closedList;
    if (values.closed.length == 0) {
        closedList = (
            <tr key="1">
                <td>No closed issues.</td>
            </tr>
        )
    } else {
        closedList = values.closed.map((item: any) => (
            <tr key={item.id}>
                <td>#{item.id}: {item.title}</td>
            </tr>
        ));
    }
    return (
        <div className="IssuesList">
            <table className="openIssues tableIssues">
                <tbody>
                    <tr key="header">
                        <th>Open</th>
                    </tr>
                    {openList}
                </tbody>
            </table>
            <table className="closedIssues tableIssues">
                <tbody>
                    <tr key="header">
                        <th>Closed</th>
                    </tr>
                    {closedList}
                </tbody>
            </table>
        </div>
    );
}

export default function IssuesList() {
    return (
        // Here we get the data
        <IssuesContext.Consumer>
            {value => valueToTable(value)}
        </IssuesContext.Consumer>

    )
}