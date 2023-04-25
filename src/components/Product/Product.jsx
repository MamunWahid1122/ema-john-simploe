import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
const Product = (props) => {
    // console.log(props)
    const { img, name, seller, ratings, quantity, price } = props.product;
    const handleAddtoCart = props.handleAddtoCart;



    return (
        <div className='product'>
            <img src={img} />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p>Price: ${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>Ratigns: {ratings} Stars</p>
            </div>
            <button onClick={() => handleAddtoCart(props.product)} className='btn-cart'>
                Add to Cart
                <FontAwesomeIcon icon ={faShoppingCart}/>
                </button>
                
        </div>
    );
};

export default Product;