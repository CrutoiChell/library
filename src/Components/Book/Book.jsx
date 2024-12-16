import s from "./Book.module.scss";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBook } from '../../Routs/Profile/ProfileSlice';
import { nanoid } from '@reduxjs/toolkit';
export function Book({ img, title, description }) {

    let disp = useDispatch()

    return (
        <div className={s.container}>
            <Link to={`/${title}`}><img className={s.img} src={img} alt="" /></Link>
            <Link to={`/${title}`}><h3 className={s.nameTitle}>{title}</h3></Link>
            <p className={s.description}>{description}</p>
            <Link className={s.read} to={`/${title}/1`}>Читать</Link>
            <button onClick={() => disp(addBook({ id: nanoid(), img: img, title: title, description: description }))} className={s.btn}>Закладки</button>
        </div>
    );
}