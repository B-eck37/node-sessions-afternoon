const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const {id} = req.query;
        const {user} = req.session
        const {cart} = req.session.user
        //Checking to see if item is in user's cart
        const i = cart.findIndex(swag => swag.id == id)
        //If it is, return the user object
        if(i != -1){
            res.status(200).send(user)
        //If it is not, push the item in the cart
        } else {
        const item = swag.find(swag => swag.id == id)
        cart.push(item)
        req.session.user.total += item.price
        }
        res.status(200).send(user)
    },

    remove: (req, res, next) => {
        const {id} = req.query;
        const{cart} = req.session.user;
        const item = cart.find(swag => swag.id == id)
        if(item){
        const i = cart.findIndex(swag => swag.id == id)
        cart.splice(i, 1);
        req.session.user.total -= item.price;

        }
        res.status(200).send(req.session.user)
    },

    checkout: (req, res, next) => {
        let {user} = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user);
    },
}