const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const jwt = require('jsonwebtoken');

// create new user
exports.signUp = ('/',(req, res, next)=>
{
  let password = req.body.password;
  let email = req.body.email;
  let salt = 10;
  console.log('password = '+password);
  console.log('email = '+email);

  bcryptjs.hash(password, salt)
  .then( hash => {
    const user = new User({
      email : email,
      password : hash
    });
    console.log('hash=>'+ hash);
    console.log(user);
    user.save()
    .then(      ()=> res.status(201).json( {message:'user added'} ) )
    .catch( error => res.status(400).json( { error } ) );
  })
  .catch(error => res.status(500).json({ error }) );
});


// authentification  function

exports.signIn = ('/', (req, res, next)=>
{
  let email =  req.body.email;
  let password =  req.body.password;

  console.log('try to login with : '+ email + 'password = '+password);
  User.findOne({ email : req.body.email })
        .then(user=>{

          if(!user)
          {
            console.log(email + ' user not found');
            return res.status(401).json({ error: 'e-mail error'});
          }
          else
          {
            console.log( email + ' user found => ' + user.email);
            console.log('next step : compare the password ... '+password+' with '+user.password);

            bcryptjs.compare(req.body.password, user.password)
            .then(valid=>
            {
              console.log('password comparing ...');
              if(!valid)
              {
                console.log('password not valid = '+ password );
                return res.status(401).json({ error: 'pwd error'});
              }

              console.log('the password is valid = '+ password );
              const token = jwt.sign( {userId : user._id}, process.env.RANDOM_SECRET_TOKEN, {expiresIn:'2h'});

              console.log(token);

              res.status(200).json({
                                    userId: user._id,
                                    token : token
                                  });
              })
            .catch(error=>res.status(500).json({error}));

          }
        })
        .catch(error=>res.status(500).json({error}));

});
