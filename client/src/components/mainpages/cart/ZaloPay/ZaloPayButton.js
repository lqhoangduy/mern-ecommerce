import React, { useContext } from 'react';
import './ZaloPayButton.css';
import ZaloPayLogo from './images/zalopay-logo.svg';
import { GlobalState } from '../../../../GlobalState';

function ZaloPayButton(props) {
  const state = useContext(GlobalState);
  const createOrder = state.zaloPaymentAPI.createOrder;
  const { total } = props;

  const handlePayment = () => {
    createOrder(total);
  };

  return (
    <div className='zalopay-button' onClick={handlePayment}>
      <img className='zalopay-logo' src={ZaloPayLogo} alt='' />
    </div>
  );
}

export default ZaloPayButton;
