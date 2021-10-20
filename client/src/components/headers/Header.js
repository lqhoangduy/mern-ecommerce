import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get('/user/logout');
    localStorage.removeItem('firstLogin');
    window.location.href = '/';
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to='/create_product'>Thêm sản phẩm</Link>
        </li>
        <li>
          <Link to='/category'>Mục sản phẩm</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to='/history'>Lịch sử</Link>
        </li>
        <li>
          <Link to='/' onClick={logoutUser}>
            Đăng xuất
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : '-100%',
  };

  return (
    <header>
      <div className='menu' onClick={() => setMenu(!menu)}>
        <i className='fas fa-bars icon-menu'></i>
      </div>

      <div className='logo'>
        <Link to='/'>{isAdmin ? 'Admin' : 'd i s t o r e'}</Link>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to='/'>{isAdmin ? 'Tất cả sản phẩm' : 'Sản phẩm'}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to='/login'>Đăng nhập / Đăng ký</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <i className='fas fa-times menu icon-close-menu' width='30'></i>
        </li>
      </ul>

      {isAdmin ? (
        ''
      ) : (
        <div className='cart-icon'>
          <span>{cart.length}</span>
          <Link to='/cart'>
            <i className='fas fa-shopping-cart icon-cart-menu'></i>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
