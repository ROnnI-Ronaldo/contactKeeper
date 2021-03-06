const express =  require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//@router       GET /api/auth
//@desc         Get a loged in user
//@access       Private

router.get('/', auth ,async (req,res) => {
    try {
        //get the user data except password
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

//@router       POST /api/auth
//@desc         Auth user and token
//@access       Public

router.post('/',  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array()})
    };
    
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user) {
           return res.status('400').json({ msg: 'Not valid credintials'})
        }

        let isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({ msg: 'Not valid credintials'})
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn : 360000}, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });


    }catch(err) {
        console.error(err);
        res.status(500).send('Server error')
    }
});

module.exports = router