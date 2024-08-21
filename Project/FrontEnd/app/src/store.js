import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'
import userSlice from './features/userSlice'
import searchSlice from './features/searchSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    search:searchSlice
  },
})
