require('dotenv').config()

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE_KEY);

module.exports = class AirtableAPI {
    
    constructor() {   
    }

    getAll(basename) {
        return base(basename).select({}).all();
    }

    getOne(basename, filter) {
        return base(basename).select({
            filterByFormula: filter
        }).all();
    }

}