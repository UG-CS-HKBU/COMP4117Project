/**
 * MaterialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    usermaterialsearch: async function (req, res) {
        var models = await Material.find({ where: { status: "avaliable" } }).sort([{ id: 'DESC' }]);
        return res.view('material/usermaterialsearch', { material: models });
    },

    usermaterialresult: async function (req, res) {
        const qCategory = req.query.category || "";
        const qMaterialname = req.query.materialname;
        const qAmount = parseInt(req.query.amount);

        if (isNaN(qAmount)) {
            var models = await Material.find({
                where: {

                    category: { contains: qCategory },
                    materialname: { contains: qMaterialname },
                }

            }).sort([{ id: 'DESC' }]);
        } else {
            var models = await Material.find({
                where: {

                    category: { contains: qCategory },
                    qMaterialname: { contains: qMaterialname },
                    qAmount: Amount
                }

            }).sort([{ id: 'DESC' }]);
        }


        return res.view('material/usermaterialresult', { material: models });

    },

    usermaterialdetail: async function (req, res) {

        var model = await Material.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('material/usermaterialdetail', { material: model });

    },

    usermaterialdetail2: async function (req, res) {

        var model = await Material.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('material/usermaterialdetail2', { material: model });

    },

    usermaterialreturn: async function (req, res) {

        var model = await Material.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('material/usermaterialreturn', { material: model });

    },

    adminmaterialsearch: async function (req, res) {
        var models = await Material.find().sort([{ id: 'DESC' }]);
        return res.view('material/adminmaterialsearch', { material: models });
    },

    adminmaterialresult: async function (req, res) {
        const qCategory = req.query.category || "";
        const qMaterialname = req.query.materialname;
        const qAmount = parseInt(req.query.amount);

        if (isNaN(qAmount)) {
            var models = await Material.find({
                where: {

                    category: { contains: qCategory },
                    materialname: { contains: qMaterialname },
                }

            }).sort([{ id: 'DESC' }]);
        } else {
            var models = await Material.find({
                where: {

                    category: { contains: qCategory },
                    qMaterialname: { contains: qMaterialname },
                    qAmount: Amount
                }

            }).sort([{ id: 'DESC' }]);
        }


        return res.view('material/adminmaterialresult', { material: models });

    },

    adminmaterialdetail: async function (req, res) {

        var model = await Material.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('material/adminmaterialdetail', { material: model });

    },

    adminmaterialedit: async function (req, res) {
        var models = await Material.find().sort([{id:'DESC'}]);
        return res.view('material/adminmaterialedit', { material: models});
    },

     // action - adminupdate
     adminmaterialupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await Material.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('material/adminmaterialupdate', { material: model });

        } else {

            if (!req.body.Material)
                return res.badRequest("Form-data not received.");

            var models = await Material.update(req.params.id).set({
                materialname: req.body.Material.materialname,
                category: req.body.Material.category,
                location: req.body.Material.location,
                photo: req.body.Material.photo,
                amount: req.body.Material.amount,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/material/adminmaterialedit");

        }
    },

    // action - delete 
    adminmaterialdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Material.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.redirect("/material/adminmaterialedit");

    },

    import_xlsx: async function(req, res) {

        if (req.method == 'GET')
            return res.view('material/import_xlsx');
    
        req.file('file').upload({maxBytes: 10000000}, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0){ return res.badRequest('No file was uploaded'); }
    
            var XLSX = require('xlsx');
            var workbook = XLSX.readFile(uploadedFiles[0].fd);
            var ws = workbook.Sheets[workbook.SheetNames[0]];
            var data = XLSX.utils.sheet_to_json(ws);
            console.log(data);
            var models = await Material.createEach(data).fetch();
            if (models.length == 0) {
                return res.badRequest("No data imported.");
            }
            return res.redirect("/material/adminmaterialedit");
        });
    },

    borrow: async function(req, res) {
        var model=await Material.findOne(req.params.id);
        return res.view('material/borrow',{material:model});
    },

    return: async function(req, res) {
        var model=await Material.findOne(req.params.id);
        return res.view('material/return',{material:model});
    },

    print: async function (req, res) {
        var models = await Material.find().sort([{ id: 'DESC' }]);
        return res.view('material/print', { material: models });
        
    },

    useraddremark: async function (req, res) {
        var model = await Material.findOne(req.params.id);
        if (req.method == "GET") {
            return res.view('material/useraddremark', { material: model })
        } else {

            var userremarks = req.body.remarks;

            await Item.create(
                {
                    message:"物資("+model.materialname+")新增備註: "+userremarks,
                });


            var models = await Material.update(req.params.id).set({
                remarks: userremarks,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.view('material/usermaterialreturn', { material: model })
        }
    },

    uploadphoto: async function(req, res) {
        var model=await Material.findOne(req.params.id);

        if (req.method == 'GET')
            return res.view('material/uploadphoto',{material:model});
    
        await Material.update({id: model.id}, {
            avatar: req.body.Material.avatar
        });
        
        return res.redirect('/material/adminmaterialedit');
    },


};

