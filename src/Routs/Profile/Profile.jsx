import { useSelector } from "react-redux"
import { useState } from "react";
import { Book } from "../../Components/Book/Book";
import Tv from '../../assets/tv.jpeg';
import Robot from '../../assets/robot.png';
import defaultAvatar from '../../assets/defaultAvatar.png';
import s from './Profile.module.scss'
export function Profile() {
  let select = useSelector(state => state.profile)
  let findUser = select.profiles.find(item =>
    item.email === select.loggedInUser.email && item.password === select.loggedInUser.password
  );
  console.log(findUser.books);


  let avatars = [
    { name: 'defaultAvatar', image: defaultAvatar },
    { name: 'Robot', image: Robot },
    { name: 'Tv', image: Tv }
  ];

  let avatar
  if (select.isAuth == true) {
    avatar = avatars.find(item => select.loggedInUser.avatar.name == item.name)
  }

  let daysDiff = Math.floor((Date.now() - new Date(select.loggedInUser.createAccountDate.year, select.loggedInUser.createAccountDate.mounth - 1, select.loggedInUser.createAccountDate.day)) / 86400000);
  let createDate = new Date(select.loggedInUser.createAccountDate.year, select.loggedInUser.createAccountDate.mounth - 1, select.loggedInUser.createAccountDate.day);
  let format = new Intl.DateTimeFormat('ru', { month: 'long' });

  let [toggle, setToggle] = useState(true)

  return (
    <section className={s.Profile}>
      <img src={avatar.image} alt="avatar" className={s.avatar} />
      <h3 className={s.nick}>{select.loggedInUser.nickname}</h3>
      <div>
        <div className={s.toggleContainer}>
          <button className={toggle ? `${s.toggleBtn} ${s.AtoggleBtn}` : s.toggleBtn} onClick={() => setToggle(true)}>Профиль</button>
          <button className={toggle ? s.toggleBtn : `${s.toggleBtn} ${s.AtoggleBtn}`} onClick={() => setToggle(false)}>Закладки</button>
        </div>
        {
          toggle ?
            <div>
              <p className={s.text}>Почта: {select.loggedInUser.email}</p>
              <p className={s.text}>{`На сайте с ${String(select.loggedInUser.createAccountDate.day).padStart(2, '0')} ${format.format(createDate)} ${new Date().getFullYear()} (${daysDiff} дней)`}</p>
            </div> :
            <>
              <div className={s.bookmarks}>
                {findUser.books.length === 0 ? (
                  <p className={s.text}>У вас ещё нет книг в закладках</p>
                ) : (
                  findUser.books.map(item => {
                    return (
                      <Book
                        key={item.id}
                        img={item.img}
                        title={item.title}
                        description={item.description}
                      />
                    );
                  })
                )}
              </div>
            </>
        }
      </div>
    </section>
  )
};

