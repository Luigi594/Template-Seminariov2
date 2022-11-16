import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersGoogle } from '@server/libs/GoogleUsers';

const user = new UsersGoogle();

passport.use(
  new Strategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.secretClient,
      callbackURL: process.env.callback,
    },
    function (_accessToken, _refreshToken, profile, done) {
      user.signInOrLoginWithGoogle(
        profile.displayName,
        profile.photos[0].value,
        profile.emails[0].value,
        profile.id,
      );

      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
