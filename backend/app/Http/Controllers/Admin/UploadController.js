const multer = require('multer');
const upload = multer({dest:'uploads/'}).single("file");
const db = require('../../../../models');

exports.index = async (req, resp, next) => {
    await db.Request.findAll()
    .then((result) => {
        resp.render('power/request',{
            pageTitle: 'Requests'
        });      
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create = async (req, resp) =>{
    await db.Brands.findAll()
    .then((brands) => {
        let data = brands.map(e => e.dataValues);
        console.log(data);
        resp.render('power/requestcreate', {
            brands: data
        });
    })
    
}

exports.edit = async (req, resp, next) =>{
    resp.render('power/request-details');
    let requests = await db.Request.findAll()
                .then((requests) =>{
                    return requests;
                });
    await db.Request.findByPk(req.params.id)
    .then((result) => {
        resp.render('dashboard/admin/role/edit',{
            request: result,
            requesteList: requests,
            pageTitle: 'Requests'
        });  
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.store = (req, resp, next) =>{
    db.Request.create(req.body)
    .then(() => {
        req.flash('success', `New Role added ${ req.body.name } successfully!`);
        resp.status(200).redirect('/roles');
    })
    .catch(() => {
        throw new Error(error);
    });
}

exports.load = (req, res, next) =>{
    upload(req, res, (err, result) => {
        if(err) {
            res.status(400).send("Something went wrong!");
        }
        db.Upload.create({
            realname: req.file.originalname,
            fakename: req.file.filename,
            owner: 1
        }).then(() => {
            res.send(req.file);
        })
    });
}

exports.delete = async (req, resp, next) =>{
    await db.Request.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Role deleted successfully!`);        
        resp.status(200).redirect('/roles');
    })
    .catch(error => {
        throw new Error(error);
    })
}