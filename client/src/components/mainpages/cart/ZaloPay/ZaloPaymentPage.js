import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../../GlobalState';
import './ZaloPaymentPage.css';
// import QRCode from 'qrcode.react';

function ZaloPaymentPage() {
  const state = useContext(GlobalState);
  const createOrder = state.zaloPaymentAPI.createOrder;
  // const queryOrder = state.zaloPaymentAPI.queryOrder;
  const [total] = state.zaloPaymentAPI.total;
  const [orderUrl] = state.zaloPaymentAPI.orderUrl;
  const [fullname, setFullName] = useState({});
  const [address, setAddress] = useState({});

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === 'full_name') {
      setFullName({ ...fullname, [name]: value });
    } else {
      setAddress({ ...address, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(total);
  };

  return (
    <>
      <div className='info-payment'>
        <div>
          <span className='total'>Tổng tiền thanh toán:</span>
          <span className='total' id="VND">{total} đ</span>
         </div>
        <div className='infor' >Vui lòng nhập thông tin người nhận: </div>
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
              value={address.address_line_1}
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
              value={address.admin_area_2}
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
              value={address.postal_code}
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
              value={address.country_code}
              onChange={handleChangeInput}
            />
          </div>

          <button className="createOrder" type='submit' onClick={() => createOrder(total)}>Tạo đơn hàng</button>
        </form>
      </div>

      {/* <button onClick={queryOrder}>Kiem tra trang thai don hang</button> */}
    </>
  );
}

export default ZaloPaymentPage;
