import { useSelector } from "react-redux"
import s from "./AboutTitle.module.scss"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Book } from "../../Components/Book/Book";
export function AboutTitle() {
    let select = useSelector(state => state.catalog)
    let p = useParams()
    let [toggle, Settoggle] = useState({ discriptionAndChapters: true, endOrStart: false })
    let currentItem = select.find(item => item.title == p.title ? item : null)
    let res = toggle.endOrStart ? [...currentItem.pages].reverse() : [...currentItem.pages];
    console.log(currentItem.genres);

    return (
        <section className={s.container}>
            <Book
                img={currentItem.img}
                title={currentItem.title}
                description={currentItem.description}
            />
            <div className={s.content}>
                <div className={s.toggleContainer}>
                    <button
                        className={toggle.discriptionAndChapters ? `${s.toggleBtn} ${s.AtoggleBtn}` : s.toggleBtn}
                        onClick={() => Settoggle(prevState => ({ ...prevState, discriptionAndChapters: true }))}>
                        Описание
                    </button>
                    <button
                        className={toggle.discriptionAndChapters ? s.toggleBtn : `${s.toggleBtn} ${s.AtoggleBtn}`}
                        onClick={() => Settoggle(prevState => ({ ...prevState, discriptionAndChapters: false }))}>
                        Страницы и Главы
                    </button>
                </div>
                {toggle.discriptionAndChapters ?
                    <div>
                        <p className={s.discription}>Жанры:{currentItem.genres.map((item, index) => {
                            return <p key={index}>{item}</p>
                        })}</p>
                        <p className={s.discription}>{currentItem.description}</p>
                    </div>
                    :
                    <div className={s.LinksContainer}>
                        <button className={s.filterBtn} onClick={() => Settoggle(prevState => ({ ...prevState, endOrStart: true }))}>с конца</button>
                        {res.map(item => {
                            return <Link className={s.Link} to={`/${currentItem.title}/${item.pageNumber}`}>{`Страница ${item.pageNumber}`}</Link>
                        })}
                        <button className={s.filterBtn} onClick={() => Settoggle(prevState => ({ ...prevState, endOrStart: false }))}>с начала</button>
                    </div>
                }
            </div>

        </section>
    )
};

