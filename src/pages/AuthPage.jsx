import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { submitAuth } from '../store/slices/authSlice'

function AuthPage() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      alert('Пожалуйста, заполните все поля')
      return
    }

    try {
      await dispatch(submitAuth(formData)).unwrap()
      alert('Авторизация успешна!')
      navigate('/')
    } catch (err) {
      console.error('Auth error:', err)
    }
  }

  return (
    <main>
      <section className="auth-section" aria-labelledby="authTitle">
        <div className="auth-overlay"></div>
        <h2 id="authTitle" className="auth-title">Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <label className="auth-label auth-label-name" htmlFor="authName">
            Введите имя:
          </label>
          <input
            id="authName"
            name="name"
            type="text"
            className="auth-input auth-input-name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <label className="auth-label auth-label-email" htmlFor="authEmail">
            Введите email:
          </label>
          <input
            id="authEmail"
            name="email"
            type="email"
            className="auth-input auth-input-email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
          {error && <div className="auth-error">{error}</div>}
          <button 
            type="submit" 
            className="auth-submit-btn btn secondary" 
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Войти'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default AuthPage

