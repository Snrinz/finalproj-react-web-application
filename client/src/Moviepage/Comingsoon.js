import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import for Spinner
import Loading from '../Loading'
import moment from'moment';

//library for MovieCard
import { NavLink } from 'react-router-dom'
import { faStar } from "@fortawesome/free-solid-svg-icons"

// library for Search
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '5px 5px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    }
}));

export default function Homepage() {
    const classes = useStyles();
    const [coming_list, setComing_list] = useState({
        coming_list: [],
        isLoad: true
    })
    const [filter, setfilter] = useState("movie")
    const [value, setValue] = useState("")
    const [search_list, setSearch_list] = useState({
        search_list: [],
        isLoad: true
    })

    const handleChange = event => {
        setfilter(event.target.value);
    };

    const handleClick = event => {
        event.preventDefault();
        console.log("Enter!!!");
        
    }

    useEffect(() => {
        fetch(`/api/moviecomingsoon`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("data is " + res.movies[0].name);      
            setComing_list({coming_list:res.movies, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        })    
    }, []);

    useEffect(() => {
        if(value === "") return
        console.log("Filter is " + filter);
        console.log("Value is " + value);
        
        fetch(`/api/moviecomingsoon?filter=${filter}&&value=${value}`)
        .then(res => {
            if (res.ok) return res.json()
            else throw res
        })
        .then(res =>{ 
            console.log("Filter Success!!!")
            console.log(res.movies);            
            setSearch_list({search_list:res.movies, isLoad:false})
        })
        .catch(err => {
            console.log("error " + JSON.stringify(err)); 
        })         

    }, [value, filter])

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Paper component="form" className={classes.root}>
                        <FormControl className={classes.margin}>
                            <NativeSelect
                                id="demo-customized-select-native"
                                value={filter}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                >
                                <option value="movie">Movie</option>
                                <option value="type">Type</option>
                                <option value="actor">Actor</option>
                            </NativeSelect>
                        </FormControl>

                        <InputBase
                            className={classes.input}
                            placeholder="Search Movies . . ."
                            onChange={(event) => {
                                setValue(event.target.value);
                            }}
                            // onKeyUp={(e) => {if (e.keyCode === 13) {handleClick(e)}}}
                        />
                        <IconButton button="submit" onClick={handleClick} className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>

                <div style={{margin: '25px'}}>
                    <h1  id="title-summary" className="heading-label">Coming Soon</h1>
                {
                    (value !== "")?
                    <div>
                        {
                            (search_list.isLoad)?
                                <Loading />
                            :
                            (Object.keys(search_list.search_list).length > 0)?
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div className="trend-movie-section">
                                        <React.Fragment>
                                            {
                                                search_list.search_list.map(movie => (
                                                    <MovieCard key={movie._id} movie={movie} />
                                                ))
                                            }
                                        </React.Fragment>
                                            
                                    </div> 
                                </div>
                            :
                             <h3 style={{textAlign: 'center'}}>ไม่พบข้อมูลที่ค้นหา</h3>
                        }
                    </div>
                    :
                    <div>
                    {
                        (coming_list.isLoad)?
                            <Loading />
                        :
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div className="trend-movie-section">
                                    <React.Fragment>
                                        {
                                            coming_list.coming_list &&  coming_list.coming_list.map(movie => (
                                                <MovieCard key={movie._id} movie={movie} />
                                            ))
                                        }
                                    </React.Fragment>
                                        
                                </div> 
                            </div>
                    }
                    </div>
                }

                </div>
                
            </div>
        )

}

const MovieCard = (props) => {
    const { movie } = props
    return (            
        <div className="movie-card">
            <NavLink to={`/detail-movie/${movie._id}`} className="img-wrapper">
                <img id="movie-image" src={`./img/${movie.photo}`} alt={movie.photo}></img>
            </NavLink>
            
            <div className="rating-section">
                <FontAwesomeIcon  id="star" icon={faStar} /> {movie.rating}
            </div>

            <NavLink to={`/detail-movie/${movie._id}`} id="name-movie">
                <h2>{movie.name}</h2>
            </NavLink>

            <WatchListButton movie={movie}/>        
        </div>
    )
}

const WatchListButton = (props) => {
    const { movie } = props
    return (
        <div>
            <h4>{moment(movie.onAirTime).locale('th').format('LL')}</h4>
            {/* <button className="watch-button">+ Watch</button> */}
        </div>
    )
}