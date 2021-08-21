import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Login() {

    let subtitle;
    const [IsOpen, setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal isOpen={IsOpen}
            className="Modal"
            overlayClassName="Overlay">
            <div className="login__header">
                <h2>ForOurChildren</h2>
            </div>
            <div className="login__body">
                <h1>로그인</h1>
                <h3 className="email">이메일</h3>
                <input className="login__id"></input>
                <h3 className="pw">비밀번호</h3>
                <input className="login__pw"></input>
                <button className="login__button">로그인</button>
                <Link to="/" className="signUp">회원가입</Link>
                <div className="oAuth__button">
                    <button className="button__google">구글 로그인</button>
                    <button className="button__facebook">페이스북 로그인</button>
                </div>
            </div>
        </Modal>
    )
}