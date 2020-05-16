// file: controller/userController.js
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { jwtSecret } from "../config/jwtConfig.js";
import userModel from '../models/userModel.js';
import { isBlank, logError, validatorEmail } from '../util/util.js';
import {Buffer} from 'buffer';
import fs from 'fs';

const usrFieldProjection = { 
    __v: false,
    //_id: false,
    password: false,
    signupDate: false,
};

// Create and Save a new user
export let create = (req, res) => {
    let {firstName, lastName, email, phoneNo, password, role} = req.body;
    
    if (!firstName || !lastName || !email || !phoneNo || !password)
        return res.status(422).json(logError('Invalid user registration info.'));
    if (!validatorEmail(email)) 
        return res.status(422).json(logError('Invalid email address.'));
  
    role = isBlank(role)? 'user': (role==="admin" || role==='user')? role:'user';
  
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
        if (err) res.status(400).json(logError(err));
    
        var newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hash,
            role,
        })

        // Save User in the database
        userModel.init()
        .then(function() { // avoid dup by wait until finish building index
            newUser.save()
            .then(user => {
                res.json({success: true, message: 'User Registered', 
                          user: newUser.toNewRegisterJSON()});
            }).catch(err => {
                res.status(400).json(logError(err));
            });
        });
    });
})};
  
export let checkLogon = (req, res) => {
    const {email, password} = req.body;
    
    if (!email || !password) 
        res.status(422).json(logError("Required fields"));
    else {
        userModel.findOne({email: email})
        .then(user => {
            if (!user) {
                res.status(404).json(logError(err||"Not found email"));
            }
            else {
                if(user.validPassword(password)) {
                    res.json({user:user.toAuthJSON()})
                }
                else {
                res.status(401).json(logError("-Invalid credential"))};
            }
        })
        .catch(err => res.status(401).json(logError(err)))
    }
}


// Retrieve and return all Users from the database.
export let list = (req, res) => {
    userModel.find({}, usrFieldProjection)
    //  userModel.find({isDeleted:false}, usrFieldProjection) // not show deleted
    .then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json(logError(err));
    });
};

// Find a single User with a userId
export let get = (req, res) => {
    userModel.findById(req.params.userId)
    .then(user => {
        if(!user) {
            res.status(404).json(logError("User not found with id " + req.params.userId));
        }
        res.json({user: user.toProfileJSON()});
    }).catch(err => {
        res.status(404).json(logError(err));
    });
};

export let getImg = (req, res) => {
    userModel.findById(req.params.userId)
    .then(user => {
        if (!user) res.status(404).send("User not found with id " + req.params.userId)

        if (user.avatar && user.avatar.image) {
            // convert buffer to base64 and then return
            var img = Buffer.from(user.avatar.image, 'base64');
            res.writeHead(200, {
              'Content-Type': user.avatar.contentType,
              'Content-Length': img.length
            });
            res.end(img); 
        } 
        else res.send("No image yet")
    })
    .catch(err => res.status(404).send(err))
}

// Update a User identified by the userId in the request
export let put = (req, res) => {
   // Validate Request
   if (!req.body) res.status(422).json(logError('Need updated data'));
   let {firstName, lastName, email, avatar} = req.body;

   if (email && !validator.isEmail(email)) {
       res.status(422).json(logError('Invalid email address.'));
   }

   userModel.findByIdAndUpdate(req.params.userId,
                               {$set: {firstName, lastName, email}},
                               {new: true, runValidators: true})
   .then(user => {
       if(!user) {
           res.status(404).json(logError("User not found with id " + req.params.userId));
       }
        user.save().then(result => res.json({user: result.toProfileJSON()}))
        .catch(err => { res.status(422).json(logError(err))})
    })
    .catch(err => {res.status(404).json(logError(err))})
}

// Update an avatar identified by the userId in the request
export let putImg = (req, res) => {
    // Validate Request
    if (!req.body) res.status(422).json(logError('Need updated data'));

    if (req.files) {
        userModel.findById(req.params.userId)
        .then(user => {            
            if(!user) {
                res.status(404).json(logError("User not found with id " + req.params.userId));
            }
            var img = fs.readFileSync(req.files[0].path);

            var encode_image = img.toString('base64');
            // Define a JSONobject for the image attributes for saving to database
            
            var avatar = {
                 contentType: req.files[0].mimetype,
                 image:  Buffer.from(encode_image, 'base64')
            };
            req.files.forEach((file, i) => {
               fs.unlink(file.path, function (err) {
                    if (err) {
                        res.status(422).json("Cannot delete temp file");    
                    } 
                    console.log('successfully deleted tmp file');
                })
            })
            user.avatar = avatar;
            user.save().then(result => {                         
                res.contentType(user.avatar.contentType)
                res.send(user.avatar)
            }).catch(err => { res.status(422).send(err)})
        })
        .catch(err => {console.log(err); res.status(404).json(logError(err))})
    } else res.status(404).json(logError("No image file"))
};

// Delete a User with the specified userId in the request
export let deletePermanent = (req, res) => {
    userModel.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
           res.status(404).json(logError("User not found with id " + req.params.userId));
        }
        res.json({success: true, message: "User deleted successfully!"});
    }).catch(err => res.status(404).json(logError(err)))
};

export const validateToken = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = (authHeader.split(' ')[1]).trim();
        try {
            var decode = jsonwebtoken.verify(token, jwtSecret);
            res.json(decode);
        }
        catch (err) {
            res.status(422).json(logError(err));
        }
    }
    res.status(404).json(logError("Not found authorized header"));
};
