const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contacts = require('../modules/Contacts');

//@Router       GET /api/contacts
//@Desc         Get all contacts
//@Access       Private

router.get('/', auth, async (req,res) => {
    try{
        const contacts = await Contacts.find({ user: req.user.id}).sort({ data: -1 });
        res.json(contacts)
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server errors')
    }
});

//@router       POST /api/contacts
//@desc         Register a contacts
//@access       Private

router.post('/', [auth, [
    check('name', 'Name is required')
        .not()
        .isEmpty()
]] ,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array()})
    }
    try{
        
        const { name, email, type, } = req.body
    
        const newContacts = new Contacts({
            name,
            email,
            type,
            user: req.user.id
        });

        const contact = await newContacts.save();
        res.json(contact);
    }catch(err) {
        console.error(err.message);
        res.status(500).json('Server error')
    }


});

//@router       DELETE /api/contacts:id
//@desc         Delete a constact
//@access       Private

router.delete('/:id',auth,async (req, res) => {
    const { name, email, type, phone} = req.body

    const contactField = {};

    if(name){ contactField.name = name};
    if(email){ contactField.email = email};
    if(type){ contactField.type = type};
    if(phone){ contactField.phone = phone};

    try {
        let contact = await Contacts.findById(req.params.id);
        if(!contact ) return res.status(404).json({ msg: 'Contact not found'});

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Anauthorised user'});
        };

        await Contacts.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact Removed'})

    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }


});

//@router       PUT /api/constacts:id
//@desc         Update a contact
//@access       Private

router.put('/:id',auth, async (req,res) => {
    const { name, email, type, phone} = req.body

    const contactField = {};

    if(name){ contactField.name = name};
    if(email){ contactField.email = email};
    if(type){ contactField.type = type};
    if(phone){ contactField.phone = phone};

    try {
        let contact = await Contacts.findById(req.params.id);
        if(!contact ) return res.status(404).json({ msg: 'Contact not found'});

        //make sure that the own user to delet own contacts
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Anauthorised user'});
        };

        contact = await Contacts.findByIdAndUpdate(req.params.id, { $set: contactField }, { new : true });

        res.json(contact)

    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }

});

module.exports = router