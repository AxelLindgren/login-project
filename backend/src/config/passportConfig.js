const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const users = []; 

module.exports = (passport) => {
    passport.use(
        new LocalStrategy((username, password, done) => {
            const user = users.find((u) => u.username === username);
            if (!user) {
                return done(null, false, { message: 'No user with that username' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            });
        })
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        const user = users.find((u) => u.id === id);
        done(null, user);
    });
};
