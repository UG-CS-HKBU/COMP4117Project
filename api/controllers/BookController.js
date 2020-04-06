/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    userbooksearch: async function (req, res) {
        var models = await Book.find({ where: { status: "available" } }).sort([{ id: 'DESC' }]);
        return res.view('book/userbooksearch', { book: models });
    },

    userbookresult: async function (req, res) {
        const qCatrgory = req.query.category || "";
        const qBookname = req.query.bookname;
        const qAuthor = req.query.author;
        const qPublisher = req.query.publisher;
        const qISBN = req.query.ISBN;

        var models = await Book.find({
            where: {

                category: { contains: qCatrgory },
                bookname: { contains: qBookname },
                author: { contains: qAuthor },
                publisher: { contains: qPublisher },
                ISBN: { contains: qISBN },
            }

        }).sort([{ id: 'DESC' }]);

        return res.view('book/userbookresult', { book: models });

    },

    userbookdetail: async function (req, res) {

        var model = await Book.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('book/userbookdetail', { book: model });

    },

    vistorbooksearch: async function (req, res) {
        var models = await Book.find().sort([{ id: 'DESC' }])
        return res.view('book/vistorbooksearch', { book: models });
    },

    vistorbookresult: async function (req, res) {
        const qCatrgory = req.query.category || "";
        const qBookname = req.query.bookname;
        const qAuthor = req.query.author;
        const qPublisher = req.query.publisher;
        const qISBN = req.query.ISBN;

        var models = await Book.find({
            where: {

                category: { contains: qCatrgory },
                bookname: { contains: qBookname },
                author: { contains: qAuthor },
                publisher: { contains: qPublisher },
                ISBN: { contains: qISBN },
            }

        }).sort([{ id: 'DESC' }]);

        return res.view('book/vistorbookresult', { book: models });

    },

    vistorbookdetail: async function (req, res) {

        var model = await Book.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('book/vistorbookdetail', { book: model });

    },

    adminbooksearch: async function (req, res) {
        var models = await Book.find().sort([{ id: 'DESC' }]);
        return res.view('book/adminbooksearch', { book: models });
    },

    adminbookresult: async function (req, res) {
        const qCatrgory = req.query.category || "";
        const qBookname = req.query.bookname;
        const qAuthor = req.query.author;
        const qPublisher = req.query.publisher;
        const qISBN = req.query.ISBN;

        var models = await Book.find({
            where: {

                category: { contains: qCatrgory },
                bookname: { contains: qBookname },
                author: { contains: qAuthor },
                publisher: { contains: qPublisher },
                ISBN: { contains: qISBN },
            }

        }).sort([{ id: 'DESC' }]);

        return res.view('book/adminbookresult', { book: models });

    },

    adminbookdetail: async function (req, res) {

        var model = await Book.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('book/adminbookdetail', { book: model });

    },

    adminbookedit: async function (req, res) {
        var models = await Book.find().sort([{ id: 'DESC' }]);
        return res.view('book/adminbookedit', { book: models });
    },

    // action - adminupdate
    adminbookupdate: async function (req, res) {

        if (req.method == "GET") {

            var model = await Book.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('book/adminbookupdate', { book: model });

        } else {

            if (!req.body.Book)
                return res.badRequest("Form-data not received.");

            var models = await Book.update(req.params.id).set({
                bookname: req.body.Book.bookname,
                author: req.body.Book.author,
                category: req.body.Book.category,
                location: req.body.Book.location,
                photo: req.body.Book.photo,
                year: req.body.Book.year,
                publisher: req.body.Book.publisher,
                ISBN: req.body.Book.ISBN,
            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/book/adminbookedit");

        }
    },

    // action - delete 
    adminbookdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Book.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.redirect("/book/adminbookedit");

    },

    import_xlsx: async function (req, res) {

        if (req.method == 'GET')
            return res.view('book/import_xlsx');

        req.file('file').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            var XLSX = require('xlsx');
            var workbook = XLSX.readFile(uploadedFiles[0].fd);
            var ws = workbook.Sheets[workbook.SheetNames[0]];
            var data = XLSX.utils.sheet_to_json(ws);
            console.log(data);
            var models = await Book.createEach(data).fetch();
            if (models.length == 0) {
                return res.badRequest("No data imported.");
            }
            return res.redirect("/book/adminbookedit");
        });
    },




};

