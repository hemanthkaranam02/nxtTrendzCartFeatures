import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
  const totalPrice = price * quantity

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onIncrement = () => incrementCartItemQuantity(id)
        const onDecrement = () => decrementCartItemQuantity(id)
        const onRemove = () => removeCartItem(id)

        return (
          <li className="cart-item">
            <img src={imageUrl} alt={title} className="cart-product-image" />

            <div className="cart-item-details-container">
              <h1 className="cart-product-title">{title}</h1>
              <p className="cart-product-brand">by {brand}</p>

              <div className="cart-quantity-container">
                <button
                  type="button"
                  data-testid="minus"
                  className="quantity-controller-button"
                  onClick={onDecrement}
                >
                  <BsDashSquare />
                </button>

                <p className="cart-quantity">{quantity}</p>

                <button
                  type="button"
                  data-testid="plus"
                  className="quantity-controller-button"
                  onClick={onIncrement}
                >
                  <BsPlusSquare />
                </button>
              </div>

              <p className="cart-total-price">Rs {totalPrice}/-</p>
            </div>

            <button
              type="button"
              data-testid="remove"
              className="remove-button"
              onClick={onRemove}
            >
              <AiFillCloseCircle size={20} />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
