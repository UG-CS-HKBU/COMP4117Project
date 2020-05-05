/**
 * User.js
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

    username: {
      type: "string",
      unique:true,
      required:true
    },
    
    password: {
      type: "string"
    },

    email: {
      type: "string"
    },

    department:{
      type: "string"
    },

    position:{
      type:"string"
    },

    role:{
      type:"string",
      defaultsTo:"user",
    },

    bookborrow:{
      collection:"Book",
      via:"bookborrowBy"
    },

    gameborrow:{
      collection:"Game",
      via:"gameborrowBy"
    },

    materialborrow:{
      collection:"Material",
      via:"materialborrowBy"
    },

    bookhistory:{
      collection:"Book",
      via:"bookhistoryBy"
    },

    gamehistory:{
      collection:"Game",
      via:"gamehistoryBy"
    },

    materialhistory:{
      collection:"Material",
      via:"materialhistoryBy"
    },

    giftborrow:{
      collection:"Gift",
      via:"giftborrowBy"
    },

    bookreserve:{
      collection:"Book",
      via:"bookreserveBy"
    },

    gamereserve:{
      collection:"Game",
      via:"gamereserveBy"
    }

    

  },

};

