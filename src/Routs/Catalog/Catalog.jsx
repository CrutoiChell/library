import { Books } from '../../Components/Books/Books'
import s from "./Catalog.module.scss"
export function Catalog() {

    return (
        <section className={s.catalog}>
            <p className={s.catalogText}>Каталог книг</p>
            <Books />
        </section>
    )
};

