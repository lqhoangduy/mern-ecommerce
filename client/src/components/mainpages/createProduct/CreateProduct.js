import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: 'Fear of God',
  content:
    'Fear of god là một thương hiệu thời trang Streetwear sang trọng được thành lập bởi Jerry Lorenzo. Điều đặc biệt ở chỗ người sáng lập ra thương hiệu thời trang vô cùng được ưa chuộng trên thế giới này vốn không phải là một nhà thiết kế thời trang.',
  category: '',
  _id: '',
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Bạn không phải Admin!');
      const file = e.target.files[0];

      if (!file) return alert('Ảnh không tồn tại!');

      if (file.size > 1024 * 1024)
        //1mb
        return alert('Kích thước ảnh quá lớn!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('Định dạng ảnh không phù hợp!');

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert('Bạn không phải Admin');
      setLoading(true);
      await axios.post(
        '/api/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Bạn không phải Admin');
      if (!images) return alert('Không có ảnh sản phẩm');

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          '/api/products',
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push('/');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? 'block' : 'none',
  };

  return (
    <div className='create_product'>
      <div className='upload'>
        <input type='file' name='file' id='file_up' onChange={handleUpload} />
        {loading ? (
          <div id='file_img'>
            <Loading />
          </div>
        ) : (
          <div id='file_img' style={styleUpload}>
            <img src={images ? images.url : ''} alt='' />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='product_id'>Mã sản phẩm</label>
          <input
            type='text'
            name='product_id'
            id='product_id'
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className='row'>
          <label htmlFor='title'>Tên sản phẩm</label>
          <input
            type='text'
            name='title'
            id='title'
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='price'>Giá</label>
          <input
            type='number'
            name='price'
            id='price'
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='description'>Mô tả</label>
          <textarea
            type='text'
            name='description'
            id='description'
            required
            value={product.description}
            rows='2'
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='content'>Nội dung</label>
          <textarea
            type='text'
            name='content'
            id='content'
            required
            value={product.content}
            rows='5'
            onChange={handleChangeInput}
          />
        </div>

        <div className='row'>
          <label htmlFor='categories'>Loại sản phẩm: </label>
          <select
            name='category'
            value={product.category}
            onChange={handleChangeInput}>
            <option value=''>Vui lòng chọn loại sản phẩm</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type='submit'>{onEdit ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
