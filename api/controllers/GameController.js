/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    usergamesearch: async function (req, res) {
        var models = await Game.find().sort([{id:'DESC'}]);
        return res.view('game/usergamesearch', { game: models});
    },

    usergameresult: async function(req, res){
        const qCatrgory=req.query.category || "";
        const qGamename = req.query.gamename;
        const qPublisher = req.query.publisher;
        const qSerialno = req.query.serialno;

        var models = await Game.find({
            where:{
            
            category:{contains:qCatrgory},
            gamename:{contains:qGamename},
            publisher:{contains:qPublisher},
            serialno:{contains:qSerialno},
            }
            
        }).sort([{id:'DESC'}]);

        return res.view('game/usergameresult', {game:models});

    },

    usergamedetail: async function (req, res) {

        var model = await Game.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('game/usergamedetail', { game: model });

    },

    admingamesearch: async function (req, res) {
        var models = await Game.find().sort([{id:'DESC'}]);
        return res.view('game/admingamesearch', { game: models});
    },

    admingameresult: async function(req, res){
        const qCatrgory=req.query.category || "";
        const qGamename = req.query.gamename;
        const qPublisher = req.query.publisher;
        const qSerialno = req.query.serialno;

        var models = await Game.find({
            where:{
            
            category:{contains:qCatrgory},
            gamename:{contains:qGamename},
            publisher:{contains:qPublisher},
            serialno:{contains:qSerialno},
            }
            
        }).sort([{id:'DESC'}]);

        return res.view('game/admingameresult', {game:models});

    },

    admingamedetail: async function (req, res) {

        var model = await Game.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('game/admingamedetail', { game: model });

    },

    vistorgamesearch: async function (req, res) {
        var models = await Game.find().sort([{id:'DESC'}]);
        return res.view('game/vistorgamesearch', { game: models});
    },

    vistorgameresult: async function(req, res){
        const qCatrgory=req.query.category || "";
        const qGamename = req.query.gamename;
        const qPublisher = req.query.publisher;
        const qSerialno = req.query.serialno;

        var models = await Game.find({
            where:{
            
            category:{contains:qCatrgory},
            gamename:{contains:qGamename},
            publisher:{contains:qPublisher},
            serialno:{contains:qSerialno},
            }
            
        }).sort([{id:'DESC'}]);

        return res.view('game/vistorgameresult', {game:models});

    },

    vistorgamedetail: async function (req, res) {

        var model = await Game.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('game/vistorgamedetail', { game: model });

    },

    admingameedit: async function (req, res) {
        var models = await Game.find().sort([{id:'DESC'}]);
        return res.view('game/admingameedit', { game: models});
    },

     // action - adminupdate
     admingameupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await Game.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('game/admingameupdate', { game: model });

        } else {

            if (!req.body.Game)
                return res.badRequest("Form-data not received.");

            var models = await Game.update(req.params.id).set({
                gamename: req.body.Game.gamename,
                category: req.body.Game.category,
                location: req.body.Game.location,
                photo: req.body.Game.photo,
                publisher: req.body.Game.publisher,
                serialno: req.body.Game.serialno,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/game/admingameedit");

        }
    },

    // action - delete 
    admingamedelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Game.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.redirect("/game/admingameedit");

    },
  

};

