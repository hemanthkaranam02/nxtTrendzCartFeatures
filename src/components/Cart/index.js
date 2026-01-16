import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import './index.css'

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = !cartList || cartList.length === 0

        const totalAmount = showEmptyView
          ? 0
          : cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)

        const onClickRemoveAll = () => removeAllCartItems()

        const onConfirmOrder = close => {
          setOrderPlaced(true)
          removeAllCartItems()
          close()
        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <div className="cart-header">
                    <h1 className="cart-heading">My Cart</h1>
                    <button
                      type="button"
                      className="remove-all-btn"
                      onClick={onClickRemoveAll}
                    >
                      Remove All
                    </button>
                  </div>

                  <CartListView />
                  <CartSummary />

                  {/* ✅ Only 1 Checkout Button */}
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className="checkout-btn"
                        data-testid="checkout-button"
                      >
                        Checkout
                      </button>
                    }
                  >
                    {close => (
                      <div className="payment-popup">
                        <h1 className="popup-heading">Payment Details</h1>

                        <div className="payment-options">
                          <label>
                            <input type="radio" disabled /> Card
                          </label>
                          <label>
                            <input type="radio" disabled /> Net Banking
                          </label>
                          <label>
                            <input type="radio" disabled /> UPI
                          </label>
                          <label>
                            <input type="radio" disabled /> Wallet
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="payment"
                              value="COD"
                              onChange={e => setPaymentMethod(e.target.value)}
                            />
                            Cash on Delivery
                          </label>
                        </div>

                        <div className="order-summary">
                          <p>Items: {cartList.length}</p>
                          <p>Total Amount: ₹{totalAmount}</p>
                        </div>

                        <button
                          type="button"
                          className="confirm-btn"
                          disabled={paymentMethod !== 'COD'}
                          onClick={() => onConfirmOrder(close)}
                        >
                          Confirm Order
                        </button>

                        {/* ✅ Success message inside popup */}
                        {orderPlaced && (
                          <p className="success-text">
                            Your order has been placed successfully
                          </p>
                        )}
                      </div>
                    )}
                  </Popup>
                </div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
