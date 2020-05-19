import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {Alert} from 'react-bootstrap'

const NeedSignin = () =>  {
    const [redirect, setRedirect] = React.useState(false); 
    React.useEffect(() => {
        let timeoutId = setTimeout(() => setRedirect({ redirect: true }), 1000)
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])
     
    return (<>{
        redirect? <Redirect to='/signin' />
        : <div className="container">
            <Alert variant="warning" className="display-4 mt-4 text-center">
                You need to <Link to='/signin'>Signin</Link> first before using this content</Alert>
            </div>
    }</>)
}

export default NeedSignin