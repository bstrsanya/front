import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk для авторизации
export const submitAuth = createAsyncThunk(
  'auth/submit',
  async ({ name, email }) => {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // const response = await fetch('/api/auth', {
    //   method: 'POST',
    //   body: JSON.stringify({ name, email })
    // })
    // return response.json()
    
    // Сохраняем в localStorage
    localStorage.setItem('auth', JSON.stringify({ name, email, timestamp: Date.now() }))
    
    return { name, email }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('auth')
    },
    loadAuthFromStorage: (state) => {
      const savedAuth = localStorage.getItem('auth')
      if (savedAuth) {
        try {
          const authData = JSON.parse(savedAuth)
          state.user = authData
          state.isAuthenticated = true
        } catch (e) {
          console.error('Failed to load auth from storage', e)
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitAuth.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(submitAuth.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { logout, loadAuthFromStorage } = authSlice.actions
export default authSlice.reducer

