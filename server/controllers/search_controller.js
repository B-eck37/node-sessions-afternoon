const swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        const {category} = req.query;
        const items = swag.filter(swag => swag.category == category);
        if(!items){
            res.status(200).send(swag)
        } else {
            res.status(200).send(items)
        }
    }
}


