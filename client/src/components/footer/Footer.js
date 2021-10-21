import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-row'>
        <div className='footer-col'>
          <h3 className='footer-heading'>Sản phẩm</h3>
          <ul className='footer-list'>
            <li className='footer-item'>
              <Link to='/#'>Quần áo</Link>
            </li>
            <li className='footer-item'>
              <Link to='/#'>Phụ kiện</Link>
            </li>
            <li className='footer-item'>
              <Link to='/#'>Danh sách cửa hàng</Link>
            </li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3 className='footer-heading'>Về chúng tôi</h3>
          <ul className='footer-list'>
            <li className='footer-item'>
              <Link to='/#'>Giới thiệu</Link>
            </li>
            <li className='footer-item'>
              <Link to='/#'>Hướng dẫn mua hàng</Link>
            </li>
            <li className='footer-item'>
              <Link to='/#'>Hướng dẫn thanh toán</Link>
            </li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3 className='footer-heading'>Liên hệ và Hỗ trợ</h3>
          <ul className='footer-list'>
            <li className='footer-item'>
              <i className='fas fa-phone footer-item-icon'></i>
              <Link to='/#'>0961.884.661</Link>
            </li>
            <li className='footer-item'>
              <i className='fas fa-envelope footer-item-icon'></i>
              <Link to='/#'>lqhoangduy@gmail.com</Link>
            </li>
            <li className='footer-item'>
              <i className='fas fa-comments footer-item-icon'></i>
              <Link to='/#'>Gửi phản hồi</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-space'>
        <span>...</span>
      </div>

      <div className='footer-row'>
        <div className='footer-copy-right'>© 2021 D I S T O R E</div>

        <div className='footer-socials'>
          <div className='socials-wrapper'>
            <Link to='#'>
              <i className='fab fa-twitter'></i>
            </Link>
          </div>
          <div className='socials-wrapper'>
            <Link to='#'>
              <i className='fab fa-facebook-f'></i>
            </Link>
          </div>
          <div className='socials-wrapper'>
            <Link to='#'>
              <i className='fab fa-instagram'></i>
            </Link>
          </div>
        </div>

        <div className='footer-policy'>
          <Link to='#'>Chính sách bảo mật</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
