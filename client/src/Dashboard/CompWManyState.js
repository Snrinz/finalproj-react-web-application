import React, {useState} from 'react';

export default function CompWManyState2() {
  const [name, setName] = useState('John');
  const [age, setAge] = useState(42);
  const [todos, setTodos] = useState([{text: 'Practice use State'}]);
  const [date, setDate] = useState(new Date());
  let divTodos = todos.map((e,id)=><li key={id}>{e.text}</li>)

  return (
    <>
        <div>Name: {name}, <span> Age: {age}</span></div>
        <div>Report date: {date.toLocaleString()}</div>
        <h2>Thing to dos:</h2>
        <ol>{divTodos}</ol>
        <label htmlFor="todoChoice">Choose a task:</label>
        <select id="todoChoice" onChange={
            (e)=>{
                let value = e.target.selectedOptions[0].innerText;
                let newTodos = todos.slice();
                newTodos.push({text:value});
                setTodos(newTodos)
                console.log(todos);
            }}>
            <option value="1">Sleeping</option>
            <option value="2">Exercise</option>
            <option value="3">Swimming</option>
            <option value="4">Learn new things!</option>
        </select>
    </>
  );
}

export function CompWManyState1() {
  // ใช้ useState เดียว เพิ่มวัตถุที่มีหลาย properties และ 1 ฟังก์ชันการปรับปรุง 

  const [compState, setCompState] = useState({
      name: "John", age: 42, todos: [{text: 'Practice use State'}],
      date:new Date()});
  
  let {name, age, todos, date} = compState;
  let divTodos = todos.map((e,id)=><li key={id}>{e.text}</li>)
  return (<div>
    <div>Name: {name}, <span> Age: {age}</span></div>
    <div>Report date: {date.toLocaleString()}</div>
    <h2>Thing to dos:</h2><ol>{divTodos}</ol>
   <label forHtml="todoChoice">Choose a task</label>
   <select id="todoChoice" onChange={
     (e)=>{
        let value = e.target.selectedOptions[0].innerText;
        let newTodos = todos.slice();
        newTodos.push({text: value});
        setCompState({...compState, todos: newTodos});
     }
   }>
     <option value="1">Sleeping</option>
     <option value="2">Swimming</option>
     <option value="3">Watching TV</option>
     <option value="4">Do Homework</option>
   </select>
</div>);
}







// import React, { useState, useEffect } from 'react'
// import { withFormik } from 'formik'
// import { withRouter } from 'react-router-dom';
// import * as Yup from 'yup';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));


// const MovieForm = (props) => {      
//     const classes = useStyles();
//     const [movie, setMovie] = useState(props.movie)

//     const handleSubmit = (event) => {
        
//     }

//     return (
//         <form className={classes.root} onSubmit={handleSubmit}>
//             {/* <img id="image-detail-movie" src={require(`../img/${movie.photo}`)} 
//             alt={movie.photo}></img> */}

//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         autoComplete="name"
//                         name="name"
//                         variant="outlined"
//                         required
//                         fullWidth
//                         id="name"
//                         label="ชื่อภาพยนตร์"
//                         onChange={event => setMovie({...movie, name: event.target.value})}
//                         defaultValue={movie.name}
//                         autoFocus
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         autoComplete="type"
//                         name="type"
//                         variant="outlined"
//                         required
//                         fullWidth
//                         id="type"
//                         label="ประเภท"
//                         onChange={event => setMovie({...movie, type: event.target.value})}
//                         defaultValue={movie.type}
//                         autoFocus
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         autoComplete="actor"
//                         name="actor"
//                         variant="outlined"
//                         required
//                         fullWidth
//                         id="actor"
//                         label="นักแสดง"
//                         onChange={event => setMovie({...movie, actor: event.target.value})}
//                         defaultValue={movie.actor}
//                         autoFocus
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         autoComplete="actor"
//                         name="actor"
//                         variant="outlined"
//                         required
//                         fullWidth
//                         id="actor"
//                         label="นักแสดง"
//                         onChange={event => setMovie({...movie, actor: event.target.value})}
//                         defaultValue={movie.actor}
//                         autoFocus
//                     />
//                 </Grid>
//           </Grid>
//         </form>
//     )
// }

// const MovieFormFormik = withRouter(withFormik({
//     mapPropsToValues: () => ({ name, type, description, trailer, director, company, photo }) => {
//       return {
//         name: name || "",
//         type: type || "",
//         description: description || "",
//         trailer: trailer || "",
//         director: director || "",
//         company: company || "",
//         photo: photo || "",

//       };
//     },
//     validationSchema: Yup.object().shape({
//         comment: Yup.string()
//         .required()
//     }),
//     handleSubmit: (values, { setSubmitting}) => {
  
//       fetch('/api/reviews', {
//         method: 'POST',
//         body: JSON.stringify(values),
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//       })
//       .then(response => {
//         if (response.status !== 200) {
//           console.log(response.statusText);
//           throw `Status Code: ${response.status} ${response.statusText}`;
//         }

//         return response.json()
//       })
//       .catch(err => { 
//         console.log(err);
//       });
//       setSubmitting(false);
//     },
//     displayName: "MovieForm"
//   })(MovieForm));

  export default MovieForm;