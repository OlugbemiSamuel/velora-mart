
import { Link } from 'react-router'
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import './CheckoutHeader.css'
import { useMemo } from 'react';

const CheckoutHeader = ({carts}) => {

    const totalItems = useMemo(() => {
       return carts?.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

    }, [carts]);
   
    return(
          <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src="src/assets/images/logo.png" />
            <img className="mobile-logo" src="src/assets/images/mobile-logo.png" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{totalItems} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} />
        </div>
      </div>
    </div>
    )
}

export default CheckoutHeader