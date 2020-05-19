import React from "react";
import {Alert} from 'react-bootstrap'
const NotFoundPage = (props) => {
  return (
    <>
      <div className="container">
      <Alert variant="warning" className="display-4 mt-4 text-center">
        Sorry: Not found the requested page { props.location}</Alert>
      </div>
    </>
  );
};

export default NotFoundPage;
