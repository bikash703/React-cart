import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer({
    cartproducts:[],
    subtotal:0,
    tax:0,
    total:0,
    shipping:0
},{
   addToCart:(state,action)=>{
    const item = action.payload;
    const isItemExist = state.cartproducts.find((i)=>i.id === item.id)

    if(isItemExist){
        state.cartproducts.forEach((i)=>{
        if(i.id ===item.id) i.quantity +=1
    })
    }else{
        state.cartproducts.push(item)
    }
   },
   
   decrement:(state,action)=>{
    const item = state.cartproducts.find((i)=>i.id === action.payload)
    if(item.quantity > 1){
        state.cartproducts.forEach((i)=>{
            if(i.id ===item.id) i.quantity -=1
        })
    }
   },
   deleteHandler:(state,action)=>{
    state.cartproducts = state.cartproducts.filter((i)=>i.id !== action.payload)
   },
   calculatorPrice:(state)=>{
    let sum = 0;
    state.cartproducts.forEach((i)=> (sum += i.price * i.quantity ))
    state.subtotal = sum;
    state.shipping = (state.subtotal < 500 ) ? 0 : 200;
    state.tax = +(state.subtotal * 0.18).toFixed();
    state.total = state.subtotal + state.shipping + state.tax ;
   }
})