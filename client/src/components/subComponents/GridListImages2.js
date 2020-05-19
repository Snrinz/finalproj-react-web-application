import React, {useState, useContext, useEffect} from 'react';
import GridDisplay from './GridDisplay'
import Context from '../../utils/authUtils/Context';
import Spinner from '../layout/Spinner';
import FilterBar from './FilterBar'
import history from '../../utils/authUtils/history';

export default function GridListImage() {

  const [errors, setError] = useState({})
  const handleError = (err) => {
    setError(err);
  }

  const context = useContext(Context);    
  useEffect(() => {
    // fetch data
    fetch(`/api/image/`)
    .then(res => res.json())
    .then(res =>{ 
        if (res.errors) handleError(res.errors)
        else {
            setImages(res);
            fetch(`/api/user/like/${context.profileState._id}`, {"Authorization": context.profileState.token})
            .then(res => {
                if (res.ok) return res.json();
                else throw res.json();
            })
            .then(res => {
                let likes = res.like.map(e=>e._id);
                setFavor(likes);
            })
            .catch(err => console.log(err))
        }
        })
    .catch(err => {console.log(JSON.stringify(err)); handleError(err);  })
  },[])

  const [inFavorOnly, setInFavorOnly] = useState(true);

  const [favor, setFavor] = useState([]);
  // check user context then fetch image for user
  const [images, setImages] = useState([]);

  const handleInFavorChange = (e) => {
      setInFavorOnly(e.target.checked)
  }

  const handleClick = (_id) => { 
      let newFavor = favor.slice();
      let index = newFavor.indexOf(_id)
      
      if (index < 0)
          newFavor.push(_id)
      else console.log(newFavor.splice(index, 1))
      setFavor(newFavor); 
      
      let option = {  
        method: 'PUT', 
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': context.profileState.token,
            'Content-Type': 'application/json'
        }
      }
      fetch(`api/user/like/${context.profileState._id}?img=${_id}`, option)
      .then(res => {
          if (res.ok) return res.json()
          else throw res.json()
      })
      .then(res => {
          option.method = 'POST';
          option.body = res.like;
          fetch(`/api/image/find`, option)
          .then(res => res.json())
          .then(res => console.log(JSON.stringify(res)))
      })
      .catch(err => console.log(JSON.stringify(err)))
  }
  if (images === undefined || favor === undefined ||
    Object.keys(images).length === 0) {
        return <Spinner />;
  } else {
    return (<>
        {context.authState && <FilterBar inFavorOnly={inFavorOnly} handleInFavorChange={handleInFavorChange} />}
        <GridDisplay favor={favor} inFavorOnly={inFavorOnly} images={images} handleClick={handleClick} />
    </>
    )
  }
}