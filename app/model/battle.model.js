'use strict';

module.exports= (function(){
    const Data = require('mongoose').model('battle'),
          debug = require('debug')('main:battle_model'),
          that={};

    that.insert = (_data,cb) =>{
        const data = new Data(_data);

        data.save((err)=>{
            if(err){
                debug('Error: Data insertion failure');
                cb(err);
            }
            cb(null,'inserted');
        });
    };

    that.fetchPlaces = (cb) => {
        Data.find().distinct('location',(err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           data = data.filter((v)=>{
              return v!=='';
           });

           cb(null,data);
        });
    };

    that.countRecords = (cb) => {
        Data.count({},(err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null,data);
        });
    };

    that.fetchAll = (cb) => {

        Data.find({},(err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null,data);
        });
    };

    that.search = (_query,cb) => {
      debug('Query: ',_query);
        Data.find(_query,(err,data)=>{
           if(err){
                debug('Error: Data retrival failure');
                cb(err);
           }
           cb(null,data);
        });
    };

    return that;

})();
