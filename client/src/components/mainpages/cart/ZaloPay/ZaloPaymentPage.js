import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../../GlobalState';
import './ZaloPaymentPage.css';
import axios from 'axios';

const initialState = {
  fullname: {
    full_name: '',
  },
  address: {
    address_line_1: '',
    admin_area_2: '',
    postal_code: '',
    country_code: '',
  },
};

function ZaloPaymentPage() {
  const state = useContext(GlobalState);
  const createOrder = state.zaloPaymentAPI.createOrder;
  const queryOrder = state.zaloPaymentAPI.queryOrder;
  const [total] = state.zaloPaymentAPI.total;
  const [isPaid] = state.zaloPaymentAPI.isPaid;
  const [appTransId] = state.zaloPaymentAPI.appTransId;
  const [fullname, setFullName] = useState(initialState.fullname);
  const [addressform, setAddressForm] = useState(initialState.address);
  // const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === 'full_name') {
      setFullName({ ...fullname, [name]: value });
    } else {
      setAddressForm({ ...addressform, [name]: value });
    }
  };

  const addToCart = async (cart) => {
    await axios.patch(
      '/user/addcart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const tranSuccess = async () => {
    const paymentID = appTransId;
    const address = {
      name: { ...fullname },
      address: { ...addressform },
    };

    console.log(paymentID, address);

    // await axios.post(
    //   '/api/payment',
    //   { cart, paymentID, address },
    //   {
    //     headers: { Authorization: token },
    //   }
    // );

    // setCart([]);
    // addToCart([]);
    alert('Bạn đã đặt hàng và thanh toán thành công.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(total);
    let count = 0;
    const query = setInterval(() => {
      queryOrder();
      count += 1;
      console.log('isPaid: ', isPaid);
      if (isPaid === true) {
        tranSuccess();
        return;
      }
      if (count === 300) {
        clearInterval(query);
      }
    }, 3000);
  };

  const numberWithCommas = (x) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <div className='info-payment'>
      <div className='payment-total-wrapper'>
        <span>Tổng tiền thanh toán:</span>
        <span id='VND'>{numberWithCommas(total * 23000)}đ</span>
      </div>
      <div className='infor'>Vui lòng nhập thông tin người nhận: </div>
      <form className='form-payment-zalo' onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='full_name'>Tên người nhận: </label>
          <input
            type='text'
            name='full_name'
            id='full_name'
            required
            value={fullname.full_name}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='address_line_1'>Địa chỉ: </label>
          <input
            type='text'
            name='address_line_1'
            id='address_line_1'
            required
            value={addressform.address_line_1}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='admin_area_2'>Tỉnh/Thành phố: </label>
          <input
            type='text'
            name='admin_area_2'
            id='admin_area_2'
            required
            value={addressform.admin_area_2}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='postal_code'>Mã bưu điện: </label>
          <input
            type='text'
            name='postal_code'
            id='postal_code'
            required
            value={addressform.postal_code}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='country_code'>Mã quốc gia: </label>
          <input
            type='text'
            name='country_code'
            id='country_code'
            required
            value={addressform.country_code}
            onChange={handleChangeInput}
          />
        </div>

        <button className='createOrder' type='submit'>
          Tiến hành thanh toán
        </button>
      </form>
      <button onClick={queryOrder}>Kiểm tra trạng thái đơn hàng</button>
    </div>
  );
}

export default ZaloPaymentPage;
