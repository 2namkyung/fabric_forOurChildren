import { useState, useEffect } from "react";

export default function Chaincode() {

    const [results, setResult] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/chaincode", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                setResult(jsonData)
            })
    }, []);

    console.log(results);

    return (
        <table>
            <thead>
                <tr>
                    <th className="cc__ID">ID</th>
                    <th>Name</th>
                    <th>Version</th>
                    <th>CreatedAt</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result) => (
                    <tr key={result.cc_id}>
                        <td >
                            {result.cc_id}
                        </td>
                        <td>
                            {result.cc_name}
                        </td>
                        <td>
                            {result.cc_version}
                        </td>
                        <td>
                            {result.cc_createdat}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}