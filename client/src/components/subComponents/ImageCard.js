import React from 'react';
import { Link } from 'react-router-dom';
import {CardDeck, Card} from 'react-bootstrap'

const ImageCard = ({images}) => {
  const baseURL = 'http://localhost:4001/'
  const cards = images.map((e,i) => {
    return (
      <Card border="info" className="d-lg-inline-flex mx-auto col-lg-3">
          <Card.Img top width="100%" height="300px" src={baseURL+e.pathName} alt={e.oriName} />
      <Card.Header>{e.oriName}</Card.Header>
      </Card>)
  });
  return (
      <div className="flex justify-content-center">
           {cards}
      </div>
  )
}
export default ImageCard;
