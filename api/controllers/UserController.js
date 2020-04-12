/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.redirect("/item/noaccount");

        //if (!user) return res.status(401).send("User not found");

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        //if (!match) return res.status(401).send("Wrong Password");

        if (!match) return res.redirect("/item/wrongpassword");


        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;

            req.session.userid = user.id;

            req.session.userrole = user.role;

            sails.log("[Session] ", req.session);

            // return res.ok("Login successfully.");


            if (req.session.userrole == "admin") {
                return res.redirect("/item/adminindex");
            }
            else if (req.session.userrole == "user") {
                return res.redirect("/item/userindex");
            }




            // else if (user.role == "admin") {
            //     return res.redirect("/item/homepage");
            // }


        });



    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");
            // return res.redirect("/apartment/visitorindex")

        });
    },

    bookborrow: async function (req, res) {
        if (!await User.findOne(req.params.id)) return res.notFound();

        const thatBook = await Book.findOne(req.params.fk).populate("bookborrowBy", { id: req.params.id });

        if (!thatBook) return res.notFound();

        if (thatBook.bookborrowBy.length)
            return res.status(409).send("Already added.");   // conflict

        await User.addToCollection(req.params.id, "bookborrow").members(req.params.fk);

        return res.ok('Operation completed.');
    },

    borrowlist: async function (req, res) {
        var model = await User.findOne(req.params.id).populate("corent");

        if (!model) return res.notFound();

        return res.view('apartment/clientrental', { apartment: model.corent });

    },

    addborrowbook: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requirebook = await Book.findOne({ bookname: req.body.qrcode });

        const thatBook = await Book.findOne(requirebook.id).populate("bookborrowBy", { id: req.session.userid });

        if (!thatBook) return res.notFound();

        if (thatBook.bookborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        await User.addToCollection(req.session.userid, "bookborrow").members(requirebook.id);

        await Book.update(requirebook.id).set({ status: "borrowed" }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 30);

        var borrowdate = date.getTime();

        await Book.update(requirebook.id).set({ expired: borrowdate }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    removeborrowbook: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requirebook = await Book.findOne({ bookname: req.body.qrcode });

        const thatBook = await Book.findOne(requirebook.id).populate("bookborrowBy", { id: req.session.userid });

        if (!thatBook) return res.notFound();

        if (!thatBook.bookborrowBy.length)
            return res.status(409).send("該物品沒有被借取");   // conflict

        await User.removeFromCollection(req.session.userid, "bookborrow").members(requirebook.id);

        await Book.update(requirebook.id).set({ status: "avaliable" }).fetch();

        await Book.update(requirebook.id).set({ expired: "30" }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    addborrowgame: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requiregame = await Game.findOne({ gamename: req.body.qrcode });

        const thatGame = await Game.findOne(requiregame.id).populate("gameborrowBy", { id: req.session.userid });

        if (!thatGame) return res.notFound();

        if (thatGame.gameborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        await User.addToCollection(req.session.userid, "gameborrow").members(requiregame.id);

        await Game.update(requiregame.id).set({ status: "borrowed" }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 30);

        var borrowdate = date.toDateString();

        await Game.update(requiregame.id).set({ expired: borrowdate }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    removeborrowgame: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requiregame = await Game.findOne({ gamename: req.body.qrcode });

        const thatGame = await Game.findOne(requiregame.id).populate("gameborrowBy", { id: req.session.userid });

        if (!thatGame) return res.notFound();

        if (!thatGame.gameborrowBy.length)
            return res.status(409).send("該物品沒有被借取");   // conflict

        await User.removeFromCollection(req.session.userid, "gameborrow").members(requiregame.id);

        await Game.update(requiregame.id).set({ status: "avaliable" }).fetch();

        await Game.update(requiregame.id).set({ expired: "30" }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    renewborrowbook: async function (req, res) {

        // const thatBook = await Book.findOne(req.params.fk).populate("bookborrowBy", { id: req.params.id });

        // const thatBook=await Book.findOne(req.params.id);

        var date = new Date();

        date.setDate(date.getDate() + 30);

        var renewdate = date.getTime();

        await Book.update(req.params.fk).set({ expired: renewdate }).fetch();

        if (req.wantsJSON) {
            return res.json({ message: "已續借該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },






};

