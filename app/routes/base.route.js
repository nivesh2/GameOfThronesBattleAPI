'use strict';

module.exports = function(app){

    const battles = require('../controller/battle.controller');

    app.get('/',(req,res)=>{
       res.redirect('index.html');
    });

    //api routes
    app.get('/list',battles.list);
    app.get('/count',battles.countRecords);
    app.get('/stats',battles.stats);
    app.get('/search',battles.search);

};
