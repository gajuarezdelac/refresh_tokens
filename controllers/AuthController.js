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

    await newUser.save();

    // Const token
    const token = jwt.sign({name, email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign({name, email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: config.refreshTokenLife})
     
    res.status(200).json({
       token,
      refreshToken,
      "refreshTokenLife": config.refreshTokenLife
   });
  },

  login: async (req, res) => {
      try {

        const {email, password} = req.body;

        const user = await Users.findOne({email});
        if(!user) res.status(400).json({msg: 'El correo no existe!'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect."});

      
    // Const token
       const token = jwt.sign({id: user._id,name: user.name ,email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: config.tokenLife})
       const refreshToken = jwt.sign({id: user._id,name: user.name ,email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: config.refreshTokenLife})

        res.status(200).json({
          token,
          refreshToken,
         "refreshTokenLife": config.refreshTokenLife
      });

      } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  
  // Refresh tokens
  refreshToken: async  (req,res) => {
    try {
     // refresh the damn token
    const postData = req.body
    // if refresh token exists
    if(postData.refreshToken) {
       
      const user = {
            "email": postData.email,
            "password": postData.password
      }

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: config.tokenLife})

        res.status(200).json({
          "token": token,
          "expiresIn": config.tokenLife
        });        


    } else { res.status(500).json({msg: 'Invalid request'}) }   
  } catch (err) { return res.status(500).json({msg: err.message})}   
 },

 getUserInfo: async (req, res) => {
  try {

      const user = await Users.findById(req.user.id).select('-password');
      res.json(user);
      
  } catch (err) {
          return res.status(400).json({msg: err.message})
      }
  },

}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


module.exports = AuthController;
