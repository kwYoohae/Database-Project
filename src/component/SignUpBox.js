import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const SignUpBox = () => {

    const [user_id, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [age, setAge] = useState(undefined);
    const [nickname, setName] = useState("");
    const [duplicatedId, setDuplicatedId] = useState(false);
    const [duplicatedName, setDuplicatedName] = useState(false);

    const navigate = useNavigate();

    const onChangeId = (e) => {
        setUserId(e.currentTarget.value);
        console.log("id : " + user_id);
    }

    const onChangePassword = (e) => {
        setPassword(e.currentTarget.value);
        console.log("password : " + password);
    }

    const onChangeNickname = (e) => {
        setName(e.currentTarget.value);
        console.log("nickname : " + nickname);
    }

    const onChangeAge = (e) => {
        setAge(e.currentTarget.value);
        console.log("Age : " , age);
    }

    const onChangeConfirm = (e) => {
        setPasswordConfirm(e.currentTarget.value);
        console.log("PasswordConfirm : " + passwordConfirm);
    }

    const onClickDuplicateId = (e) => {
        if(user_id.trim() == "") {
            alert("아이디를 입력하셔야합니다.");
            return;
        }

        const data = {
            user_id: user_id
        }

        axios.post("http://localhost:3001/check-id-duplicate", data)
            .then((res) => {
                if(res.data.duplicated === false) {
                    alert("아이디가 중복이 됩니다.");
                } else {
                    setDuplicatedId(true);
                    alert("중복되지 않은 아이디 입니다.");
                }
            });
    }

    const onClickDuplicateName = (e) => {
        if(nickname.trim() == "") {
            alert("아이디를 입력하셔야합니다.");
            return;
        }

        const data = {
            nickname: nickname
        };

        axios.post("http://localhost:3001/check-nickname-duplicate", data)
            .then((res) => {
                if(res.data.duplicated === false) {
                    alert("닉네임이 중복이 됩니다.");
                } else {
                    setDuplicatedId(true);
                    alert("중복되지 않은 닉네임 입니다.");
                }
            });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(!duplicatedId) {
            alert("아이디 중복확인을 안하셨습니다!");
            return;
        }

        if(!duplicatedName) {
            alert("닉네임 중복확인을 안하셨습니다!");
            return;
        }

        if(user_id.trim() == "") {
            alert("아이디를 입력하셔야합니다.");
            return;
        }

        if(nickname.trim() == "") {
            alert("닉네임을 입력하셔야합니다.");
            return;
        }

        if(password.trim() == "") {
            alert("비밀번호를 입력하셔야합니다.");
            return;
        }

        if(age === undefined) {
            alert("나이를 입력하셔야합니다.");
            return;
        }


        if(password !== passwordConfirm) {
            alert("비밀번호 확인의 값을 제대로 입력하지 않으셨습니다.");
            return;
        }

        let user = {
            user_id: user_id,
            password: password,
            age: age,
            nickname: nickname
        };

        axios.post("http://localhost:3001/sign-up", user)
            .then((res) => {
                console.log(res.data.isSuccess);
                if(!res.data.isSuccess) {
                    navigate('/sign-up');
                } else {
                    navigate('/login');
                }
            });
    }

    return (
        <div className="shadow-2xl" style={{width: "800px", height: "558px"}}>
            <div className="flex flex-col">
                <span className={"font-bold text-center mt-8 text-xl"}>회원가입</span>
                <div className={"flex flex-col mx-auto mt-2"}>
                    <label className={"m-1"}>아이디</label>
                    <div className={"flex flex-row"}>
                        <input name="user_id" onChange={onChangeId} value={user_id}
                               placeholder="아이디를 입력해주세요" className={"w-80 border py-2 pl-2 rounded-xl drop-shadow-lg"}/>
                        <button type="submit" onClick={onClickDuplicateId}
                                className={"mx-2 bg-emerald-500 py-2 px-2 text-sm text-white rounded-2xl mx-auto drop-shadow-lg"}>아이디 중복확인</button>
                    </div>
                </div>
                <div className={"flex flex-col mx-auto mt-2"}>
                    <label className={"m-1"}>닉네임</label>
                    <div className={"flex flex-row"}>
                        <input name="nickname" onChange={onChangeNickname} value={nickname}
                               placeholder="닉네임을 입력해주세요" className={"w-80 border py-2 pl-2 rounded-xl drop-shadow-lg"}/>
                        <button type="submit" onClick={onClickDuplicateName}
                                className={"mx-2 bg-emerald-500 py-2 px-2 text-sm text-white rounded-2xl mx-auto drop-shadow-lg"}>닉네임 중복확인</button>
                    </div>
                </div>
                <div className={"flex flex-col mx-auto mt-2"}>
                    <label className={"m-1"}>비밀번호</label>
                    <input name="password" onChange={onChangePassword} value={password} type="password"
                           placeholder="비밀번호를 입력해주세요" className={"w-80 border py-2 pl-2 mr-32 rounded-xl drop-shadow-lg"}/>
                </div>
                <div className={"flex flex-col mx-auto mt-2"}>
                    <label className={"m-1"}>비밀번호확인</label>
                    <input name="password" onChange={onChangeConfirm} value={passwordConfirm} type="password"
                           placeholder="비밀번호를 한번 더 입력해주세요" className={"w-80 border py-2 pl-2 mr-32 rounded-xl drop-shadow-lg"}/>
                </div>
                <div className={"flex flex-col mx-auto mt-2"}>
                    <label className={"m-1"}>나이</label>
                    <input name="age" onChange={onChangeAge} value={age} type="number"
                           placeholder="나이를 입력해주세요" className={"w-80 border py-2 pl-2 mr-32 rounded-xl drop-shadow-lg"}/>
                </div>
                <button type="submit" onClick={onSubmitHandler}
                        className={"mt-5 bg-emerald-500 w-28 py-2 text-white rounded-2xl mx-auto drop-shadow-lg"}>회원가입</button>
            </div>
        </div>
    )
}

export default SignUpBox;