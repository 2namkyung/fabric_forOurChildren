import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Pagination from '../js/Pagination';

export default function TransactionAll() {

    const [results, setResult] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        fetch("http://localhost:4000/transactionLogAll", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                setResult(jsonData)
            })
    }, []);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = results.slice(indexOfFirst, indexOfLast);

    return (
        <>
            <div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>Tx</th>
                                <th>받은 사람</th>
                                <th>보낸 금액</th>
                                <th>보낸 사람</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((result) =>(
                                <tr key={result.key}>
                                <td>
                                    {result.Key}
                                </td>
                                <td>
                                    {result.TransactionLog.receiver}
                                </td>
                                <td>
                                    {result.TransactionLog.amount}
                                </td>
                                <td>
                                    {result.TransactionLog.sender}
                                </td>
                                <td>
                                    {result.TransactionLog.time}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination postsPerPage={postsPerPage} totalPosts={results.length} paginate={setCurrentPage}/>
                </div>
            </div>
           
        </>
    );
}
