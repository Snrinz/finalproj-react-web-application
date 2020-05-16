// jwt-passport.js
import passport from "passport";
import passportJWT from 'passport-jwt';
const JwtStrategy   = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

import userModel from '../models/userModel.js';
import { jwtSecret, ROLES } from '../config/jwtConfig.js';
import { logError } from "./util.js";

export const jwtPassport = () => {
    let params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("bearer"),
        secretOrKey: jwtSecret, // 'very-secret'
    }
    var strategy = new JwtStrategy(params, (jwt_payload, done) => {
        userModel.findOne({email:jwt_payload.email})
            .then(user => {
                if (user) {  return done(null, user);  }
                return done(null, false, "Invalid User");
            })
            .catch(err => { return done(err, false, { message: "Invalid Token Credential"} );  })
    });
    
    passport.use(strategy); // make passport use a specified strategy
    return {
        initialize: () => passport.initialize(),
        authenticate: (withSession=false) =>  
                passport.authenticate('jwt', { session: withSession }) // false: disable passport persistent session
    }
};
// role must use the ROLES.<name>, role here is a number (1,2,3)
export const isInRole = (role) => (req, res, next) => {
    if (!req.user) 
        return res.status(404).json(logError("Need to signin"))

    if (role === ROLES.owner && req.user.role === "user" && req.user._id.equals(req.params.userId))
        req.user.role = "owner";
    const hasRole = role <= ROLES[req.user.role];
    if (hasRole) return next();
    return res.status(404).json(logError(`Required ${ROLES.name(role)} authorization`))
}
/*
export const genHash = async function (password) {
    return await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            return hash;
        });
    });
}
*/