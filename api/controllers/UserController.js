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

        const historyBook= await Book.findOne(requirebook.id).populate("bookhistoryBy",{id :req.session.userid});

        if (!thatBook) return res.notFound();

        if (thatBook.bookborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        await User.addToCollection(req.session.userid, "bookborrow").members(requirebook.id);

        await User.addToCollection(req.session.userid, "bookhistory").members(requirebook.id);

        await Book.update(requirebook.id).set({ status: "borrowed" }).fetch();

        var borrowdate=new Date();
        
        await Book.update(requirebook.id).set({ borrowdate: borrowdate }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 31);

        var expireddate = date.getTime();

        await Book.update(requirebook.id).set({ expired: expireddate }).fetch();

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

    renewborrowbook: async function (req, res) {

        // const thatBook = await Book.findOne(req.params.fk).populate("bookborrowBy", { id: req.params.id });

        // const thatBook=await Book.findOne(req.params.id);
                                
        var date = new Date();

        date.setDate(date.getDate() + 15);

        var renewdate = date.getTime();

        await Book.update(req.params.fk).set({ expired: renewdate }).fetch();

        if (req.wantsJSON) {
            return res.json({ message: "已續借該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    addborrowgame: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requiregame = await Game.findOne({ gamename: req.body.qrcode });

        const thatGame = await Game.findOne(requiregame.id).populate("gameborrowBy", { id: req.session.userid });

        const historyGame= await Game.findOne(requiregame.id).populate("gamehistoryBy",{id :req.session.userid});

        if (!thatGame) return res.notFound();

        if (thatGame.gameborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        await User.addToCollection(req.session.userid, "gameborrow").members(requiregame.id);

        await User.addToCollection(req.session.userid, "gamehistory").members(requiregame.id);

        await Game.update(requiregame.id).set({ status: "borrowed" }).fetch();

        var borrowdate=new Date();
        
        await Game.update(requiregame.id).set({ borrowdate: borrowdate }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 31);

        var expireddate = date.getTime();

        await Game.update(requiregame.id).set({ expired: expireddate }).fetch();

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


    renewborrowgame: async function (req, res) {

        // const thatBook = await Book.findOne(req.params.fk).populate("bookborrowBy", { id: req.params.id });

        // const thatBook=await Book.findOne(req.params.id);

        var date = new Date();

        date.setDate(date.getDate() + 15);

        var renewdate = date.getTime();

        await Game.update(req.params.fk).set({ expired: renewdate }).fetch();

        if (req.wantsJSON) {
            return res.json({ message: "已續借該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    addborrowmaterial: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requirematerial = await Material.findOne(req.params.id);

        const thatMaterial = await Material.findOne(requirematerial.id).populate("materialborrowBy", { id: req.session.userid });

        const historyMaterial= await Material.findOne(requirematerial.id).populate("materialhistoryBy",{id :req.session.userid});

        if (!thatMaterial) return res.notFound();

        if (thatMaterial.materialborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        await User.addToCollection(req.session.userid, "materialborrow").members(requirematerial.id);

        await User.addToCollection(req.session.userid, "materialhistory").members(requirematerial.id);

        var borrowamount=req.body.amount;

        var orginalamount=thatMaterial.amount;

        await Material.update(requirematerial.id).set({ amount: orginalamount-borrowamount }).fetch()

        // await Material.update(requirematerial.id).set({ status: "borrowed" }).fetch();

        var borrowdate=new Date();
        
        await Material.update(requirematerial.id).set({ borrowdate: borrowdate }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 31);

        var expireddate = date.getTime();

        await Material.update(requirematerial.id).set({ expired: expireddate }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    removeborrowmaterial: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requirematerial = await Material.findOne(req.params.id);

        const thatMaterial = await  Material.findOne(requirematerial.id).populate("materialborrowBy", { id: req.session.userid });

        if (!thatMaterial) return res.notFound();

        if (!thatMaterial.materialborrowBy.length)
            return res.status(409).send("該物品沒有被借取");   // conflict

        await User.removeFromCollection(req.session.userid, "materialborrow").members(requirematerial.id);

        var returnamount=parseInt(req.body.amount);

        var orginalamount=parseInt(thatMaterial.amount);

        var calculation=parseInt(orginalamount+returnamount);

        await Material.update(requirematerial.id).set({ amount: calculation}).fetch()

        // await Material.update(requirematerial.id).set({ status: "avaliable" }).fetch();

        await Material.update(requirematerial.id).set({ expired: "30" }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },


    renewborrowmaterial: async function (req, res) {

        // const thatBook = await Book.findOne(req.params.fk).populate("bookborrowBy", { id: req.params.id });

        // const thatBook=await Book.findOne(req.params.id);

        var date = new Date();

        date.setDate(date.getDate() + 15);

        var renewdate = date.getTime();

        await Material.update(req.params.fk).set({ expired: renewdate }).fetch();

        if (req.wantsJSON) {
            return res.json({ message: "已續借該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    addborrowgift: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requiregift = await Gift.findOne(req.params.id);

        const thatGift = await Gift.findOne(requiregift.id).populate("giftborrowBy", { id: req.session.userid });

        // const historyMaterial= await Material.findOne(requirematerial.id).populate("materialhistoryBy",{id :req.session.userid});

        if (!thatGift) return res.notFound();

        // if (thatGift.materialborrowBy.length)
        //     return res.status(409).send("已經借取");   // conflict

        await User.addToCollection(req.session.userid, "giftborrow").members(requiregift.id);

        // await User.addToCollection(req.session.userid, "materialhistory").members(requirematerial.id);

        // await Gift.update(requirematerial.id).set({ status: "borrowed" }).fetch();

        var borrowdate=new Date();
        
        await Gift.update(requiregift.id).set({ borrowdate: borrowdate }).fetch();

        var borrowamount=req.body.amount;

        var orginalamount=thatGift.amount;

        await Gift.update(requiregift.id).set({ amount: orginalamount-borrowamount }).fetch()

        // var date = new Date();

        // date.setDate(date.getDate() + 31);

        // var expireddate = date.getTime();

        // await Material.update(requirematerial.id).set({ expired: expireddate }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },







};

