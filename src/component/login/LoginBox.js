import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const LoginBox = () => {

    const [user_id, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onChangeId = (e) => {
        setUserId(e.currentTarget.value);
        console.log("id : " + user_id);
    }

    const onChangePassword = (e) => {
        setPassword(e.currentTarget.value);
        console.log("password : " + password);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let user = {
            user_id: user_id,
            password: password
        };

        axios.post(process.env.REACT_APP_BACKEND_SERVER+"/login", user)
            .then((res) => {
                if (res.data.success === false) {
                    alert('아이디와 비밀번호를 다시 확인해주세요');
                } else {
                    sessionStorage.setItem("user",JSON.stringify(res.data.user));
                    navigate('/');
                }
            });
    }

    return (
        <div className="shadow-2xl" style={{width: "526px", height: "384px"}}>
            <form className="flex flex-col" onSubmit={onSubmitHandler}>
                <span className={"font-bold text-center mt-5 text-xl"}>로그인</span>
                <div className={"flex flex-col mx-auto mt-6"}>
                    <label className={"m-1"}>아이디</label>
                    <input name="user_id" onChange={onChangeId} value={user_id}
                           placeholder="아이디를 입력해주세요" className={"w-80 border py-2 pl-2 rounded-xl drop-shadow-lg"}/>
                </div>
                <div className={"flex flex-col mx-auto mt-2"}>
                    <label className={"m-1"}>비밀번호</label>
                    <input name="password" onChange={onChangePassword} value={password} type="password"
                           placeholder="비밀번호를 입력해주세요" className={"w-80 border py-2 pl-2 rounded-xl drop-shadow-lg"}/>
                </div>
                <button type="submit"
                    className={"mt-6 bg-emerald-500 w-28 py-2 text-white rounded-2xl mx-auto drop-shadow-lg"}>로그인</button>
                <div className="text-center mt-4 drop-shadow-lg text-gray-400 text-sm">
                    <span>아이디가 없으신가요? </span>
                    <Link to="/sign-up" className="text-emerald-500">회원가입</Link>
                    <span>으로 바로가기</span>
                </div>
            </form>
        </div>
    )
}

export default LoginBox;