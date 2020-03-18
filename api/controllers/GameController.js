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

    vistorgamesearch: async function (req, res) {
        var models = await Game.find().sort([{id:'DESC'}]);
        return res.view('game/vistorgamesearch', { game: models});
    },

    vgameresult: async function(req, res){
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

        return res.view('game/vgameresult', {game:models});

    },
  

};

