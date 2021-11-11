import { useState, useEffect } from "react";
import Pagination from "../../js/Pagination";

export default function Tx() {

    const [results, setResult] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

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

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = results.slice(indexOfFirst, indexOfLast);

    // console.log(results);

    return (
        <>
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
                    {currentPosts.map((result) => (
                        <tr>
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
            <Pagination postsPerPage={postsPerPage} totalPosts={results.length} paginate={setCurrentPage} />
        </>
    )
}