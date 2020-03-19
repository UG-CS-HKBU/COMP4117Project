/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    userindex: async function (req, res) {
        

        return res.view('item/userindex');
    },

    adminindex: async function (req, res) {
        

        return res.view('item/adminindex');
    },

    usersearch: async function (req, res) {
        

        return res.view('item/usersearch');
    },

    vistorsearch: async function (req, res) {
        

        return res.view('item/vistorsearch');
    },

    adminsearch: async function (req, res) {
        

        return res.view('item/adminsearch');
    },

    usernoti:async function(req,res){
        return res.view('item/usernoti');
    },

    useraccount:async function(req,res){
        return res.view('item/useraccount');
    },

    vistornotlogin:async function(req,res){
        return res.view('item/vistornotlogin');
    },

    adminnoti: async function (req, res) {
        

        return res.view('item/adminnoti');
    },

    adminaccount: async function (req, res) {
        

        return res.view('item/adminaccount');
    },

    adminadditem: async function (req, res) {
        

        return res.view('item/adminadditem');
    },

    
    adminaddbook: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddbook');

        if (!req.body.Book)
            return res.badRequest("Form-data not received.");

        await Book.create(req.body.Book);

        return res.view('item/adminaddbook')
    },

    adminaddgame: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddgame');

        if (!req.body.Game)
            return res.badRequest("Form-data not received.");

        await Game.create(req.body.Game);

        return res.view('item/adminaddgame')
    },

    adminaddgift: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddgift');

        if (!req.body.Gift)
            return res.badRequest("Form-data not received.");

        await Gift.create(req.body.Gift);

        return res.view('item/adminaddgift')
    },

    adminaddmaterial: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddmaterial');

        if (!req.body.Material)
            return res.badRequest("Form-data not received.");

        await Material.create(req.body.Material);

        return res.view('item/adminaddmaterial')
    },

    
  

};

