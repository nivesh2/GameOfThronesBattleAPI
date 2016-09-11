'use strict';

module.exports = (function(){
    const battle = require('../../app/model/battle.model.js'),
          debug = require('debug')('main:battle-controller'),
          that = {};

    //private methods
    function getMostActive(data,type){
      let max = 0,
          key ='',
          input ={};
          
      data.forEach((v)=>{
        if(input[v[type]]!=null && v[type]!==''){
          input[v[type]]+=1;
        }else if(v[type]!==''){
          input[v[type]] =1;
        }
      });

      Object.keys(input).forEach((v)=>{

        if(input[v]>max){
          max = input[v];
          key = v;
        }
      });
      return key;
    }

    //public methods
    that.list = (req,res,next) => {
      debug('getting places list');

      battle.fetchPlaces((err,result)=>{
            if(err){
                return next(err);
            }
            res.json(result);
        });
    };

    that.countRecords = (req,res,next) =>{
      debug('getting count of records');

      battle.countRecords((err,result)=>{
              if(err){
                  return next(err);
              }
              res.json(result);
      });
    };



    that.stats = (req,res,next) =>{
      battle.fetchAll((err,result)=>{
              if(err){
                  return next(err);
              }

              const data = result;

              const arr = {
                'most_active':{},
                'attacker_outcome':{},
                'battle_type':[],
                'defender_size':{}
              };

              let attacker_outcome = {
                    win:0,
                    loss:0
                  },
                  battle_type ={},
                  defender_size = {
                    average:0,
                    min:0,
                    max:0
                  },
                  count=0,
                  listCount=0;

              data.forEach((v)=>{
                //attacker_outcome
                if(v.attacker_outcome === 'win'){
                  attacker_outcome.win+=1;
                }else if(v.attacker_outcome === 'loss'){
                  attacker_outcome.loss+=1;
                }

                //unique battle types
                if(battle_type[v.battle_type]==null && v.battle_type !== ''){
                  battle_type[v.battle_type]=1;
                }

                //stats for defender size
                if(v.defender_size!=='' && v.defender_size!= null){
                  listCount+=1;
                  //initialising max and min
                  if(count===0){
                    defender_size.max = v.defender_size;
                    defender_size.min = v.defender_size;
                  }
                  count +=v.defender_size;
                  if(v.defender_size > defender_size.max){
                    defender_size.max = v.defender_size;
                  }else if(v.defender_size < defender_size.min){
                    defender_size.min = v.defender_size;
                  }
                }
              });

              defender_size.average = count/listCount;

              arr.battle_type = Object.keys(battle_type);
              arr.defender_size ={
                'average':parseFloat(defender_size.average.toPrecision(6), 10),
                'min':defender_size.min,
                'max':defender_size.max
              };
              arr.attacker_outcome = {
                'win':attacker_outcome.win,
                'loss':attacker_outcome.loss
              };
              arr.most_active={
                'attacker_king':getMostActive(data,'attacker_king'),
                'defender_king':getMostActive(data,'defender_king'),
                'region':getMostActive(data,'region'),
                'name':getMostActive(data,'name')
              };
              res.send(arr);

      });
    };

    that.search = (req,res,next) =>{
      /* works for nested query string as well
       * example: /search?king=Robb Stark&location=Riverrun&type=siege
       */

      let searchQuery = {};

      if(req.query.name!=null){
        searchQuery.name = req.query.name ;
      }
      if(req.query.king!=null){
        searchQuery.$or=[ {'attacker_king':req.query.king}, {'defender_king':req.query.king} ];
      }
      if(req.query.type!=null){
        searchQuery.battle_type = req.query.type ;
      }
      if(req.query.location!=null){
        searchQuery.location = req.query.location ;
      }

      battle.search(searchQuery,(err,result)=>{
              if(err){
                  return next(err);
              }
              res.json(result);
      });

    };

    return that;

})();
