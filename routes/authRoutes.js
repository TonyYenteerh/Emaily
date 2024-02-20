const passport = require('passport');

module.exports = app => {
app.get(
    '/auth/google',
    passport.authenticate('google', {  // String 'google ' 會連到 GoogleStrategy
        scope: ['profile', 'email']    // what we are asking Google to give us
    })
)

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    });
};
