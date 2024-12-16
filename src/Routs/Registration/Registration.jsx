import { useDispatch, useSelector } from "react-redux";
import { registration } from "../Profile/ProfileSlice";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Tv from '../../assets/tv.jpeg'
import Robot from '../../assets/robot.png'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Logo from '../../assets/Logo.svg'
import s from "./Registration.module.scss";

export function Registration() {
  let textArr = ['Ник', 'Почта', 'Пароль'];
  let fieldNames = ['nickname', 'email', 'password'];
  let avatars = [
    { name: 'defaultAvatar', image: defaultAvatar },
    { name: 'Robot', image: Robot },
    { name: 'Tv', image: Tv }
  ];
  let [index, setIndex] = useState(0);
  let [inputs, setInputs] = useState({ nickname: '', email: '', password: '', avatar: { name: 'defaultAvatar', image: defaultAvatar }, createAccountDate: { 'day': new Date().getDate(), 'mounth': new Date().getMonth() + 1, 'year': new Date().getFullYear() }, books: [] });
  let { isAuth } = useSelector((state) => state.profile);
  let disp = useDispatch();

  if (isAuth === true) {
    return <Navigate to={'/catalog'} />;
  }

  let handleWrite = (e, field) => {
    setInputs({ ...inputs, [field]: e.target.value });
  };

  function left() {
    let newIndex = index > 0 ? index - 1 : avatars.length - 1;
    setIndex(newIndex);
    setInputs({ ...inputs, avatar: avatars[newIndex] });
  }

  function right() {
    let newIndex = (index + 1) % avatars.length;
    setIndex(newIndex);
    setInputs({ ...inputs, avatar: avatars[newIndex] });
  }


  return (
    <section className={s.registrationForm}>
      <img src={Logo} alt="" />
      <h3 className={s.registrationTitle}>Регистрация на сайте</h3>
      <div className={s.avatarContainer}>
        <button className={s.avatarButton} onClick={left}>←</button>
        <img className={s.avatar} src={avatars[index].image} alt="" />
        <button className={s.avatarButton} onClick={right}>→</button>
      </div>
      {textArr.map((item, index) => (
        <div key={index} className={s.inputField}>
          <input
            type="text"
            placeholder={item}
            onChange={e => handleWrite(e, fieldNames[index])}
          />
        </div>
      ))}
      <button className={s.button} onClick={() => disp(registration(inputs))}>Регистрация</button>
    </section>
  );
}
