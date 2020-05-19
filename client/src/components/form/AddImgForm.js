import React, {useState} from 'react';
import { withFormik } from 'formik';
import {useDropzone} from 'react-dropzone';
import "./dropzoneStyle.css";
//import history from '../../utils/authUtils/history' //use if you want to redirect after submit

const ImgForm = props => {
    const {
        values,
        touched,
        errors,
        setFieldValue,
        handleSubmit,
        resetForm,
        status,
        setStatus,
        isSubmitting,
    } = props;
      
    const accept = 'image/*';
    const dropFiles = acceptedFiles => {
        let currentFiles = [];
        if (values.uploadImgs.length == 0) {
            currentFiles = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        }
        else {
            let filenames = values.uploadImgs.map(file => file.name) 
            let newFiles = acceptedFiles.filter(file => !filenames.includes(file.name))
            newFiles = newFiles.map(file =>
                    Object.assign(file, {preview: URL.createObjectURL(file) })
            );
            let tmpFiles = values.uploadImgs.slice();
            currentFiles = newFiles.concat(tmpFiles);
        }
        setFieldValue("uploadImgs", currentFiles); // this return files to formik if any
        if (status && status.message) setStatus({})
    }

    const trashImg = (file) => {
        const r = window.confirm(`Are you sure to remove this image? ${file.name}`); 
        if(r === true){ 
            let filter = values.uploadImgs.slice().filter(item=>item.name !== file.name);
            //URL.revokeObjectURL(file.preview);
            setFieldValue("uploadImgs", filter); // this return files to formik if any
        }
    }
    const thumbs = values.uploadImgs.map(file => (
        <>
        <div className="dropzoneThumb" key={file.path}>
            <div className="dropzoneImgThumbLabel">
                {file.name}-{file.size}{" "}bytes-{file.type}
            </div>
            <div className="dropzoneThumbInner">
            <img src={file.preview} alt={file.path} className="dropzoneImg" />
            </div>
            <i className="far fa-trash-alt thumbTrash" title="Remove" onClick={()=>trashImg(file)}/>
        </div>
        </>
    ));
    
    const {getRootProps, getInputProps, /*open*/} = useDropzone({accept, onDrop:dropFiles});
    
    return (<>
        <h3>Select Upload Files</h3>
        <form enctype='multipart/form-data' onSubmit={handleSubmit} disabled={isSubmitting} onReset={resetForm}>
            <section className="dropzoneContainer" >
                <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            </section>
            {errors.global && <div className="alert alert-danger" id="feedback">{errors.global}</div>}
            {status && status.message && (
                <div className="alert alert-info">{status.message}</div>
            )}
            <button type='submit'>Submit</button>
            <button type='reset' >Reset</button>
        </form>
        <aside className="dropzoneThumbsContainer">
        {thumbs}
        </aside>
    </>);
};

const createFormData = (values) => {
  const data = new FormData()
  const {uploadImgs, ...rest} = values;
  for (let i = 0; i < uploadImgs.length; i++) {
    data.append(uploadImgs[i].name, uploadImgs[i])
  }
//  data.append('what', "admin's images");
  Object.keys(rest).forEach(e => data.append(e, rest[e]));
  return data;
};

const AddImgForm = withFormik({
  mapPropsToValues: ({uploadImgs, status}) => ({ uploadImgs: [], status: {} }),

  handleSubmit: (values, props) => {
    const { setSubmitting, setErrors, resetForm, setStatus } = props;
    let formData = createFormData(values);
    fetch(`/api/image/add/`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        values.uploadImgs.forEach(file => {
            URL.revokeObjectURL(file.preview);
        })
        resetForm({uploadImgs:[]})
        setStatus({message:`Insert: ${response.success.nInserted}, Modified: ${response.success.nModified}`});
    //      history.push('/');  // redirect after sucess submission
      }
      else {
        throw response
      }
    }) 
    .catch(err => { setErrors({global: err.errors.global})})
    setSubmitting(false);
  },
  handleReset: (values, { setErrors, resetForm, setStatus }) => {
    if (values.uploadImgs.length > 0) {
        values.uploadImgs.forEach(file => {
            URL.revokeObjectURL(file.preview);
        })
    }
    setErrors({errors:{}});
    resetForm({uploadImgs:[]});
    setStatus({message:''});
  },
  displayName: 'AdddImgForm',
})(ImgForm);

export default AddImgForm;