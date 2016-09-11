'use strict';
module.exports = function(){

  const debug = require('DEBUG')('main:loadCSV'),
        csv = require('fast-csv'),
        battle = require('../app/model/battle.model');

  csv
   .fromPath('./data/battles.csv',{headers:true,quote:'"'})
   .on('data', function(data){
       //parsing string to number for year,battle_number,etc
       parseToNumber(data);

       //inserting data into mongoDB
       battle.insert(data, (err,result)=>{
         if(err){
           return debug('Error while inserting data into DB',err);
         }
         debug(data,result);
       });
   })
   .on('end', function(){
       debug('Data parsed and loaded');
   });

   //helper function
   function parseToNumber(data){
       data.year = parseInt(data.year,10);
       data.battle_number = parseInt(data.battle_number,10);
       data.major_death = parseInt(data.major_death,10) ||'';
       data.major_capture = parseInt(data.major_capture,10) ||'';
       data.attacker_size = parseInt(data.attacker_size,10) || '';
       data.defender_size = parseInt(data.defender_size,10) || '';
       data.summer = parseInt(data.summer,10) || '';
   }


};
