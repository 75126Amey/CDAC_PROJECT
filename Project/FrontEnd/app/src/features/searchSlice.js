import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    term:"",
  },
  reducers: {
    setSearchTermGlobal: (state, action) => {
      // action.payload will receive the parameter passed while sending
      // the action with dispatch
     state.term = action.payload;
    },
    
  },
})

export const { setSearchTermGlobal} = searchSlice.actions
export default searchSlice.reducer
