/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    userindex: async function (req, res) {
        var id = req.session.userid
        var bookmodel = await User.findOne(id).populate("bookborrow", { sort: 'id DESC' });
        if (!bookmodel) return res.notFound();
        var bookmodel2 = await User.findOne(id).populate("bookhistory", { sort: 'id DESC' });
        if (!bookmodel) return res.notFound();
        var bookmodel3 = await User.findOne(id).populate("bookreserve", { sort: 'id DESC' });
        if (!bookmodel) return res.notFound();
        var gamemodel = await User.findOne(id).populate("gameborrow", { sort: 'id DESC' });
        if (!gamemodel) return res.notFound();
        var gamemodel2 = await User.findOne(id).populate("gamehistory", { sort: 'id DESC' });
        if (!gamemodel2) return res.notFound();
        var gamemodel3 = await User.findOne(id).populate("gamereserve", { sort: 'id DESC' });
        if (!gamemodel) return res.notFound();
        var materialmodel = await User.findOne(id).populate("materialborrow", { sort: 'id DESC' });
        if (!materialmodel) return res.notFound();
        var materialmodel2 = await User.findOne(id).populate("materialhistory", { sort: 'id DESC' });
        if (!materialmodel2) return res.notFound();
        var giftmodel = await User.findOne(id).populate("giftborrow", { sort: 'id DESC' });
        if (!giftmodel) return res.notFound();

        return res.view('item/userindex', {
            book: bookmodel.bookborrow,
            game: gamemodel.gameborrow,
            material: materialmodel.materialborrow,
            book2: bookmodel2.bookhistory,
            game2: gamemodel2.gamehistory,
            material2: materialmodel2.materialhistory,
            gift: giftmodel.giftborrow,
            book3: bookmodel3.bookreserve,
            game3: gamemodel3.gamereserve,
        });
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

    usernoti: async function (req, res) {
        var models = await Item.find().sort([{ id: 'DESC' }]);
        return res.view('item/usernoti', { noti: models });
    },

    useraccount: async function (req, res) {
        var id = req.session.userid
        var user = await User.findOne(id);
        return res.view('item/useraccount', { model: user });
    },

    vistornotlogin: async function (req, res) {
        return res.view('item/vistornotlogin');
    },

    adminnoti: async function (req, res) {
        var models = await Item.find().sort([{ id: 'DESC' }]);

        return res.view('item/adminnoti', { noti: models });
    },

    adminaccount: async function (req, res) {
        var id = req.session.userid
        var user = await User.findOne(id);
        return res.view('item/adminaccount', { model: user });
    },

    adminadditem: async function (req, res) {


        return res.view('item/adminadditem');
    },

    adminedititem: async function (req, res) {


        return res.view('item/adminedititem');
    },

    adminaddbook: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddbook');

        if (!req.body.Book)
            return res.badRequest("Form-data not received.");

        await Book.create(req.body.Book);

        return res.redirect('/book/adminbookedit');

        // return res.view('item/adminaddbook');
    },

    adminaddgame: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddgame');

        if (!req.body.Game)
            return res.badRequest("Form-data not received.");

        await Game.create(req.body.Game);

        return res.redirect('/game/admingameedit');
    },

    adminaddgift: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddgift');

        if (!req.body.Gift)
            return res.badRequest("Form-data not received.");

        await Gift.create(req.body.Gift);

        return res.redirect('/gift/admingiftedit');
    },

    adminaddmaterial: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddmaterial');

        if (!req.body.Material)
            return res.badRequest("Form-data not received.");

        await Material.create(req.body.Material);

        return res.redirect('/material/adminmaterialedit');
    },

    adminaddnoti: async function (req, res) {


        if (req.method == "GET")
            return res.view('item/adminaddnoti');

        if (!req.body.Item)
            return res.badRequest("Form-data not received.");

        await Item.create(req.body.Item);

        var models = await Item.find().sort([{ id: 'DESC' }]);

        return res.view('item/adminnoti', { noti: models });
    },

    adminaddaccount: async function (req, res) {

        if (req.method == "GET")
            return res.view('item/adminaddaccount');

        var thatAccount = await User.findOne({ username: req.body.username });

        if (thatAccount) {
            return res.status(409).send("不可使用現有帳戶的用戶名");
        }

        const salt = await sails.bcrypt.genSalt(10);

        const password = await req.body.password;

        const hash = await sails.bcrypt.hash(password, salt);

        await User.create(
            {
                username: req.body.username,
                password: hash,
                department: req.body.department,
                position: req.body.position,
                email: req.body.email,
                role: req.body.role
            });

        var models = await User.find({ role: "user" }).sort([{ id: 'DESC' }]);
        return res.view('item/adminuseredit', { user: models });
    },

    adminuseredit: async function (req, res) {
        var models = await User.find({ role: "user" }).sort([{ id: 'DESC' }]);
        return res.view('item/adminuseredit', { user: models });
    },

    // action - delete 
    adminuserdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await User.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "該用戶已被刪除", url: '/item/adminuseredit' });
        } else {

            return res.redirect("/item/adminuseredit");
        }

    },

    adminuserdetail: async function (req, res) {

        var model = await User.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('item/adminuserdetail', { user: model });

    },


    adminuserupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await User.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('item/adminuserupdate', { user: model });

        } else {


            // const salt = await sails.bcrypt.genSalt(10);

            // const password = await req.body.password;

            // const hash = await sails.bcrypt.hash(password, salt);

            var models = await User.update(req.params.id).set({
                username: req.body.username,
                //password: hash,
                email: req.body.email,
                department: req.body.department,
                position: req.body.position,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/item/adminuseredit");

        }
    },

    adminuserpwupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await User.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('item/adminuserpwupdate', { user: model });

        } else {


            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            var models = await User.update(req.params.id).set({
                password: hash,

            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/item/adminuseredit");

        }
    },






    adminaccountupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await User.findOne(req.session.userid);

            if (!model) return res.notFound();

            return res.view('item/adminaccountupdate', { user: model });

        } else {



            var models = await User.update(req.params.id).set({
                username: req.body.username,
                email: req.body.email,
                department: req.body.department,
                position: req.body.position,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/item/adminaccount");

        }
    },

    adminpasswordupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await User.findOne(req.session.userid);

            if (!model) return res.notFound();

            return res.view('item/adminpasswordupdate', { user: model });

        } else {


            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            var models = await User.update(req.params.id).set({
                password: hash,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/item/adminaccount");

        }
    },


    useraccountupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await User.findOne(req.session.userid);

            if (!model) return res.notFound();

            return res.view('item/useraccountupdate', { user: model });

        } else {

            var models = await User.update(req.params.id).set({
                username: req.body.username,
                email: req.body.email,
                department: req.body.department,
                position: req.body.position,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/item/useraccount");

        }
    },

    userpasswordupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await User.findOne(req.session.userid);

            if (!model) return res.notFound();

            return res.view('item/userpasswordupdate', { user: model });

        } else {


            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            var models = await User.update(req.params.id).set({
                password: hash,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/item/useraccount");

        }
    },

    noaccount: async function (req, res) {


        return res.view('item/noaccount');
    },

    wrongpassword: async function (req, res) {


        return res.view('item/wrongpassword');
    },

    cannotrenew: async function (req, res) {


        return res.view('item/cannotrenew');
    },

    visitoritemnotfound: async function (req, res) {


        return res.view('item/visitoritemnotfound')
    },

    useritemnotfound: async function (req, res) {


        return res.view('item/useritemnotfound')
    },

    adminitemnotfound: async function (req, res) {


        return res.view('item/adminitemnotfound')
    },










};

