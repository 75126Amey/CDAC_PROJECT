import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginStatus: false,
    userName:{
      firstName:'',
      lastName:''
    }
  },
  reducers: {
    loginAction: (state) => {
      state.loginStatus = true
    },
    logoutAction: (state) => {
      state.loginStatus = false
    },
    setUserName: (state, action) => {
      state.userName.firstName = action.payload.firstName
      state.userName.lastName = action.payload.lastName
    }
  },
})

export const { loginAction, logoutAction,setUserName } = userSlice.actions
export default userSlice.reducer
