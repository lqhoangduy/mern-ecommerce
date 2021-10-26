import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ZaloPayButton.css';
import ZaloPayLogo from './images/zalopay-logo.svg';
import { GlobalState } from '../../../../GlobalState';

function ZaloPayButton(props) {
  const state = useContext(GlobalState);
  const [, setTotal] = state.zaloPaymentAPI.total;
  return (
    <Link
      onClick={() => setTotal(props.total)}
      className='zalopay-button'
      to='/zalo_payment'>
      <img className='zalopay-logo' src={ZaloPayLogo} alt='' />
    </Link>
  );
}

export default ZaloPayButton;
