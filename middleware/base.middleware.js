'use strict';

module.exports = function(app){
    const bodyParser = require('body-parser');
    const logger = require('morgan');
    const cors = require('cors');

    app.use(cors());

    app.use(bodyParser.urlencoded({ 
        extended:true,
        }));

    app.use(logger('dev'));
};
