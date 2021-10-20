import { useState } from 'react';
import Modal from 'react-modal';
import ClearIcon from '@material-ui/icons/Clear';

Modal.setAppElement('#root');

export default function Signup({ history }) {

    const [IsOpen, setIsOpen] = useState(true);
    const [name, setName] = useState("");
    const [age , setAge] = useState();
    const [password, setPassword] = useState("");
    const [password_check, setPasswordCheck] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");

    const NameHandler = (event) =>{
        setName(event.currentTarget.value);
    }

    const AgeHandler = (event) =>{
        setAge(Number(event.currentTarget.value));
    }

    const PasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const PasswordCheckHandler = (event) =>{
        setPasswordCheck(event.currentTarget.value)
    }

    const LocationHandler = (event) =>{
        setLocation(event.currentTarget.value);
    }

    const PhoneHandler = (event) =>{
        setPhone(event.currentTarget.value);
    }

   function passwordCheck(){
       if(password===password_check){
           return true;
       }
       return false;
   }

    const SendUserInfo = (event) =>{
        // prevent refresh page
        event.preventDefault();

        const check = passwordCheck();
        if (!check){
            alert("비밀번호를 확인해주세요");
            setPassword("");
            setPasswordCheck("");
            return;
        }

        let body = {
            name,
            password,
            location,
            phone,
            age
        }
        
        fetch("http://localhost:4000/signup", {
            method: "POST",
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(console.log(body))
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.statusCode===3){
                alert(name + "님 회원가입을 축하합니다!!");
                history.push('/');
            }else{
                alert("사용자 정보를 확인하고 다시 시도해주세요");
            }
        })
    }

    return (
        <Modal isOpen={IsOpen}
            className="Modal__signup"
            overlayClassName="Overlay">
            <div className="signup__header">
                <h2>ForOurChildren</h2>
                <ClearIcon className="close__button" onClick={closeModal} />
            </div>
            <div className="signup__body">
                <h1>회원가입</h1>
                <form onSubmit={SendUserInfo}>
                    <h3 className="name">이름</h3>
                    <input className="signup__id" value={name} onChange={NameHandler}></input>
                    <h3 className="pw">비밀번호</h3>
                    <input className="signup__pw" value={password} onChange={PasswordHandler} type='password'></input>
                    <h3 className="pw__check">비밀번호 확인</h3>
                    <input className="signup__pw__check" value={password_check} onChange={PasswordCheckHandler} type='password'></input>
                    <h3 className="location">지역</h3>
                    <input className="signup__location" value={location} onChange={LocationHandler}></input>
                    <h3 className="phone">핸드폰번호</h3>
                    <input className="signup__phone" value={phone} onChange={PhoneHandler}></input>
                    <h3 className="age">나이</h3>
                    <input className="signup__age" value={age} onChange={AgeHandler}></input>
                    <button type='submit' className="signup__button">회원가입하기</button>
                </form>
            </div>   
        </Modal>
    )

    function closeModal() {
        setIsOpen(false);
        history.push('/');
    }
}