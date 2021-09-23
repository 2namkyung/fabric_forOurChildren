import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Transaction() {
    const [results, setResult] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/" + window.location.pathname, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => setResult(jsonData))
    }, []);

    const resultList = () => {
        const result = [];
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].Value);
            const obj = JSON.parse(results[i].Value);
            if (obj.receiver === undefined) {
                const url = window.location.pathname;
                const name = url.substr(url.lastIndexOf('/') + 1);
                obj.receiver = name;
                obj.sender = "지원센터"
                obj.amount = obj.coin;
                obj.time = "최초지급일";
            }
            result.push(
                <tr key={i}>
                    <td>
                        {i + 1}
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
        }
        return result;
    }

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
                                <th>현재 잔액</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultList()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
