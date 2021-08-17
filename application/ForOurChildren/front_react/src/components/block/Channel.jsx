import { useState, useEffect } from "react";

export default function Channel(){

    const [results, setResult] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/channel", {
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
                    <th className="channel__id">ID</th>
                    <th>Name</th>
                    <th>Blocks</th>
                    <th>CreatedAt</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result) => (
                    <tr key={result.network_id}>
                        <td >
                            {result.network_id}
                        </td>
                        <td>
                            {result.network_name}
                        </td>
                        <td>
                            {result.network_blocks}
                        </td>
                        <td>
                            {result.network_createdat}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}