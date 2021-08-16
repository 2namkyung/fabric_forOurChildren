import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Explorer() {

    const [results, setResult] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:4000/blocks", {
            method:"GET",
            headers: {'Content-Type' : 'application/json' }
        })
        .then((response) => response.json())
        .then((jsonData) => {
            setResult(jsonData)
        })
    }, []);

    console.log(results);

    return (
        <div className="inner">
            <div className="explorer">
                    <table>
                        <thead>
                            <tr>
                                <th className="blocknum">Num</th>
                                <th>PreHash</th>
                                <th>BlockHash</th>
                                <th>CreatedAt</th>
                                <th>Network_Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.block_number}>
                                <td >
                                    {result.block_number}
                                </td>
                                <td className="preHash">
                                    {result.prevblock_hash}
                                </td>
                                <td className="blockHash">
                                    {result.block_hash}
                                </td>
                                <td>
                                    {result.created_at}
                                </td>
                                <td>
                                    {result.network_name}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}