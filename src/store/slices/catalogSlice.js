import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk для загрузки каталога
export const fetchCatalog = createAsyncThunk(
  'catalog/fetch',
  async () => {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // const response = await fetch('/api/catalog')
    // return response.json()
    
    return [
      { id: 1, name: 'пуловер', image: '/assets/cat-1.png' },
      { id: 2, name: 'джинсы', image: '/assets/cat-2.png' },
      { id: 3, name: 'брюки', image: '/assets/cat-3.png' },
      { id: 4, name: 'курта', image: '/assets/cat-4.png' },
      { id: 5, name: 'кофта', image: '/assets/cat-5.png' },
      { id: 6, name: 'футболка', image: '/assets/cat-6.png' },
      { id: 7, name: 'джемпер', image: '/assets/cat-7.png' },
      { id: 8, name: 'водолазка', image: '/assets/cat-8.png' },
      { id: 9, name: 'рубашка', image: '/assets/cat-9.png' },
    ]
  }
)

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default catalogSlice.reducer

