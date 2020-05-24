import React from 'react'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
// import { Redirect, Switch } from 'react-router-dom'
import history from './utils/authUtils/history' //use if you want to redirect after submit

const PostForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      values.userId = props.userId
      values.movieId = props.movieId
      
    return (
        <div className="post-section">
            <form onSubmit={handleSubmit}>
                <textarea name="text-post" 
                    type="text" 
                    placeholder="Type text in here . ."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                    name="comment"
                    required
                    />
                {errors.comment && touched.comment && errors.comment}    
                
                <input type="submit" />
            </form>   
        </div>
    )
}

const CommentFormik = withRouter(withFormik({
    mapPropsToValues: () => ({ comment, userId, movieId }) => {
      return {
        comment: comment || "",
        userId: userId || "",
        movieId: movieId || ""
      };
    },
    validationSchema: Yup.object().shape({
        comment: Yup.string()
        .required()
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
  
      fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      })
      .then(response => {
        if (response.status !== 200) {
          console.log(response.statusText);
          throw `Status Code: ${response.status} ${response.statusText}`;
        }
        return response.json()
      })
      // .then(res => {
      //   // let history = props.history; //useHistory();
      //   // let location = props.location; //useLocation();    
      //   // let { from } = location.state || { from: { pathname: `/detail-movie/${props.movieId}` } };        
      //   // history.replace(from);
      //   return <Switch><Redirect to="{`/detail-movie/${props.movieId}`}" /></Switch>
      // })
      .then(response => {
        history.push(`/detail-movie/${props.movieId}`);
      })
      .catch(err => { 
        console.log(err);
      });
      setSubmitting(false);
    },
    displayName: "PostForm"
  })(PostForm));

  export default CommentFormik;