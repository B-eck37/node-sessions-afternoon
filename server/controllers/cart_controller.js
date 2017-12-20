const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user
        const i = cart.findIndex(swag => swag.id == id)
        if(i === -1){
            const choice = swag.find(swag => swag.id == id);
                cart.push(choice);
                req.session.user.total += choice.price;
        }
        res.status(200).send(req.session.user)
    },
    // add: ( req, res, next ) => {
    //     const { id } = req.query;
    //     let { cart } = req.session.user;
    
    //     const index = cart.findIndex( swag => swag.id == id );
    
    //     if ( index === -1 ) {
    //       const selectedSwag = swag.find( swag => swag.id == id );
    
    //       cart.push( selectedSwag );
    //       req.session.user.total += selectedSwag.price;
    //     }
    
    //     res.status(200).send( req.session.user );
    //   },

    delete: (req,res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user
        const choice = swag.findIndex(swag => swag.id === id);
        // console.log(choice)
        if(choice){
        const i = cart.findIndex(swag => swag.id === id);
        console.log(i);
        cart.splice(i, 1);
        req.session.user.total -= choice.price
        }
        res.status(200).send(req.session.user);
    },

    checkout: (req, res, next) => {
        let {user} = req.session
        user.total = 0;
        user.cart = [];
        res.status(200).send(req.session.user)
    }
}