const multer = require('multer');
const upload = multer({dest:'public/uploads/'}).single("file");
const { Op } = require("sequelize");
const fs = require('fs');
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

exports.down = async (req, res, next) =>{
    let a = req.body['list[]'];
    if(typeof a == 'string')
        a = [a];
    try {
        let files = await db.Upload.findAll({
            where: {
                id:{
                    [Op.in]: a
                }
            }
        });
        let upload_path = '/uploads/';
        
        files = files.map(e => {return { download: upload_path + e.dataValues.fakename, filename: e.dataValues.realname}; });
        res.send(files);
    }
    catch(err) {
        console.log(err);
    }
    
}

exports.load = (req, res, next) =>{
    upload(req, res, (err, result) => {
        if(err) {
            res.status(400).send("Something went wrong!");
        }
        db.Upload.create({
            realname: req.file.originalname,
            fakename: req.file.filename,
            owner: 1,
            type: req.params.type
        }).then(() => {
            res.send(req.file);
        })
    });
}

exports.delete = async (req, res, next) =>{
    let file = await db.Upload.findOne({where: {id: req.params.id}});
    fs.unlink(process.cwd() + '/public/uploads/' + file.dataValues.fakename, (err) => {
        console.log(err);
    });
    await db.Upload.destroy({where: {id: req.params.id}});
    res.send("Success Deleted");
}