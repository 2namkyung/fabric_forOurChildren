import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Qrcode() {

    const [img, setImg] = useState([]);
    const url = window.location.pathname;
    const name = url.substr(url.lastIndexOf('/') + 1);

    useEffect(() => {
        axios.get("http://localhost:4000/qrcode/" + name,
            { responseType: 'blob' }
        ).then(response => {
            setImg(response.data);
        });
    }, []);



    return (
        <>
            <div className="inner">
                <div className="info">
                    <div className="info__header">
                        <div className="inner">
                            <img src={img} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}