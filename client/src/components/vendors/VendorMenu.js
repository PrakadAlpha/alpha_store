import React from 'react'
import {Link} from 'react-router-dom'

const VendorMenu = () => {
  return (
    <>
     <Link to="/vendors/home">Home</Link>
     <Link to="/vendors/uploadProduct">Upload Product</Link>
     <Link to="/vendors/ordersList">View Orders</Link>
     <Link to="/vendors/productsList">Your Products</Link>
    </>
  )
}

export default VendorMenu
