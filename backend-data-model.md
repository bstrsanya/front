## Модель данных backend (актуально)

### ER-модель

- **User**
  - Пользователь магазина (формы авторизации на фронте).
  - Поля: `id`, `name`, `email`, `passwordHash`, `createdAt`.
  - Связь: `1:N` с `Order`.

- **Product**
  - Товар из каталога.
  - Поля: `id`, `name`, `description`, `price`, `imageUrl`, `createdAt`.
  - Связь: `1:N` с `OrderItem`.

- **Order**
  - Заказ пользователя (отражает корзину/оформление).
  - Поля: `id`, `user`, `status (enum NEW/PAID/SHIPPED/CANCELLED)`, `createdAt`.
  - Связи: `N:1` к `User`, `1:N` к `OrderItem`.

- **OrderItem**
  - Строка заказа: конкретный товар, количество, цена.
  - Поля: `id`, `order`, `product`, `quantity`, `price`.
  - Связи: `N:1` к `Order`, `N:1` к `Product`.

Все сущности реализованы в `backend/src/main/java/com/example/shop/model/` с помощью JPA/Hibernate и Lombok.

### Структура таблиц (PostgreSQL)

| Таблица      | Ключевые поля                                                               |
| ------------ | ---------------------------------------------------------------------------- |
| `users`      | `id BIGSERIAL PK`, `name`, `email UNIQUE`, `password_hash`, `created_at`     |
| `products`   | `id BIGSERIAL PK`, `name`, `description`, `price NUMERIC(10,2)`, `image_url` |
| `orders`     | `id BIGSERIAL PK`, `user_id FK`, `status ENUM`, `created_at`                 |
| `order_items`| `id BIGSERIAL PK`, `order_id FK`, `product_id FK`, `quantity`, `price`, `UNIQUE(order_id, product_id)` |

Enum `order_status` создаётся автоматически Hibernate'ом на основе `OrderStatus`.

---

## Планируемые REST‑endpoint’ы (EP)

| Метод | Путь              | Описание                                      | Связанные сущности |
| ----- | ----------------- | --------------------------------------------- | ------------------ |
| GET   | `/api/products`   | Список товаров каталога                       | `Product`          |
| GET   | `/api/products/{id}` | Детали товара                              | `Product`          |
| POST  | `/api/orders`     | Создание заказа из корзины                    | `Order`, `OrderItem` |
| GET   | `/api/orders/{id}` | Получить заказ со строками                  | `Order`, `OrderItem`, `Product`, `User` |
| GET   | `/api/users/{id}/orders` | История заказов пользователя           | `User`, `Order`    |
| POST  | `/api/auth/login` | (пока mock) авторизация пользователя          | `User`             |
| POST  | `/api/auth/logout`| Выход пользователя (очистка токена/сессии)    | `User`             |

> Реализация контроллеров пока не добавлена, но эти endpoints покрывают весь текущий функционал фронтенда (каталог, карточки, корзина, оформление, авторизация). Когда понадобится подключить настоящий backend, контроллеры можно строить на базе существующих сущностей и репозиториев.