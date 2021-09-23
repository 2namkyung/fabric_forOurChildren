import { useState, useEffect } from "react";
import Pagination from "../../js/Pagination";

export default function Blocks() {

    const [results, setResult] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        fetch("http://localhost:4000/blocks", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                setResult(jsonData)
            })
    }, []);

    // console.log(results);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = results.slice(indexOfFirst, indexOfLast);

    return (
        <>
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
                    {currentPosts.map((result) => (
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
            <Pagination postsPerPage={postsPerPage} totalPosts={results.length} paginate={setCurrentPage}/>
        </>
    )
}