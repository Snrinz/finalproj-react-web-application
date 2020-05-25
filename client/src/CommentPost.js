import React from 'react'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
// import { Redirect, Switch } from 'react-router-dom'
// import history from './utils/authUtils/history' //use if you want to redirect after submit

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
    handleSubmit: async( values, { setSubmitting, props }) => {  
        await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      })
      .then(response => {
        if (response.status !== 200) {
          console.log(response.statusText);
          throw response.status;
        }        
        return response.json()
      })
      .then( res => {
        props.edit()
      })
      .catch(err => { 
        console.log(err);
      });
      setSubmitting(false);
      
    },
    displayName: "PostForm"
  })(PostForm));

  export default CommentFormik;