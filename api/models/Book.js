/**
 * Book.js
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
    bookname:
    {
      type:"string",
    },

    itemtype:{
      type:"string",
      defaultsTo:"書籍"
    },

    ISBN:
    {
      type:"string"
    },

    location:
    {
      type:"string"
    },

    category:
    {
      type:"string"
    },

    photo:
    {
      type:"string"
    },

    author:
    {
      type:"string"
    },

    publisher:
    {
      type:"string"
    },

    year:
    {
      type:"string"
    },

    bookborrowBy:{
      collection:"User",
      via:"bookborrow"
    },

    expired:{
      type:"string",
      defaultsTo:"30"
    },

    status:{
      type:"string",
      defaultsTo:"avaliable"
    },

    avatarPath: {
      type: 'string'
    },

    label:{
      type:'string',
    },

    remark:{
      type:'string',
      defaultsTo:""
    }



  },

};

