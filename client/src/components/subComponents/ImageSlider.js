import React, {useState, useEffect} from 'react';
import {Carousel} from 'react-bootstrap';

const ImageSlider = (props) => {
    const baseURL = 'http://localhost:4001/'
    const [errors, setError] = useState({})
    const handleError = (err) => {
      setError(err);
    }
  
    const {images} = props;
  
    const list = images.length>0? images.map( (img, i) => (
        <Carousel.Item key={i} style={{maxHeight:"500px"}}>
            <img
            className="d-block w-100 h-50"
            src={baseURL+img.pathName}
            alt={img.oriName}
            />
            <Carousel.Caption>
            <h3>{img.oriName}</h3>
            <p>No detail</p>
            </Carousel.Caption>
        </Carousel.Item>)): <Carousel.Item>No Top Image Yet!</Carousel.Item>;
    return (
        <Carousel className="container">
            {list}
        </Carousel>
    );
}

export default ImageSlider;