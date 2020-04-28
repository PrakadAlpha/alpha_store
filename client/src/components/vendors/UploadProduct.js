import React, { useState, useEffect } from 'react'
import ImageUpload from '../../utils/ImageUpload';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setAlert} from '../../redux/_actions/alertAction'

const UploadProduct = ({history}) => {

  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    if(!auth.isAuthenticated){
      history.push('/')
    }
  }, [auth.isAuthenticated])

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    images: []
  })

  const {name, price, description, images} = product;

  const onChange = (e) => setProduct({...product, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {

    e.preventDefault();

    const data = {
      name,
      price,
      description,
      images
    }

    const res = await axios.post('/api/products', data);

    if(res.data.success){
      dispatch(setAlert('Product added successfully..', 'success'));
      setProduct({
        name: '',
        price: 0,
        description: '',
        images: []
      })
    }
  }

  const updateImages = (newImages) => {
    setProduct({...product, images: [...newImages]});
  }

  return (
    <div className="form-container">
    <h1>
     <span className="text-primary">Upload Product</span>
    </h1>
    <form onSubmit={onSubmit} className="grid-2" style={{marginTop: '20px'}}>
      <div>
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input type="text" name="name" value={name} onChange={onChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input type="number" name="price" value={price} onChange={onChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea name="description" value={description} onChange={onChange} cols="30" rows="10"></textarea>
      </div>
      <input type="submit" value="Add Product" className="btn btn-primary btn-block"/>
      </div>
      <ImageUpload  refreshFunction={updateImages}/>

    </form>
  </div>
)}

export default UploadProduct
