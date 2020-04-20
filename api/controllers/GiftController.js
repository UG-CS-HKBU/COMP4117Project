/**
 * GiftController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    usergiftsearch: async function (req, res) {
        var models = await Gift.find().sort([{ id: 'DESC' }]);
        return res.view('gift/usergiftsearch', { gift: models });
    },

    usergiftresult: async function (req, res) {
        const qCatrgory = req.query.category || "";
        const qGiftname = req.query.giftname;
        const qAmount = parseInt(req.query.amount);
        const qValue = parseInt(req.query.value);
        const qDontator = req.query.donator;

        if (isNaN(qAmount) && isNaN(qValue)) {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        } else if (isNaN(qAmount)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else if (isNaN(qValue)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }

        if(models.length==0)
        {
            return res.redirect('/item/useritemnotfound');
        }

        return res.view('gift/usergiftresult', { gift: models });

    },

    usergiftdetail: async function (req, res) {

        var model = await Gift.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('gift/usergiftdetail', { gift: model });

    },

    usergiftdetail2: async function (req, res) {

        var model = await Gift.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('gift/usergiftdetail2', { gift: model });

    },

    admingiftsearch: async function (req, res) {
        var models = await Gift.find().sort([{ id: 'DESC' }]);
        return res.view('gift/admingiftsearch', { gift: models });
    },

    admingiftresult: async function (req, res) {
        const qCatrgory = req.query.category || "";
        const qGiftname = req.query.giftname;
        const qAmount = parseInt(req.query.amount);
        const qValue = parseInt(req.query.value);
        const qDontator = req.query.donator;

        if (isNaN(qAmount) && isNaN(qValue)) {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        } else if (isNaN(qAmount)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else if (isNaN(qValue)) {

            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }
        else {
            var models = await Gift.find({
                where: {

                    category: { contains: qCatrgory },
                    giftname: { contains: qGiftname },
                    amount: qAmount,
                    value: qValue,
                    donator: { contains: qDontator },
                }

            }).sort([{ id: 'DESC' }]);
        }

        if(models.length==0)
        {
            return res.redirect('/item/adminitemnotfound');
        }

        return res.view('gift/admingiftresult', { gift: models });

    },

    admingiftdetail: async function (req, res) {

        var model = await Gift.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('gift/admingiftdetail', { gift: model });

    },

    admingiftedit: async function (req, res) {
        var models = await Gift.find().sort([{id:'DESC'}]);
        return res.view('gift/admingiftedit', { gift: models});
    },

     // action - adminupdate
     admingiftupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await Gift.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('gift/admingiftupdate', { gift: model });

        } else {

            if (!req.body.Gift)
                return res.badRequest("Form-data not received.");

            var models = await Gift.update(req.params.id).set({
                giftname: req.body.Gift.giftname,
                category: req.body.Gift.category,
                location: req.body.Gift.location,
                photo: req.body.Gift.photo,
                donator: req.body.Gift.donator,
                value: req.body.Gift.value,
                amount: req.body.Gift.amount,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/gift/admingiftedit");

        }
    },

    // action - delete 
    admingiftdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Gift.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "該禮物已被刪除", url: '/gift/admingiftedit' });
        } else {

            return res.redirect("/gift/admingiftedit");;
        }

        // return res.redirect("/gift/admingiftedit");

    },

    import_xlsx: async function(req, res) {

        if (req.method == 'GET')
            return res.view('gift/import_xlsx');
    
        req.file('file').upload({maxBytes: 10000000}, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0){ return res.badRequest('No file was uploaded'); }
    
            var XLSX = require('xlsx');
            var workbook = XLSX.readFile(uploadedFiles[0].fd);
            var ws = workbook.Sheets[workbook.SheetNames[0]];
            var data = XLSX.utils.sheet_to_json(ws);
            console.log(data);
            var models = await Gift.createEach(data).fetch();
            if (models.length == 0) {
                return res.badRequest("No data imported.");
            }
            return res.redirect("/gift/admingiftedit");
        });
    },

    borrow: async function(req, res) {
        var model=await Gift.findOne(req.params.id)
        return res.view('gift/borrow',{gift:model});
    },

    return: async function(req, res) {
        return res.view('gift/return');
    },

    print: async function (req, res) {
        var models = await Gift.find().sort([{ id: 'DESC' }]);
        return res.view('gift/print', { gift: models });
        
    },

    useraddremark: async function (req, res) {
        var model = await Gift.findOne(req.params.id);
        if (req.method == "GET") {
            return res.view('gift/useraddremark', { gift: model })
        } else {

            var userremarks = req.body.remarks;

            await Item.create(
                {
                    message:"禮物("+model.giftname+")新增備註: "+userremarks,
                });


            var models = await Gift.update(req.params.id).set({
                remarks: userremarks,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect('/gift/usergiftdetail/'+model.id)
        }
    },

    uploadphoto: async function(req, res) {
        var model=await Gift.findOne(req.params.id);

        if (req.method == 'GET')
            return res.view('gift/uploadphoto',{gift:model});
    
        await Gift.update({id: model.id}, {
            avatar: req.body.Gift.avatar
        });
        
        return res.redirect('/gift/admingiftedit');
    },




};

