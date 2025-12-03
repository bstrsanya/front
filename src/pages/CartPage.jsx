import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../store/slices/cartSlice'

function CartPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-page-inner cart-page-empty">
          <h1>Корзина</h1>
          <p>Здесь пока пусто. Добавьте товары из каталога.</p>
          <Link className="btn secondary" to="/">
            Перейти в каталог
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-page-inner">
        <div className="cart-page-header">
          <h1>Корзина</h1>
          <button
            className="cart-clear-btn"
            onClick={() => dispatch(clearCart())}
            type="button"
          >
            Очистить
          </button>
        </div>
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-thumb">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <div className="cart-item-controls">
                  <div className="cart-qty">
                    <button
                      type="button"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-remove-btn"
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-summary">
          <div className="cart-summary-info">
            <span>Всего товаров</span>
            <strong>{totalItems}</strong>
          </div>
          <button
            className="btn secondary"
            type="button"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Перейти к оформлению
          </button>
        </div>
        {isCheckoutOpen && (
          <div
            className="cart-modal-backdrop"
            onClick={() => setIsCheckoutOpen(false)}
          >
            <div
              className="cart-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="cart-modal-close"
                onClick={() => setIsCheckoutOpen(false)}
                aria-label="Закрыть окно"
              >
                ×
              </button>
              <h2>Оформление заказа</h2>
              <p>
                Для оформления заказа напишите, пожалуйста, в Telegram
                владельцу магазина:
              </p>
              <a
                href="https://t.me/bstrsanya"
                target="_blank"
                rel="noreferrer"
                className="cart-modal-link"
              >
                @bstrsanya
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CartPage


