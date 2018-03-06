const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session')
const passport = require('passport');
const strategy = require(`./strategy.js`);
require('dotenv').config()

const app = express();
massive(process.env.CONNECTION_STRING).then( dbInstance => {
    console.log('connected to db')
    app.set('db', dbInstance)});

app.use( bodyParser.json() );
app.use( cors() );

app.use( session({
    secret: 'sup dude',
    resave: true,
    saveUninitialized: true
  }));
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get( '/login',
passport.authenticate('auth0',
  { successRedirect: '/me', failureRedirect: '/login1', failureFlash: true }
));

app.get('/me', ( req, res, next ) => {
  if ( !req.user ) {
    res.redirect('http://localhost:3000/#/');
  } else {
    console.log('I am the session', req.session.passport.user.id, typeof(req.session))
    console.log('I am the user', req.user.id)
    // req.session.user.authid = req.session.passport.user.id
    res.redirect('http://localhost:3000/#/dashboard');
    // req.user === req.session.passport.user
    // console.log( req.user )
    // console.log( req.session.passport.user );
    // res.status(200).send( JSON.stringify( req.user, null, 10 ) );
  }
});

app.get('/logout', (req, res, next ) => {
  req.logOut()
  req.session.destroy()
  res.redirect(302, 'http://sim3.auth0.com/v2/logout?returnTo=http://localhost:3000')
})

app.post('/api/create', function(req, res, next) {
  const db = app.get("db");
  console.log('created', req.body)
  db.create_profile([req.body.first_name, req.body.last_name, req.body.gender, req.body.hair_color, req.body.eye_color, req.body.hobby, req.body.birth_day, req.body.birth_month, req.body.birth_year, req.body.myImage, req.user.id])
  .then((response) => {
    console.log(response[0].id)
  res.status(200).send(response[0])})
  .catch((error) => res.send(error))
})

app.put('/api/update', function(req, res, next) {
  const db = app.get("db");
  console.log('updated', req.body.id)
  console.log('im user id', req)
  db.update_profile([req.body.first_name, req.body.last_name, req.body.gender, req.body.hair_color, req.body.eye_color, req.body.hobby, req.body.birth_day, req.body.birth_month, req.body.birth_year, req.body.id, req.body.myImage])
  .then((response) => res.status(200).send(response))
  .catch((error) => {
    // console.log('error', error)
    res.send(error)})
})

app.get('/api/checkUser', function(req, res, next) {
  const db = app.get("db");
  console.log('checking', req.user.id)
  db.check_user([req.user.id])
  .then((response) => {console.log(response); res.status(200).send(response)})
  .catch((error) => res.send(error))
})

app.get('/api/getinfo/:id', function(req, res, next) {
  const db = app.get("db");
  // const {userid} = req.params
  console.log('am i undef?',req.params.userid)
  db.get_user_info([req.params.id])
  .then((data) => {console.log('i am your get response', data); res.status(200).send(data)})

  .catch((error) => res.send(error))
})

app.get('/api/getOtherInfo', function(req, res, next) {
  const db = app.get("db");
  // console.log(req.session.user.authid)
  db.get_other_info()
  .then((response) => res.status(200).send(response))
  .catch((error) => res.send(error))
})

app.get('/api/searchFirstName/:first', function(req, res, next) {
  const db = app.get("db");
  db.search_firstname([req.params.first])
  .then((response) => res.status(200).send(response))
  .catch((error) => res.send(error))
})

app.get('/api/searchLastName/:last', function(req, res, next) {
  const db = app.get("db");
  db.search_lastname([req.params.last])
  .then((response) => res.status(200).send(response))
  .catch((error) => res.send(error))
})

app.post('/api/addFriend', function(req, res, next) {
  const db = app.get("db");
  console.log('did we hit it?rs', req.body)
  db.add_friend([req.body.friendId, req.body.userId])
  .then((response) => { console.log('added frienddddd', req.body); res.status(200).send(response)})
  .catch((error) => res.send(error))
})

app.delete('/api/removeFriend/:friendId/:userId', function(req, res, next) {
  const db = app.get("db");
  db.remove_friend([req.params.friendId, req.params.userId])
  .then((response) => res.status(200).send(response))
  .catch((error) => res.send(error))
})



const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );