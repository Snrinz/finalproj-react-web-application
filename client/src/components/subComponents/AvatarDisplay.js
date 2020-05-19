import React, { useState, useEffect } from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
import {useDropzone} from 'react-dropzone';
import {Link} from 'react-router-dom'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SettingsBackupRestoreOutlinedIcon from '@material-ui/icons/SettingsBackupRestoreOutlined';

export default function AvatarDisplay(props) {
    const {context, classes} = props;

    const [initAvatarSrc, setInitAvatarSrc] = useState({img:null, mimetype: ''});
    const [avatarSrc, setAvatarSrc] = useState({img:null, mimetype: ''});
    const [avatarFile, setAvatarFile] = useState([]);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        let option = {  
            method: 'GET', 
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        }

        let contentType = '';
        fetch(`/api/user/avatar/${context.profileState._id}`, option)
        .then(res => {
            if (res.ok) {
                res.arrayBuffer().then((buffer) => {
                let base64Flag = `data:${contentType};base64,`;
                let imageStr = arrayBufferToBase64(buffer);
                let avatar = {img: base64Flag + imageStr, mimetype: contentType};
                setAvatarSrc(avatar);
                setInitAvatarSrc(avatar);
            })}
        })
        .catch(err => {console.log(err); setAvatarSrc({img:null, mimetype: ''}) })
    },[])
    const user = context.profileState;

    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        toBase64(acceptedFiles[0])
        .then(res => setAvatarSrc({img: res, mimetype:acceptedFiles[0].type}))
        .catch(err => console.log(err))
        
        setAvatarFile(acceptedFiles[0])
        setIsChange(true);
        }
    });
  
    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
    
      bytes.forEach((b) => binary += String.fromCharCode(b));
    
      return window.btoa(binary);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const createFormData = () => {
        const data = new FormData()
        data.append('img', avatarFile)
        data.append('email', user.email);
        return data;
    };
      
    const uploadAvatar = () => {
        let option = {  
            method: 'PUT', 
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            body: createFormData()
        }
        fetch(`/api/user/avatar/${user._id}`, option)
        .then(res => {if (res.ok) res.text(); else throw res})
        .then(res => setAvatarSrc(res.avatar)) 
        .catch(err => console.log(err))
        setIsChange(false);
    }

    const cancelUpload = () => {
        setAvatarSrc(initAvatarSrc); 
        setIsChange(false)
    }

    if (!context.authState) { 
        return <div className="alert alert-danger">Please <Link to="/signin">Sign in</Link> to check your profile </div>
    }
    else { 
        return (<>
        <ListItemAvatar>
            <Avatar className={classes.orange}>
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Avatar>
            <div style={{borderRadius:"50%"}} {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <Avatar alt={user.firstName} src={avatarSrc?avatarSrc.img:null} 
                    className={classes.large} >
            </Avatar>
            </div>
            {isChange && <>
                <IconButton color="primary" aria-label="upload picture" component="span"
                    onClick={uploadAvatar}>
                    <CloudUploadIcon /><span style={{fontSize:".5em"}}>Upload</span>
                </IconButton>
                <IconButton color="primary" aria-label="upload picture" component="span"
                onClick={cancelUpload}>
                    <SettingsBackupRestoreOutlinedIcon /><span style={{fontSize:".5em"}}>Restore</span>
                </IconButton>
            </>
            }
            <Avatar src={avatarSrc?avatarSrc.img:null} />
        </ListItemAvatar>
        <ListItemText primary={user.role} secondary="Role" />
    </>
    )};
  }