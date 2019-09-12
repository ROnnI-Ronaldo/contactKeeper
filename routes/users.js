const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@router       POST /api/users
//@desc         Register a user
//@access       Public

router.post('/', [
    check('name', 'Please write name')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Password must be at least 6 characters')
        .isLength({ min : 6 })
] , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array()})
    }

    const { name, password, email} = req.body

    try{
        //check if email already exist
        let user = await User.findOne({ email });

        if(user) {
            res.status(400).json({msg: 'User already exist'})
        }

        user = new User({
            name,
            password,
            email
        }); 

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn : 360000}, (err, token) => {
            if(err) throw err;
            res.json({ token });
        } )

        await user.save();
    }catch(err) {
        console.error(err),
        res.status(500).send('Server error')

    }

});

module.exports = router