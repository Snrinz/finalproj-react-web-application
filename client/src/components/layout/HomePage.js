import React, {useState, useEffect} from "react";
import ImageSlider from "../subComponents/ImageSlider";
import ImageCard from "../subComponents/ImageCard";
import {Alert} from 'react-bootstrap'
const HomePage = () => {
  const [errors, setError] = useState({})
  const handleError = (err) => {
    setError(err);
  }

  const [images, setImages] = useState([]);
  const [topImages, setTopImages] = useState([]);
  useEffect(() => {
    // fetch top images
    fetch(`/api/image/newTop`)
    .then(res => {
      if (res.ok) return res.json()
      else throw res})
    .then(res =>{ setTopImages(res) })
    .catch(err => {console.log(JSON.stringify(err)); handleError(err);  })

    // fetch all images data
    fetch(`/api/image/`)
    .then(res => {
      if (res.ok) return res.json()
      else throw res})
    .then(res =>{ 
      setImages(res);
    })
    .catch(err => {console.log(JSON.stringify(err)); handleError(err);  })
  }, []);

  return (
    <>
      <div className="container">
      <ImageSlider images={topImages}/>
      
      <Alert variant="info" className="display-4 mt-4 text-center">
        Image List:</Alert>
      <ImageCard images={images}/>
      </div>
    </>
  );
};

export default HomePage;
