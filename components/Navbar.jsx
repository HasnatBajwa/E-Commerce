import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const {showCart, setShowCart, totalQty} = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'><h3>Electromart</h3></Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>
          {totalQty}
        </span>
        {showCart && <Cart />}
      </button>

    </div>
  )
}

export default Navbar