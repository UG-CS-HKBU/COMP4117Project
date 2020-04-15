/**
 * Material.js
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
    materialname:
    {
      type:"string"
    },

    itemtype:{
      type:"string",
      defaultsTo:"物資"
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

    amount:
    {
      type:"number"
    },

    expired:{
      type:"string",
      defaultsTo:"30"
    },

    remarks:{
      type:'string',
    },

    materialborrowBy:{
      collection:"User",
      via:"materialborrow"
    },

    materialhistoryBy:{
      collection:"User",
      via:"materialhistory"
    },

    borrowdate:{
      type:"string",
    },


    status:{
      type:"string",
      defaultsTo:"avaliable"
    },

    avatar:{
      type:'string'
    },

  },

};

