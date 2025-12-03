# Fold Shop — Frontend & Backend

В репозитории одновременно живут:

- **Frontend** (корень проекта): React + Redux витрина магазина одежды с каталогом товаров, карточками, корзиной и авторизацией.
- **Backend** (`backend/`): Spring Boot + PostgreSQL, где описаны сущности `User`, `Product`, `Order`, `OrderItem`. Они напрямую соответствуют функциям, уже реализованным на фронте (форма входа, каталог, корзина, оформление).

Дополнительное описание модели данных и SQL находится в `backend-data-model.md`.

## Технологии

- **React 18** — UI
- **Redux Toolkit** — state management
- **React Router** — маршрутизация
- **Vite** — dev server / build
- **Spring Boot 3** — REST + ORM backend
- **Hibernate / JPA** — работа с БД
- **PostgreSQL** — хранилище данных

## Установка фронтенда

```bash
npm install
```

### Запуск фронтенда

```bash
npm run dev
# http://localhost:3000
```

### Сборка и preview

```bash
npm run build
npm run preview
```

## Backend (Spring Boot)

### Быстрый старт

```bash
cd backend
mvn spring-boot:run   # или ./mvnw spring-boot:run
```

Перед запуском создай БД PostgreSQL и укажи доступы в `backend/src/main/resources/application.yml`
(по умолчанию `jdbc:postgresql://localhost:5432/fold_shop`, user `fold_user`, password `change_me`).

### Сущности backend и связь с фронтендом

| Сущность | На что отвечает во фронте |
| -------- | ------------------------- |
| `User` | Форма авторизации и отображение имени в шапке |
| `Product` | Каталог и карточки товаров |
| `Order` / `OrderItem` | Корзина и оформление заказа (кнопка «Перейти к оформлению») |

### Структура backend

```
backend/
  ├── pom.xml
  ├── src/main/java/com/example/shop/
  │     ├── ShopBackendApplication.java
  │     ├── model/ (User, Product, Order, OrderItem, OrderStatus)
  │     ├── repository/ (UserRepository и др.)
  │     └── config/DataInitializer.java
  └── src/main/resources/application.yml
```

Hibernate создаёт таблицы автоматически (`ddl-auto: update`). В `DataInitializer` задаются демо‑записи (первый пользователь и товар).

## Структура фронтенда

```
src/
  ├── components/
  │   ├── Header.jsx      # логотип, корзина, вход/выход
  │   ├── Footer.jsx
  │   ├── Banner.jsx
  │   └── Catalog.jsx
  ├── pages/
  │   ├── HomePage.jsx
  │   ├── ProductPage.jsx
  │   ├── CartPage.jsx
  │   └── AuthPage.jsx
  ├── store/
  │   ├── index.js
  │   ├── hooks.js
  │   └── slices/
  │       ├── authSlice.js
  │       ├── catalogSlice.js
  │       └── cartSlice.js
  ├── App.jsx
  ├── App.css
  ├── main.jsx
  └── styles.css
```

## Основной функционал фронтенда

- Авторизация (localStorage + Redux, имя отображается в шапке, есть кнопка «Выйти»).
- Каталог товаров, переход на карточку товара, добавление в корзину.
- Корзина с изменением количества, очисткой и модальным окном для оформления (ссылка на Telegram владельца).

## Redux Store

- `authSlice`: авторизация, `submitAuth`, `logout`, `loadAuthFromStorage`.
- `catalogSlice`: `fetchCatalog`, хранение списка товаров.
- `cartSlice`: добавление/удаление товаров, счётчик в шапке, состояние корзины.

## API / интеграция

Frontend пока эмулирует API (localStorage). Чтобы подключить настоящий backend:

1. Настроить контроллеры в Spring Boot (например, `/api/products`, `/api/auth`, `/api/orders`).
2. В слайсах заменить имитацию на реальные `fetch`/`axios` вызовы.

Пример заготовки:

```javascript
export const fetchCatalog = createAsyncThunk('catalog/fetch', async () => {
  const response = await fetch('/api/products')
  return response.json()
})
```

После этого фронт начнёт работать с новыми сущностями из backend, которые описаны в `backend-data-model.md`.





