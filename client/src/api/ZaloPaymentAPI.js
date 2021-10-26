import { useState } from 'react';
import axios from 'axios';
const CryptoJS = require('crypto-js');
const moment = require('moment');
const qs = require('qs');

function ZaloPaymentAPI() {
  const [total, setTotal] = useState(0);
  const [orderUrl, setOrderUrl] = useState('');
  var appTransId = '';

  const createOrder = (amount) => {
    const config = {
      app_id: '2553',
      key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
      key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
      endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
    };

    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: 'user123',
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount * 23000,
      description: `Payment for the order distore#${transID}`,
    };

    appTransId = order.app_trans_id;

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    axios
      .post(config.endpoint, null, { params: order })
      .then((res) => {
        window.open(res.data.order_url, '_blank');
      })
      .catch((err) => console.log(err));
  };

  const queryOrder = () => {
    const config = {
      app_id: '2553',
      key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
      key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
      endpoint: 'https://sb-openapi.zalopay.vn/v2/query',
    };

    let postData = {
      app_id: config.app_id,
      app_trans_id: appTransId, // Input your app_trans_id
    };

    let data =
      postData.app_id + '|' + postData.app_trans_id + '|' + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
      method: 'post',
      url: config.endpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(postData),
    };

    axios(postConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return {
    total: [total, setTotal],
    createOrder: createOrder,
    orderUrl: [orderUrl, setOrderUrl],
    queryOrder: queryOrder,
  };
}

export default ZaloPaymentAPI;
