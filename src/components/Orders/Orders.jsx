import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart)
    
    const handelRemoveFromCart = (id) =>{
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handelClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
               {
                cart.map(product=> <ReviewItem
                 key={product.key}
                 product={product}
                 handelRemoveFromCart = {handelRemoveFromCart}
                
                ></ReviewItem>)
               }
            </div>
            <div className='cart-container'>
                <Cart 
                  cart={cart}
                  handelClearCart={handelClearCart}
                 >
                   <Link className='proced-link' to="/checkout">
                       <button className='btn-proced'>Proced Checkout</button>
                   </Link>
                 </Cart>
            </div>
        </div>
    );
};

export default Orders;