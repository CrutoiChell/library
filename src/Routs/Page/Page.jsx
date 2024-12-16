import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Page.module.scss";

export function Page() {
  let select = useSelector(state => state.catalog);
  let p = useParams();
  let currentItem = select.find(item => item.title === p.title);
  let totalPages = currentItem && currentItem.pages ? currentItem.pages.length : 0;

  return (
    <section className={s.pageSection}>
      <div className={s.links}>
        {Number(p.page) > 1 ? (
          <Link to={`/${p.title}/${Number(p.page) - 1}`} className={s.pageNavLink}>
            {'<- Предыдущая'}
          </Link>
        ) : null}

        {Number(p.page) < totalPages ? (
          <Link to={`/${p.title}/${Number(p.page) + 1}`} className={s.pageNavLink}>
            {'Следующая ->'}
          </Link>
        ) : null}
      </div>
      <div className={s.container}>
        <h2>{p.title}</h2>
        <div className={s.pageContent}>
          <h3>{currentItem.pages[Number(p.page) - 1].chapters}</h3>
          {currentItem && currentItem.pages[Number(p.page) - 1] ? currentItem.pages[Number(p.page) - 1].content : 'Страница не найдена'}
          {currentItem && currentItem.pages[Number(p.page) - 1] ? currentItem.pages[Number(p.page) - 1].content : 'Страница не найдена'}
        </div>
      </div>
      <div className={s.links}>
        {Number(p.page) > 1 ? (
          <Link to={`/${p.title}/${Number(p.page) - 1}`} className={s.pageNavLink}>
            {'<- Предыдущая'}
          </Link>
        ) : null}

        {Number(p.page) < totalPages ? (
          <Link to={`/${p.title}/${Number(p.page) + 1}`} className={s.pageNavLink}>
            {'Следующая ->'}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
