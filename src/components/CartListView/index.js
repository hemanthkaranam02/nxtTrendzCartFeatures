import CartItem from '../CartItem'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.map(eachItem => (
            <CartItem key={eachItem.id} cartItemDetails={eachItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)
export default CartListView
