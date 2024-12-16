import s from "./Books.module.scss"
import { Book } from '../Book/Book'
import { useDispatch, useSelector } from "react-redux"
import { createBook } from '../../Routs/Catalog/CatalogSlice'
export function Books() {
  let select = useSelector(state => state.catalog)
  let disp = useDispatch()

  return (
    <section className={s.container}>
      {select.map(item => {
        return (<Book
          key={item.id}
          img={item.img}
          title={item.title}
          description={item.description}
        />)
      })}
     <button onClick={() => disp(createBook())}>click</button>
    </section>
  )
};

