import React, { useEffect, useState } from 'react';
import {addToDb, deleteShoppingCart, getShoppingCart} from '../../utilities/fakedb';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { faJetFighter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart , setCart] = useState([]);

    useEffect( ()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    } ,[])

    useEffect(()=>{
        
        const storedCart = getShoppingCart();
        const saveCart= [];
        
        //step 1: get id
        for(const id in storedCart){
            // step 2: get  product from products state  by using id
            const addedProduct = products.find(product => product.id === id);
            
            //step 3: get quantity of the product
          if(addedProduct){
              const quantity = storedCart[id];
               addedProduct.quantity = quantity;
               //step 4: add the added product to the saved cart
               saveCart.push(addedProduct);
          }
            // console.log(addedProduct);
            
        }
        //step 5: set the cart
        setCart(saveCart);
    } ,[products])

    const handleAddtoCart = (product) => {
        // cart.push(product);
         let newCart = [];

        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }
       else{
           exists.quantity = exists.quantity + 1;
           const remaining = cart.filter(pd => pd.id !== product.id);
           newCart = [...remaining, exists];
       }

        setCart(newCart);
        addToDb(product.id);

    }

    const handelClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                    key={product.id}
                    product={product}
                    handleAddtoCart={handleAddtoCart}
                    ></Product>
                    )
                }
            </div>
            <div className="cart-container">
               <Cart 
               cart={cart}
               handelClearCart={handelClearCart}
               >
                  <Link className='proced-link' to="/orders">
                      <button className='btn-proced'>Review Order</button>
                  </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;