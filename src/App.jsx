import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { loadAuthFromStorage } from './store/slices/authSlice'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import './App.css'

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    // Загружаем авторизацию из localStorage при загрузке приложения
    store.dispatch(loadAuthFromStorage())
    
    // Добавляем класс для страницы авторизации
    if (location.pathname === '/auth') {
      document.body.classList.add('page-auth')
    } else {
      document.body.classList.remove('page-auth')
    }
  }, [location])

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App

