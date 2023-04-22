const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    await db.Request.findAll()
    .then((result) => {
        resp.render('power/request');      
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create = async (req, resp) =>{
    await db.Brands.findAll()
    .then(async (brands) => {
        let data = brands.map(e => e.dataValues);
        let requests = await db.Request.findAll();
        console.log(data);
        resp.render('power/requestcreate', {
            brands: data,
            requests: requests
        });
    })
    
}

exports.edit = async (req, resp, next) =>{
    console.log(req.query);
    let type = req.query.id ? true : false;
    if(type)
        resp.cookie('request', req.query.id);
    let brands = await db.Brands.findAll();
    let comments = type ? await db.Comment.findAll({
        where:{
            RequestId: req.query.id
        }
    }) : null;
    let history = [];
    if(type) history = await db.Upload.findAll({ where:{owner:req.query.id} });

    await db.Request.findAll({ where: req.query }).then(requests => {
        resp.render('power/requestdetails',{
            requests: req.query.id ? [requests[0].dataValues] : requests.map(e => e.dataValues),
            ...req.query,
            type: type,
            brands: brands,
            history: history,
            comments: comments
        });
    })
    .catch((err) => {
        throw new Error(err);
    });
}

exports.store = (req, resp, next) =>{
    req.body.status = "open";
    db.Request.create(req.body)
    .then(() => {
        console.log('success', `New Role added ${ req.body.name } successfully!`);
        resp.status(200).json("Created Successfully")
    })
    .catch((err) => {
        return next(err);
    });
}

exports.draft = (req, res, next) => {
    req.body.status = "drafts";
    db.Request.create(req.body)
    .then(() => {
        console.log('success', `New Role added ${ req.body.name } successfully!`);
        resp.status(200).json("Saved as Draft Successfully")
    })
    .catch((err) => {
        return next(err);
    });
}

exports.update = (req, resp, next) =>{
    db.Request.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('warning', `Role updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/roles');
    })
    .catch(error => {
        throw new Error(error);
    })
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