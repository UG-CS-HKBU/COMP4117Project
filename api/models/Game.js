/**
 * Game.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    gamename:
    {
      type:"string"
    },

    itemtype:{
      type:"string",
      defaultsTo:"桌遊"
    },

    category:
    {
      type:"string"
    },

    location:
    {
      type:"string"
    },

    photo:
    {
      type:"string"
    },

    serialno:
    {
      type:"string"
    },

    publisher:
    {
      type:"string"
    },

    expired:{
      type:"string",
      defaultsTo:"30"
    },

    gameborrowBy:{
      collection:"User",
      via:"gameborrow"
    },

    gamehistoryBy:{
      collection:"User",
      via:"gamehistory"
    },

    borrowdate:{
      type:"string",
    },

    status:{
      type:"string",
      defaultsTo:"可借取"
    },

    remarks:{
      type:'string',
    },

    avatar:{
      type:'string'
    },

    gamereserveBy:{
      collection:'User',
      via:"gamereserve"

    },

    borrowperson:{
      type:'string'
    },

    reserveperson:{
      type:'string'
    },

    reserveto:{
      type:"string",
    },



  },

};

