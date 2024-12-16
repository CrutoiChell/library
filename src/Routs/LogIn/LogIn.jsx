import { useDispatch } from "react-redux"
import { logining } from "../Profile/ProfileSlice"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import Logo from '../../assets/Logo.svg'
import s from "./logIn.module.scss"

export function LogIn() {

    let { isAuth } = useSelector((state) => state.profile)
    let textArr = ['Почта', 'Пароль'];
    let fieldNames = ['email', 'password'];
    let [inputs, setInputs] = useState({ nickname: '', email: '', password: '' });
    let disp = useDispatch();

    if (isAuth === true) {
        return <Navigate to={'/catalog'} />;
    }

    function handleWrite(e, field) {
        setInputs({ ...inputs, [field]: e.target.value });
    }

    return (
        <section className={s.section}>
            <img src={Logo} alt="" />
            <h3 className={s.avtorizationTitle}>Авторизация на сайте</h3>
            <div className={s.form}>
                {textArr.map((item, index) => {
                    return (
                        <div key={index} className={s.inputField}>
                            <input 
                                type="text" 
                                placeholder={item} 
                                onChange={e => handleWrite(e, fieldNames[index])} 
                            />
                        </div>
                    );
                })}
                <button className={s.button} onClick={() => disp(logining(inputs))}>Войти</button>
            </div>
        </section>
    )
};
