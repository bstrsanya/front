import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCatalog } from '../store/slices/catalogSlice'

function Catalog() {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((state) => state.catalog)

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchCatalog())
    }
  }, [dispatch, items.length])

  if (loading) {
    return (
      <section className="catalog">
        <div className="catalog-overlay"></div>
        <h2 className="catalog-title">Каталог</h2>
        <div className="catalog-grid">Загрузка...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="catalog">
        <div className="catalog-overlay"></div>
        <h2 className="catalog-title">Каталог</h2>
        <div className="catalog-grid">Ошибка: {error}</div>
      </section>
    )
  }

  return (
    <section className="catalog">
      <div className="catalog-overlay"></div>
      <h2 className="catalog-title">Каталог</h2>
      <div className="catalog-grid">
        {items.map((item) => (
          <figure key={item.id} className="catalog-item">
            <img src={item.image} alt={item.name} />
            <figcaption>{item.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Catalog

