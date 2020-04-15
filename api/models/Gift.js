/**
 * Gift.js
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
    giftname:
    {
      type:"string"
    },

    itemtype:{
      type:"string",
      defaultsTo:"禮物"
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

    donator:
    {
      type:"string"
    },

    value:
    {
      type:"number"
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

    giftborrowBy:{
      collection:"User",
      via:"giftborrow"
    },

    borrowdate:{
      type:"string",
    },

    avatar:{
      type:'string'
    },

  },

};

