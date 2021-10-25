import React from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import Loading from '../../utils/loading/Loading';

function PaypalButton(props) {
  const initialOptions = {
    'client-id':
      'ARmc2GnPTceQYpCK8cfd2N6VIVihrj4fVmV3RT5C3XzufqX7QTcUXWamMi4ls_0fchKRQUoTu0yia9m6',
    currency: 'USD',
    intent: 'capture',
  };
  const { total, tranSuccess } = props;

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      tranSuccess(details);
    });
  };

  const onError = (err) => {
    console.log(err.toString());
  };

  const LoadingRender = () => {
    const [{ isPending }] = usePayPalScriptReducer();
    return isPending ? <Loading /> : null;
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <LoadingRender />
      <PayPalButtons
        style={{ layout: 'horizontal' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
