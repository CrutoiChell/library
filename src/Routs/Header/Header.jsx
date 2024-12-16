import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { logout } from "../Profile/ProfileSlice";
import { Footer } from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import Logo from '../../assets/Logo.svg';
import Tv from '../../assets/tv.jpeg';
import Robot from '../../assets/robot.png';
import defaultAvatar from '../../assets/defaultAvatar.png';
import s from "./Header.module.scss";

export function Header() {
  let { loggedInUser, isAuth } = useSelector(state => state.profile);
  let select = useSelector(state => state.catalog);
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let [windowInfo, setWindowInfo] = useState(window.innerWidth);
  let [searchQuery, setSearchQuery] = useState("");

  
  let avatars = [
    { name: 'defaultAvatar', image: defaultAvatar },
    { name: 'Robot', image: Robot },
    { name: 'Tv', image: Tv }
  ];
  let navigate = useNavigate()

  let avatar
  if (isAuth == true) {
    avatar = avatars.find(item => loggedInUser.avatar.name == item.name)
  }
  let disp = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => setWindowInfo(window.innerWidth));
    return () => window.removeEventListener('resize', () => setWindowInfo(window.innerWidth));
  }, []);

  function handleLogOut() {
    disp(logout())
    setIsMenuOpen(false)
  }

  function handleSearchSubmit(event) {
    if (event.key === 'Enter') {
      let foundBook = select.find(item =>
        item.title === searchQuery
      );
      console.log(foundBook);
      
      if (foundBook) {
        navigate(`/${foundBook.title}`);
      } else {
        console.log('Книга не найдена');
      }
    }
  }
  

  return (
    <>
      <header className={s.header}>
        <img src={Logo} alt="logo" className={s.logo} />

        {windowInfo <= 768 ? (
          <>
            <input
              className={s.inp}
              type="text"
              placeholder="Найти книгу"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
            <div
              className={`${s.burger} ${isMenuOpen ? s.open : ''}`}
              onClick={() => setIsMenuOpen(prevState => !prevState)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={`${s.menu} ${isMenuOpen ? s.open : ''}`}>
              <NavLink to='/catalog' className={({ isActive }) => isActive ? s.active : s.headerText} onClick={() => setIsMenuOpen(prevState => !prevState)}>
                Каталог
              </NavLink>
              {isAuth ? (
                <>
                  <NavLink to='/' onClick={handleLogOut} className={({ isActive }) => isActive ? s.active : s.headerText}>
                    Выход
                  </NavLink>
                  <Link to='/profile' onClick={() => setIsMenuOpen(prevState => !prevState)}>
                    <img src={avatar.image} alt="avatar" className={s.avatar} />
                  </Link>
                </>
              ) : (
                <>
                  <NavLink to='/login' className={({ isActive }) => isActive ? s.active : s.headerText} onClick={() => setIsMenuOpen(prevState => !prevState)}>
                    Вход
                  </NavLink>
                  <NavLink to='/registration' className={({ isActive }) => isActive ? s.active : s.headerText} onClick={() => setIsMenuOpen(prevState => !prevState)}>
                    Регистрация
                  </NavLink>
                </>
              )}
            </div>
          </>
        ) : (
          <div className={s.right}>
            <NavLink to='/catalog' className={({ isActive }) => isActive ? s.active : s.headerText}>
              Каталог
            </NavLink>
            <input
              className={s.inp}
              type="text"
              placeholder="Найти книгу"
              onChange={e => setSearchQuery(e.target.value)}
              value={searchQuery}
              onKeyDown={handleSearchSubmit}
            />
            {isAuth ? (
              <>
                <NavLink to='/' onClick={() => disp(logout())} className={({ isActive }) => isActive ? s.active : s.headerText}>
                  Выход
                </NavLink>
                <Link to='/profile'>
                  <img src={avatar.image} alt="avatar" className={s.avatar} />
                </Link>
              </>
            ) : (
              <>
                <NavLink to='/login' className={({ isActive }) => isActive ? s.active : s.headerText}>
                  Вход
                </NavLink>
                <NavLink to='/registration' className={({ isActive }) => isActive ? s.active : s.headerText}>
                  Регистрация
                </NavLink>
              </>
            )}
          </div>
        )}
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
