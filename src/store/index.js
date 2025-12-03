import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import catalogSlice from './slices/catalogSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    catalog: catalogSlice,
    cart: cartSlice,
  },
})




