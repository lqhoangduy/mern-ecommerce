import React from 'react';
import './loading.css';
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className='load-page'>
      <ReactLoading
        type='bubbles'
        color='#555'
        className='loading'
        height={'10%'}
        width={'10%'}
      />
    </div>
  );
}

export default Loading;
