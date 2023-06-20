import passport from "passport";
import pkg from "passport-jwt";

import User from "../models/User.js";
import * as dotenv from "dotenv";
dotenv.config();

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const isuserfound = await User.findById({ _id: jwt_payload._id });
        if (isuserfound) {
          return done(null, isuserfound);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
