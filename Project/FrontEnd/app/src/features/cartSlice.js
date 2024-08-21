import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCartAction: (state, action) => {
      // action.payload will receive the parameter passed while sending
      // the action with dispatch
      console.log(action.payload)
      state.items.push(action.payload)
    },
    removeFromCartAction: (state, action) => {
      state.items = state.items.filter(ele=>ele.id!=action.payload)
      // for (let index = 0; index < state.items.length; index++) {
      //   // search the property to be removed from the state
      //   if (state.items[index].id == property.id) {
      //     state.items.splice(index, 1)
      //     break
      //   }
      // }
    },
    removeAllfromCartAction: (state, action) => {
      state.items = []
    },
    removeAllCommonsFromCartAction: (state, action) => {
      state.items = state.items.filter(item=>!action.payload.includes(item.id));
    },
    updateDiscountInCartAction: (state, action) => {
      state.items.forEach(item=>{
        if(item.parentCategoryName=="Educational"){
          item["discount"] = 10.5;
        }
      });
    }
  },
})

export const { addToCartAction, removeFromCartAction,removeAllfromCartAction,removeAllCommonsFromCartAction,updateDiscountInCartAction } = cartSlice.actions
export default cartSlice.reducer
