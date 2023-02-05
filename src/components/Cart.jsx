import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const { cartproducts,subtotal,shipping,tax,total } = useSelector(state => state.cart)
const dispatch = useDispatch()

  const increment =(id)=>{
    dispatch({
      type:'addToCart',
      payload:{id}
    })
    dispatch({
      type:"calculatorPrice",
    })
  }
  const decrement =(id)=>{
    dispatch({
      type:'decrement',
      payload:id
    })
    dispatch({
      type:"calculatorPrice",
    })
  }
  const deleteHandler =(id)=>{
    dispatch({
      type:"deleteHandler",
      payload:id
    })
    dispatch({
      type:"calculatorPrice",
    })
  }
  return (
    <div className='cart'>
      <main>
        {
          cartproducts.length > 0 ? (
            cartproducts.map((i) => (
              <CartItem imgSrc={i.imgSrc} name={i.name} price={i.price} qty={i.quantity} id={i.id} key={i.id}  decrement={decrement} increment={increment} deleteHandler={deleteHandler}/>
            ))
          ):(
            <h1>No Items Yet</h1>
          )
          }
      </main>
      <aside>
        <h4>SubTotal: ${subtotal}</h4>
        <h4>Shipping: ${shipping}</h4>
        <h4>Tax: ${tax}</h4>
        <h4>Total: ${total}</h4>
      </aside>
    </div>
  )
}

const CartItem = ({ id, imgSrc, name, price, qty, decrement, increment, deleteHandler }) => (
  <div className='cartItem'>
    <img src={imgSrc} alt="name" />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>
    <div>
      <button onClick={() => decrement(id)} >-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)} >+</button>
    </div>
    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
)

export default Cart
