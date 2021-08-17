import { useState, useEffect } from "react";

export default function Tx(){

    const [results, setResult] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/txs", {
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
                    <th className="tx__num">BlockID</th>
                    <th>CCName</th>
                    <th>Status</th>
                    <th>CreatedAt</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result) => (
                    <tr key={result.tx_blockID}>
                        <td >
                            {result.tx_blockID}
                        </td>
                        <td>
                            {result.tx_ccName}
                        </td>
                        <td>
                            {result.tx_status}
                        </td>
                        <td>
                            {result.tx_createdat}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}