const jwt = require('jsonwebtoken')
const config = require('../config')

const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');





const AuthController = { 

  register: async (req, res) => {

    // Params

    const {name, email, password} = req.body;

    if(!name || !email || !password) return res.status(400).json({msg: 'Faltan campos'});
    if(!validateEmail(email)) return res.status(400).json({msg: 'Email invalido!!'});
    const user =  await Users.findOne({email});
    if(user) res.status(400).json({msg: 'El correo ya existe!'});
    if(password.length < 6) res.status(400).json({msg: 'La contraseña debe contener minimo 8 caracteres!'});
     
    // Encriptamos la contraseña!!    
    const passwordHash = await bcrypt.hash(password, 12);

    let newUser =  new Users({
      name, email, password: passwordHash
    });

    // Const token
    const token = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign(newUser, process.env.REFRESH_TOKEN_SECRET, { expiresIn: config.refreshTokenLife})
     
    await newUser.save();

    res.status(200).json({
       token,
      refreshToken,
      "refreshTokenLife": config.refreshTokenLife
   });


  },

  login: async (req, res) => {
      try {

        const postData = req.body;

        const user = {
            "email": postData.email,
            "password": postData.password
        }

        const userSearch = await Users.findOne(postData.email);
        if(!userSearch) res.status(400).json({msg: 'El correo no existe!'});

        const isMatch = await bcrypt.compare(postData.password, userSearch.password);
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect."});

        // do the database authentication here, with user name and password combination.
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: config.tokenLife})
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: config.refreshTokenLife})
    
        res.status(200).json({
          "status": true,
           token,
          refreshToken,
          "refreshTokenLife": config.refreshTokenLife
      });

      } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },

  refreshToken: async  (req,res) => {
    try {
     // refresh the damn token
    const postData = req.body
    // if refresh token exists
    if(postData.refreshToken) {
       
      const user = {
            "email": postData.email,
            "name": postData.name
      }



    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: config.tokenLife})
        

        res.status(200).json({
          "token": token,
          "expiresIn": config.tokenLife
        });        


    } else { res.status(500).json({msg: 'Invalid request'}) } 


  } catch (err) {
      return res.status(500).json({msg: err.message})
   }
  },

  validateToken: async (req, res) => {
  try {

    res.status(200).json({msg: 'Token validate'})
  
  } catch (err) {
    return res.status(500).json({msg: err.message})
   } 
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


module.exports = AuthController;
