import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ClearIcon from '@material-ui/icons/Clear';
import useIsLoginActions from '../hooks/useIsLoginActions';
import axios from 'axios';
import { useCookies } from 'react-cookie';

Modal.setAppElement('#root');
axios.defaults.withCredentials = true;

export default function Login({ history }) {

    const [ cookies, setCookie ] = useCookies();
    const [IsOpen, setIsOpen] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { LoginStatus } = useIsLoginActions();

    const EmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const PasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const SendUserInfo = (event) => {
        // prevent refresh page
        event.preventDefault();

        let body = {
            email,
            password,
        }

        axios.post("http://localhost:4000/login",JSON.stringify(body),{
            header: {'Content-Type':'application/json'},
            credential: true
        })
        .then(response => {
            axios.defaults.headers.common['Authorization'] = response.data.access_token;
            if(response.data.login_status){
                var expires = new Date();
                expires.setMinutes(expires.getMinutes()+60);
                console.log(expires);
                setCookie('access_token', response.data.access_token, {
                    expires,
                });
                setCookie('name', email,{
                    expires,
                });
                LoginStatus(true);
                history.push('/');
                window.location.reload();
            }else{
                alert('이메일과 비밀번호를 확인해주세요');
            }
            
        })
    }

    return (
        <Modal isOpen={IsOpen}
            className="Modal"
            overlayClassName="Overlay">
            <div className="login__header">
                <h2>ForOurChildren</h2>
                <ClearIcon className="close__button" onClick={closeModal} />
            </div>
            <div className="login__body">
                <h1>로그인</h1>
                <form onSubmit={SendUserInfo}>
                    <h3 className="email">이메일</h3>
                    <input className="login__id" value={email} onChange={EmailHandler}></input>
                    <h3 className="pw">비밀번호</h3>
                    <input className="login__pw" value={password} onChange={PasswordHandler} type='password'></input>
                    <button type='submit' className="login__button">로그인</button>
                </form>
                <Link to="/signup" className="signUp">회원가입</Link>
                <div className="oAuth__button">
                    <button className="button__google">구글 로그인</button>
                    <button className="button__facebook">페이스북 로그인</button>
                </div>
            </div>
        </Modal>
    )

    function closeModal() {
        setIsOpen(false);
        history.push('/');
    }
}