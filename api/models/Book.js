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

    bookhistoryBy:{
      collection:"User",
      via:"bookhistory"
    },

    bookreserveBy:{
      collection:'User',
      via:"bookreserve"

    },

    borrowdate:{
      type:"string",
    },

    expired:{
      type:"string",
      defaultsTo:"30"
    },

    reserveto:{
      type:"string",
    },

    status:{
      type:"string",
      defaultsTo:"可借取"
    },

    avatarPath: {
      type: 'string'
    },

    avatar:{
      type:'string'
    },

    label:{
      type:'string',
    },

    remarks:{
      type:'string',
      defaultsTo:""
    },

    borrowinfo:{
      type:'string',
      defaultsTo:""
    },

    returninfo:{
      type:'string',
      defaultsTo:"",
    },

    borrowperson:{
      type:'string'
    },

    reserveperson:{
      type:'string'
    },

    no:{
      type:'string'
    },

    compversion:{
      type:'string'
    }

    


    





  },

};

