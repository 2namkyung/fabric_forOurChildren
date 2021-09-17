import { useState } from 'react';
import {useCookies} from 'react-cookie';
import axios from 'axios';

export default function Transfer({history}) {

    const [cookies] = useCookies();

    const [receiver, setReceiver] = useState("");
    const [coin, setCoin] = useState("");

    const ReceiverHandler = (event) =>{
        setReceiver(event.currentTarget.value);
    }

    const CoinHandler = (event) =>{
        setCoin(event.currentTarget.value);
    }

    const TransferCoin = () =>{

        let body = {
            sender:cookies.name,
            receiver,
            coin
        }

        axios.post("http://localhost:4000/transfer", JSON.stringify(body),{
            headers: {'Content-Type':'application/json',
            'Authorization': `${cookies.access_token}`},
            credential:true
        })
        .then(response=>{
            console.log(response);
            alert("송금 완료!!");
            history.push('/');
        })
        .catch(()=>{
            alert("시스템 에러!! 관리자에게 문의하세요");
            history.push('/');
        });
    }

    return (
        <div className="inner">
            <div className="transfer">
                <div className="transfer__form">
                    <div className="transfer__header">
                        Transfer
                    </div>
                    <div className="transfer__body">
                        <div className="transfer__input">
                            <h3>Sender</h3>
                            {cookies.name}
                        </div>
                        <div className="transfer__input">
                            <h3>Receiver</h3>
                            <input className="receiver" value={receiver} onChange={ReceiverHandler}/>
                        </div>
                        <div className="transfer__input">
                            <h3>Amount</h3>
                            <input className="amount" value={coin} onChange={CoinHandler}/>
                        </div>
                        <div>
                            <button className="transfer__button" onClick={TransferCoin}>송금하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}