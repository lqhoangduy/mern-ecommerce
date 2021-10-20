import React from 'react';
import { Link } from 'react-router-dom';
import BtnRender from './BtnRender';

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <div className='product_card'>
      {isAdmin && (
        <input
          type='checkbox'
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt='' />

      <div className='product_box'>
        <Link to={`/detail/${product._id}`}>
          <h2 title={product.title}>{product.title}</h2>
        </Link>

        <p>{product.description}</p>
        <span>$ {product.price}</span>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
