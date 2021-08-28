import { useEffect } from "react";
import { useState } from "react"

export default function Info() {

    const [result, setResult] = useState([{}]);
    const [view, setView] = useState([]);

    useEffect(()=>{
        const url = window.location.pathname;
        fetch("http://localhost:4000/getTransaction/" + url.substr(url.lastIndexOf('/') + 1), {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                for(let i=0; i<7; i++){
                    const obj = JSON.parse(jsonData[i].Value);
                    setResult(obj);
                    view.push(
                        <tr key={i}>
                            <td>
                                {obj.receiver}
                            </td>
                            <td>
                                {obj.coin}
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
    }, [view]);

    return (
        <div className="inner">
            <div className="info">
                <h1>User Profile</h1>
                <div className="profile">
                    <div className="profile__pic">
                        <img src="/img/gopher.png" alt="store1" />
                        <div className="profile__desc">
                            <div><span>NAME</span><span>namkyung</span></div>
                            <div><span>AGE</span><span>26 Years</span></div>
                            <div><span>COIN</span><span>30000</span></div>
                            <div><span>LOCATION</span><span>Busan</span></div>
                        </div>
                    </div>

                    <div className="profile__body">
                        <div className="body__header">
                            <span>ABOUT ME</span>
                        </div>
                        <div className="body__content">
                            <div className="content__line">
                                <span>NAME</span><span>namkyung</span><span>AGE</span><span>25 YEARS</span>
                            </div>
                            <div className="content__line">
                                <span>COIN</span><span>3000000</span><span>PHONE</span><span>010-4773-3208</span>
                            </div>
                            <div className="content__line">
                                <span>LOCATION</span><span>BUSAN</span><span>EXPIRATION</span><span>2022-07-14</span>
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