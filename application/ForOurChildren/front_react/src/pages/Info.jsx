import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

export default function Info() {

    const [view, setView] = useState([]);
    const [info, setInfo] = useState({});
    const [coin, setCoin] = useState();
    const [img, setImg] = useState("");

    const [cookies] = useCookies();
    const name = cookies.name;
    console.log(name);

    useEffect(() => {
        fetch("http://localhost:4000/getTransaction/" + name, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                const count = jsonData.length > 6 ? 7 : jsonData.length;
                const obj = JSON.parse(jsonData[0].Value);
                setCoin(obj.coin);
                for (let i = 0; i < count; i++) {
                    const obj = JSON.parse(jsonData[i].Value);
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
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((jsonData) => {
                setInfo(jsonData);
                // console.log(info);
            })
    }, [name]);

    useEffect(() => {
        axios.get("http://localhost:4000/qrcode/" + name)
            .then(response => {
                console.log(response.data);
                setImg(response.data);
            })
    })

    return (
        <div className="inner">
            <div className="info">
                <div className="info__header">
                    <h1>User Profile</h1>
                    <img className="qrcode" alt="QRCODE" src={`data:image/png;base64, ${img}`} />
                </div>
                <div className="profile">
                    <div className="profile__pic">
                        <img src="/img/gopher.png" alt="store1" />
                        <div className="profile__desc">
                            <div><span>NAME</span><span>{info.name}</span></div>
                            <div><span>AGE</span><span>{info.age} Years</span></div>
                            <div><span>COIN</span><span>{coin}</span></div>
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
                                <span>COIN</span><span>{coin}</span><span>PHONE</span><span>{info.phone}</span>
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