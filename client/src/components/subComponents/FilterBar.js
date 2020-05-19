import React, {userState} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default function FilterBar(props) {
    const {inFavorOnly, handleInFavorChange} = props;
    
    return (
      <FormControlLabel style={{margin:"auto"}}
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="favorite"
        checked={inFavorOnly}
        onChange={handleInFavorChange}
         />}
        label={inFavorOnly?"Show Only Favorite":"All Images"}
      />
    )}
