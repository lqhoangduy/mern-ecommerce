import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import PaypalButton from './PaypalButton';

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      '/user/addcart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm('Bạn có muốn xoá sản phẩm khỏi giỏ hàng không?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      '/api/payment',
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert('Bạn đã đặt hàng và thanh toán thành công.');
  };

  if (cart.length === 0)
    return (
      <h6
        style={{
          textAlign: 'center',
          fontSize: '24px',
          color: '#555',
          minHeight: '600px',
        }}>
        Giỏ hàng trống
      </h6>
    );
  return (
    <div style={{ marginTop: '30px' }}>
      {cart.map((product) => (
        <div className='cart' key={product._id}>
          <div className='box-cart'>
            <img src={product.images.url} alt='' className='img_container' />
            <div className='box-cart-info-product'>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </div>

            <div className='amount'>
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>

            <h3>$ {product.price * product.quantity}</h3>

            <div className='delete' onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}

      <div className='total'>
        <h3>Tổng: $ {total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}

export default Cart;
