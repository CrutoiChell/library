import s from "./Footer.module.scss"
import vk from '../../assets/vk.svg'
import odnoklassniki from '../../assets/odnoklassniki.svg'
export function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.content}>
                <div className={s.left}>
                    <h3 className={s.helpTitle}>Тех поддержка</h3>
                    <input className={s.formInput} type="text" placeholder="Опишите свою проблему..." />
                    <input className={s.formInput} type="text" placeholder="Напишите номер телефона..." />
                    <button className={s.sendButton}>Отправить</button>
                </div>
                <div className={s.right}>
                    <div className={s.aboutUs}>
                        <h3 className={s.contentTitle}>О нас</h3>
                        <p className={s.text}>eReader - Электронная библиотека с разнообразным выбором книг и материалов для чтения в любое время и в любом месте.</p>
                    </div>
                    <div className={s.socials}>
                        <h3 className={s.contentTitle}>Социальные сети</h3>
                        <div className={s.links}>
                            <a href="https://vk.com">
                                <img src={vk} alt="VK" />
                            </a>
                            <a href="https://ok.ru/">
                                <img src={odnoklassniki} alt="Odnoklassniki" />
                            </a>
                        </div>
                    </div>
                    <div className={s.contacts}>
                        <h3 className={s.contentTitle}>Контакты</h3>
                        <p className={s.textContacts}>8 800 777 33 33</p>
                        <p className={s.textContacts}>eReader@gmail.com</p>
                    </div>
                </div>
            </div>
            <p className={s.rights}>&copy; {new Date().getFullYear()} eReader. Все права защищены.</p>
        </footer>
    )
};

