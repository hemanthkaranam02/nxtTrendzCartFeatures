// Write your code here
import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)

  // Calculate total cost
  const total = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const totalItems = cartList.length

  return (
    <div className="cart-summary-container">
      <h1 className="order-total-text">
        Order Total: <span className="total-price">Rs {total}/-</span>
      </h1>
      <p className="total-items-text">{totalItems} items in cart</p>
      <button type="button" className="checkout-button">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
