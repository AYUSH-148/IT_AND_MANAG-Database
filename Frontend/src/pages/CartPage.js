import React from 'react';
import { useCartContext } from '../context/cart_context';
import { MdClear } from 'react-icons/md';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cart: cartItems, total_items, clearCart } = useCartContext();

  if (cartItems.length < 1) {
    return (
      <div className='py-8 text-center font-semibold'>
        <div className='container mx-auto'>No items found in the cart.</div>
      </div>
    );
  }

  return (
    <div className='py-8 mt-10'>
      <div className='container mx-auto'>
        <div className='mb-6'>
          <h3 className='text-4xl font-semibold'>Shopping Cart</h3>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {/* cart grid left */}
          <div className='md:col-span-2'>
            <div className='flex justify-between mb-4'>
              <div className='font-semibold text-2xl'>
                <span className='font-bold'>{total_items} </span> Colleges/Universities are saved
              </div>
              <button
                type='button'
                className='flex items-center text-pink-500 font-semibold text-2xl'
                onClick={() => clearCart()}
              >
                <MdClear className='mr-1' />
                <span>Clear All</span>
              </button>
            </div>

            <div className='grid gap-4'>
              {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
          </div>
          <div className='font-serif sm:ml-14   text-3xl'>
            <p className='p-4 rounded shadow-xl text-gray-500 border'>By saving colleges in the cart based on specific courses, users can create a personalized list of institutions that cater to their academic interests and career goals. This helps streamline the decision-making process by focusing on colleges that align with the user's desired field of study.</p>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default CartPage;
