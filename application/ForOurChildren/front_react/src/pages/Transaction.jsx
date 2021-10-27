import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Pagination from '../js/Pagination';

export default function Transaction() {
    const [results, setResult] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        fetch("http://localhost:4000/" + window.location.pathname, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                setResult(jsonData);
            });
    }, []);


    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = results.slice(indexOfFirst, indexOfLast);

    console.log(currentPosts);

    return (
        <>
            <div className="inner">
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>Tx</th>
                                <th>받은 사람</th>
                                <th>보낸 금액</th>
                                <th>보낸 사람</th>
                                <th>현재 잔액</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((result, index) => {
                                const obj = JSON.parse(result.Value);
                                if (obj.receiver === undefined) {
                                    const url = window.location.pathname;
                                    const name = url.substr(url.lastIndexOf('/')+1);
                                    const names = name.split("%20");
                                    if(names[1]===undefined){
                                        obj.receiver = names[0];
                                    }else{
                                        obj.receiver = names[0] + " " + names[1];
                                    }
                                    obj.sender = "지원센터";
                                    obj.amount = obj.coin;
                                    obj.time = "최초지급일";
                                }
                                return (
                                    <tr>
                                        <td className="TxID">
                                            {result.TxId}
                                        </td>
                                        <td>
                                            {obj.receiver}
                                        </td>
                                        <td>
                                            {obj.amount}
                                        </td>
                                        <td>
                                            {obj.sender}
                                        </td>
                                        <td>
                                            {obj.coin}
                                        </td>
                                        <td>
                                            {obj.time}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination postsPerPage={postsPerPage} totalPosts={results.length} paginate={setCurrentPage}/>
                </div>
            </div>
        </>
    )
}
