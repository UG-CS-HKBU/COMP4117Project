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

    addborrowbook: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const thatUser = await User.findOne(req.session.userid);

        const requirebook = await Book.findOne({ bookname: req.body.qrcode });

        const borrowBook = await Book.findOne(requirebook.id).populate("bookborrowBy", { id: req.session.userid });

        const reserveBook = await Book.findOne(requirebook.id).populate("bookreserveBy", { id: req.session.userid });

        if (!borrowBook) return res.notFound();

        if (borrowBook.bookborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        if (requirebook.borrowperson != thatUser.username && requirebook.borrowperson != "") {
            return res.status(409).send("已被他人借取");
        }

        if (requirebook.reserveperson != thatUser.username && requirebook.reserveperson != "") {
            return res.status(409).send("已被他人預約");
        }

        await User.addToCollection(req.session.userid, "bookborrow").members(requirebook.id);

        await Book.update(requirebook.id).set({ status: "已被"+thatUser.username+"借取" }).fetch();

        await Book.update(requirebook.id).set({ borrowperson: thatUser.username }).fetch();

        var borrowdate = new Date();

        await Book.update(requirebook.id).set({ borrowdate: borrowdate }).fetch();

        await Book.update(requirebook.id).set({ borrowinfo: thatUser.username + " " + new Date(borrowdate).toLocaleDateString() }).fetch();

        await Book.update(requirebook.id).set({ returninfo: "" }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 31);

        var expireddate = date.getTime();

        var expireddate2 = date;

        await Book.update(requirebook.id).set({ expired: expireddate }).fetch();

        const historyBook = await Book.findOne(requirebook.id).populate("bookhistoryBy", { id: req.session.userid });

        await User.addToCollection(req.session.userid, "bookhistory").members(requirebook.id);

        if(requirebook.reserveperson==thatUser.username)
        {
            await User.removeFromCollection(req.session.userid, "bookreserve").members(requirebook.id);
        }


        // await sails.helpers.sendSingleEmail({
        //     to: 'leungjay0424@gmail.com',
        //     from: sails.config.custom.mailgunFrom,
        //     subject: '借用書本通知',
        //     text: '你已借用書本('+thatBook.bookname+ ') 請於'+new Date(expireddate2).toLocaleDateString()+'前歸還',
        // });

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    addreservebook: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const thatUser = await User.findOne(req.session.userid);

        const requirebook = await Book.findOne(req.params.id);

        const borrowBook = await Book.findOne(requirebook.id).populate("bookborrowBy", { id: req.session.userid });

        const reserveBook = await Book.findOne(requirebook.id).populate("bookreserveBy", { id: req.session.userid });

        if (!reserveBook) return res.notFound();

        if (reserveBook.bookreserveBy.length)
            return res.status(409).send("已經預約");   // conflict

        if (borrowBook.bookborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        if (requirebook.borrowperson != thatUser.username && requirebook.borrowperson != "") {
            return res.status(409).send("已被他人借取");
        }

        if (requirebook.reserveperson != thatUser.username && requirebook.reserveperson != "") {
            return res.status(409).send("已被他人預約");
        }

        await User.addToCollection(req.session.userid, "bookreserve").members(requirebook.id);

        await Book.update(requirebook.id).set({ status: "已被" + thatUser.username + "預約" }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 4);

        var expireddate = date.getTime();

        await Book.update(requirebook.id).set({ reserveto: expireddate }).fetch();

        await Book.update(requirebook.id).set({ reserveperson: thatUser.username }).fetch();

        // await sails.helpers.sendSingleEmail({
        //     to: 'leungjay0424@gmail.com',
        //     from: sails.config.custom.mailgunFrom,
        //     subject: '預約書本通知',
        //     text: '你已預約書本('+thatBook.bookname+') 請於3天內借取 如不需要 請取消預約',
        // });

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已預約該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    removereservebook: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requirebook = await Book.findOne(req.params.id);

        const thatBook = await Book.findOne(requirebook.id).populate("bookreserveBy", { id: req.session.userid });

        if (!thatBook) return res.notFound();

        if (!thatBook.bookreserveBy.length)
            return res.status(409).send("該物品沒有被預定");   // conflict

        await User.removeFromCollection(req.session.userid, "bookreserve").members(requirebook.id);

        await Book.update(requirebook.id).set({ status: "可借取" }).fetch();

        await Book.update(requirebook.id).set({ reserveto: "" }).fetch();

        await Book.update(requirebook.id).set({ reserveperson: "" }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已取消預定該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    removeborrowbook: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const thatUser = await User.findOne(req.session.userid);

        const requirebook = await Book.findOne({ bookname: req.body.qrcode });

        const thatBook = await Book.findOne(requirebook.id).populate("bookborrowBy", { id: req.session.userid });

        if (!thatBook) return res.notFound();

        if (!thatBook.bookborrowBy.length)
            return res.status(409).send("該物品沒有被借取");   // conflict

        await User.removeFromCollection(req.session.userid, "bookborrow").members(requirebook.id);

        await Book.update(requirebook.id).set({ status: "可借取" }).fetch();

        await Book.update(requirebook.id).set({ expired: "30" }).fetch();

        await Book.update(requirebook.id).set({ borrowperson: "" }).fetch();

        var returndate = new Date();

        await Book.update(requirebook.id).set({ returninfo: thatUser.username + " " + new Date(returndate).toLocaleDateString() }).fetch();

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

        const renewBook = await Book.findOne(req.params.fk);

        var day = ((renewBook.expired - new Date().getTime()) / (1000 * 3600 * 24));

        //console.log(day);

        if (day < 14) {

            var date = new Date();

            date.setDate(date.getDate() + 15);

            var renewdate = date.getTime();

            await Book.update(req.params.fk).set({ expired: renewdate }).fetch();

            if (req.wantsJSON) {
                return res.json({ message: "已續借該物品", url: '/item/userindex' });    // for ajax request
            } else {
                return res.redirect('/item/userindex');           // for normal request
            }
        } else
            if (day > 14) {
                return res.redirect('/item/cannotrenew')
            }

    },

    addborrowgame: async function (req, res) {

         // if (!await User.findOne(req.session.userid)) return res.notFound();

         const thatUser = await User.findOne(req.session.userid);

         const requiregame = await Game.findOne({ gamename: req.body.qrcode });
 
         const borrowGame = await Game.findOne(requiregame.id).populate("gameborrowBy", { id: req.session.userid });
 
         const reserveGame = await Game.findOne(requiregame.id).populate("gamereserveBy", { id: req.session.userid });
 
         if (!borrowGame) return res.notFound();
 
         if (borrowGame.gameborrowBy.length)
             return res.status(409).send("已經借取");   // conflict
 
         if (requiregame.borrowperson != thatUser.username && requiregame.borrowperson != "") {
             return res.status(409).send("已被他人借取");
         }
 
         if (requiregame.reserveperson != thatUser.username && requiregame.reserveperson != "") {
             return res.status(409).send("已被他人預約");
         }
 
         await User.addToCollection(req.session.userid, "gameborrow").members(requiregame.id);
 
         await Game.update(requiregame.id).set({ status: "已被"+thatUser.username+"借取" }).fetch();
 
         await Game.update(requiregame.id).set({ borrowperson: thatUser.username }).fetch();
 
         var borrowdate = new Date();
 
         await Game.update(requiregame.id).set({ borrowdate: borrowdate }).fetch();
 
         await Game.update(requiregame.id).set({ borrowinfo: thatUser.username + " " + new Date(borrowdate).toLocaleDateString() }).fetch();
 
         await Game.update(requiregame.id).set({ returninfo: "" }).fetch();
 
         var date = new Date();
 
         date.setDate(date.getDate() + 31);
 
         var expireddate = date.getTime();
 
         var expireddate2 = date;
 
         await Game.update(requiregame.id).set({ expired: expireddate }).fetch();
 
         const historyGame = await Game.findOne(requiregame.id).populate("gamehistoryBy", { id: req.session.userid });
 
         await User.addToCollection(req.session.userid, "gamehistory").members(requiregame.id);
 
         if(requiregame.reserveperson==thatUser.username)
         {
             await User.removeFromCollection(req.session.userid, "gamereserve").members(requiregame.id);
         }
 
 
         // await sails.helpers.sendSingleEmail({
         //     to: 'leungjay0424@gmail.com',
         //     from: sails.config.custom.mailgunFrom,
         //     subject: '借用桌遊通知',
         //     text: '你已借用桌遊('+thatGame.gamename+ ') 請於'+new Date(expireddate2).toLocaleDateString()+'前歸還',
         // });
 
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

        await Game.update(requiregame.id).set({ status: "可借取" }).fetch();

        await Game.update(requiregame.id).set({ expired: "30" }).fetch();

        await Game.update(requiregame.id).set({ borrowperson: "" }).fetch();

        var returndate = new Date();

        await Game.update(requiregame.id).set({ returninfo: thatUser.username + " " + new Date(returndate).toLocaleDateString() }).fetch();

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

        const renewGame = await Game.findOne(req.params.fk);

        var day = ((renewGame.expired - new Date().getTime()) / (1000 * 3600 * 24));

        //console.log(day);

        if (day < 14) {

            var date = new Date();

            date.setDate(date.getDate() + 15);

            var renewdate = date.getTime();

            await Game.update(req.params.fk).set({ expired: renewdate }).fetch();

            if (req.wantsJSON) {
                return res.json({ message: "已續借該物品", url: '/item/userindex' });    // for ajax request
            } else {
                return res.redirect('/item/userindex');           // for normal request
            }
        } else
            if (day > 14) {
                return res.redirect('/item/cannotrenew')
            }

    },

    addborrowmaterial: async function (req, res) {



        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requirematerial = await Material.findOne(req.params.id);

        const thatMaterial = await Material.findOne(requirematerial.id).populate("materialborrowBy", { id: req.session.userid });

        const historyMaterial = await Material.findOne(requirematerial.id).populate("materialhistoryBy", { id: req.session.userid });

        if (!thatMaterial) return res.notFound();

        if (thatMaterial.materialborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        await User.addToCollection(req.session.userid, "materialborrow").members(requirematerial.id);

        await User.addToCollection(req.session.userid, "materialhistory").members(requirematerial.id);

        var borrowamount = req.body.amount;

        var orginalamount = thatMaterial.amount;

        var calculation = orginalamount - borrowamount;

        await Material.update(requirematerial.id).set({ amount: orginalamount - borrowamount }).fetch()

        // await Material.update(requirematerial.id).set({ status: "borrowed" }).fetch();

        var borrowdate = new Date();

        await Material.update(requirematerial.id).set({ borrowdate: borrowdate }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 31);

        var expireddate = date.getTime();

        var expireddate2 = date;

        await Material.update(requirematerial.id).set({ expired: expireddate }).fetch();

        // await sails.helpers.sendSingleEmail({
        //     to: 'leungjay0424@gmail.com',
        //     from: sails.config.custom.mailgunFrom,
        //     subject: '借用物資通知',
        //     text: '你已借用'+thatMaterial.materialname+'(數量: '+borrowamount+') 請於'+new Date(expireddate2).toLocaleDateString()+'前歸還',
        // });

        // if(calculation<5)
        // {
        //     await sails.helpers.sendSingleEmail({
        //         to: 'leungjay0424@gmail.com',
        //         from: sails.config.custom.mailgunFrom,
        //         subject: '物資耗盡通知',
        //         text: '物資'+thatMaterial.materialname+'(數量只剩下: '+calculation+') 請購買',
        //     });
        // }

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

        const thatMaterial = await Material.findOne(requirematerial.id).populate("materialborrowBy", { id: req.session.userid });

        if (!thatMaterial) return res.notFound();

        if (!thatMaterial.materialborrowBy.length)
            return res.status(409).send("該物品沒有被借取");   // conflict

        await User.removeFromCollection(req.session.userid, "materialborrow").members(requirematerial.id);

        var returnamount = parseInt(req.body.amount);

        var orginalamount = parseInt(thatMaterial.amount);

        var calculation = parseInt(orginalamount + returnamount);

        await Material.update(requirematerial.id).set({ amount: calculation }).fetch()

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

        const renewMaterial = await Material.findOne(req.params.fk);

        var day = ((renewMaterial.expired - new Date().getTime()) / (1000 * 3600 * 24));

        //console.log(day);

        if (day < 14) {

            var date = new Date();

            date.setDate(date.getDate() + 15);

            var renewdate = date.getTime();

            await Material.update(req.params.fk).set({ expired: renewdate }).fetch();

            if (req.wantsJSON) {
                return res.json({ message: "已續借該物品", url: '/item/userindex' });    // for ajax request
            } else {
                return res.redirect('/item/userindex');           // for normal request
            }
        } else
            if (day > 14) {
                return res.redirect('/item/cannotrenew')
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

        var borrowdate = new Date();

        await Gift.update(requiregift.id).set({ borrowdate: borrowdate }).fetch();

        var borrowamount = req.body.amount;

        var orginalamount = thatGift.amount;

        var calculation = orginalamount - borrowamount;

        await Gift.update(requiregift.id).set({ amount: orginalamount - borrowamount }).fetch()

        // var date = new Date();

        // date.setDate(date.getDate() + 31);

        // var expireddate = date.getTime();

        // await Material.update(requirematerial.id).set({ expired: expireddate }).fetch();

        //return res.ok('Operation completed.');

        // if(calculation<5)
        // {
        //     await sails.helpers.sendSingleEmail({
        //         to: 'leungjay0424@gmail.com',
        //         from: sails.config.custom.mailgunFrom,
        //         subject: '禮物耗盡通知',
        //         text: '禮物'+thatGift.giftname+'(數量只剩下: '+calculation+') 請購買',
        //     });
        // }

        if (req.wantsJSON) {
            return res.json({ message: "已借取該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    addreservegame: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const thatUser = await User.findOne(req.session.userid);

        const requiregame = await Game.findOne(req.params.id);

        const borrowGame = await Game.findOne(requiregame.id).populate("gameborrowBy", { id: req.session.userid });

        const reserveGame = await Game.findOne(requiregame.id).populate("gamereserveBy", { id: req.session.userid });

        if (!reserveGame) return res.notFound();

        if (reserveGame.gamereserveBy.length)
            return res.status(409).send("已經預約");   // conflict

        if (borrowGame.gameborrowBy.length)
            return res.status(409).send("已經借取");   // conflict

        if (requiregame.borrowperson != thatUser.username && requiregame.borrowperson != "") {
            return res.status(409).send("已被他人借取");
        }

        if (requiregame.reserveperson != thatUser.username && requiregame.reserveperson != "") {
            return res.status(409).send("已被他人預約");
        }

        await User.addToCollection(req.session.userid, "gamereserve").members(requiregame.id);

        await Game.update(requiregame.id).set({ status: "已被" + thatUser.username + "預約" }).fetch();

        var date = new Date();

        date.setDate(date.getDate() + 4);

        var expireddate = date.getTime();

        await Game.update(requiregame.id).set({ reserveto: expireddate }).fetch();

        await Game.update(requiregame.id).set({ reserveperson: thatUser.username }).fetch();

        // await sails.helpers.sendSingleEmail({
        //     to: 'leungjay0424@gmail.com',
        //     from: sails.config.custom.mailgunFrom,
        //     subject: '預約桌遊通知',
        //     text: '你已預約桌遊('+thatGame.gamename+') 請於3天內借取 如不需要 請取消預約',
        // });

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已預約該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },

    removereservegame: async function (req, res) {

        // if (!await User.findOne(req.session.userid)) return res.notFound();

        const requiregame = await Game.findOne(req.params.id);

        const thatGame = await Game.findOne(requiregame.id).populate("gamereserveBy", { id: req.session.userid });

        if (!thatGame) return res.notFound();

        if (!thatGame.gamereserveBy.length)
            return res.status(409).send("該物品沒有被預定");   // conflict

        await User.removeFromCollection(req.session.userid, "gamereserve").members(requiregame.id);

        await Game.update(requiregame.id).set({ status: "可借取" }).fetch();

        await Game.update(requiregame.id).set({ reserveto: "" }).fetch();

        await Game.update(requiregame.id).set({ reserveperson: "" }).fetch();

        //return res.ok('Operation completed.');
        if (req.wantsJSON) {
            return res.json({ message: "已取消預定該物品", url: '/item/userindex' });    // for ajax request
        } else {
            return res.redirect('/item/userindex');           // for normal request
        }

    },









};

