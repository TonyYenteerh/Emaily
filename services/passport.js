const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');  // one arg: fetch sth. from mongoose, two args: load sth into it

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret :keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if(existingUser) {
                    // 有資料 傳 done(error, ) 告知 passport
                    done(null, existingUser);
                } else {
                    // new 一個 user Model ， persist 到 MongoDB
                    new User({ googleId : profile.id }).save()
                    .then(user => done(null, user));
                }
            })
        }
    )
);
