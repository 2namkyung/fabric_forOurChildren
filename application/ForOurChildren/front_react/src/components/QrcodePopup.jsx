import { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function QrcodePopup({ toggle }) {

    const [img, setImg] = useState("");
    const [cookies] = useCookies();
    const name = cookies.name;

    // const fetchQR = () => {
    //     axios.get("http://localhost:4000/qrcode/" + name)
    //         .then(response => {
    //             console.log(response.data);
    //             return (<img src={`data:image/png;base64, ${response.data}`}/>)
    //         });
    // }

    useEffect(()=>{
        axios.get("http://localhost:4000/qrcode/"+name)
            .then(response=>{
                console.log(response.data);
                setImg(response.data);
            })
    })

    return (
        <>
            <div className="inner">
                <div className="info">
                    <div className="profile">
                        <div className="modal">
                            <div className="modal__content">
                                <span className="close" onClick={toggle}>&times;</span>
                                <img src={`data:image/png;base64, ${img}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}