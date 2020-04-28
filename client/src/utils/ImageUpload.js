import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios'

const ImageUpload = (props) => {

  const [Images, setImages] = useState([])

  const onDrop = async (files) => {

    let formData = new FormData();

    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }

    console.log(files[0])

    formData.append("file", files[0])

    console.log(formData);

   const res = await axios.post('/api/products/imageUpload', formData, config)

    if (res.data.success) {
        setImages([...Images, res.data.image])
        props.refreshFunction([...Images, res.data.image])
    } else {
        alert('Failed to save the Image in Server')
    }
}


const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images]
    newImages.splice(currentIndex, 1)

    setImages(newImages)
    props.refreshFunction(newImages)
}

  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-around', margin:'20px', marginTop: '10px' }}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '350px', height: '240px', border: '1px solid lightgray',display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <i className="fa fa-plus" aria-hidden="true" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img style={{ maxWidth: '350px', width: '300px', height: '240px' }} src={`http://localhost:5001/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}
            </div>
        </div>
  )
}

export default ImageUpload
