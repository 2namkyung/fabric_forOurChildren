import { useEffect } from "react";
import { useState } from "react"

export default function Info() {

    const [result, setResult] = useState([{}]);
    const [view, setView] = useState([]);
    const [info, setInfo] = useState({});

    const url = window.location.pathname;
    const name = url.substr(url.lastIndexOf('/') + 1);

    useEffect(() => {
        fetch("http://localhost:4000/getTransaction/" +name, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                const count = jsonData.length > 6 ? 7 : jsonData.length;
                for (let i = 0; i < count; i++) {
                    const obj = JSON.parse(jsonData[i].Value);
                    setResult(obj);
                    view.push(
                        <tr key={i}>
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
                                {obj.time}
                            </td>
                        </tr>
                    )
                }
            });
        setView(view);
    }, [view, name]);

    useEffect(() => {
        fetch("http://localhost:4000/childInfo/" + name, {
            method:"GET",
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then((jsonData) => {
            setInfo(jsonData);
            console.log(info);
        })
    }, [info, name])

    return (
        <div className="inner">
            <div className="info">
                <h1>User Profile</h1>
                <div className="profile">
                    <div className="profile__pic">
                        <img src="/img/gopher.png" alt="store1" />
                        <div className="profile__desc">
                            <div><span>NAME</span><span>{info.name}</span></div>
                            <div><span>AGE</span><span>{info.age} Years</span></div>
                            <div><span>COIN</span><span>30000</span></div>
                            <div><span>LOCATION</span><span>{info.location}</span></div>
                        </div>
                    </div>

                    <div className="profile__body">
                        <div className="body__header">
                            <span>ABOUT ME</span>
                        </div>
                        <div className="body__content">
                            <div className="content__line">
                                <span>NAME</span><span>{info.name}</span><span>AGE</span><span>{info.age} YEARS</span>
                            </div>
                            <div className="content__line">
                                <span>COIN</span><span>3000000</span><span>PHONE</span><span>{info.phone}</span>
                            </div>
                            <div className="content__line">
                                <span>LOCATION</span><span>{info.location}</span><span>EXPIRATION</span><span className="expiration">{info.expiration}</span>
                            </div>
                        </div>
                        <div className="body__tx">
                            <div className="tx__header">
                                <span>Transaction</span>
                                <button className="tx__more">자세히 보기</button>
                            </div>
                            <div className="tx__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>받은 사람</th>
                                            <th>보낸 금액</th>
                                            <th>보낸 사람</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {view}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}