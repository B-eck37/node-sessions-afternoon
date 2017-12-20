const swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        const {category} = req.query;
        if(!category){
            res.status(200).send(swag)
        } else {
            const cat = swag.filter(swag => swag.category === category);
            res.status(200).send(cat)
        }
    }
    }



// const cat = swag.find(swag => swag.category == category);
// if(cat === undefined){
//     res.status(200).send(swag)
// } else {
//     for(i=0; i< swag.length; i++){
//         if(swag[i].category == category)
//     res.status(200).send(swag[i])


