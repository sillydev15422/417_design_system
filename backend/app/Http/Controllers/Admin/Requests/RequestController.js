const db = require('../../../../../models');
const { validationResult } = require('express-validator');

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

exports.create = (req, resp) =>{
    resp.render('power/request',{
        pageTitle: 'Requests'
    });
}

exports.edit = async (req, resp, next) =>{
    resp.render('power/request-details');
    let requests = await db.Request.findAll()
                .then( (requests) =>{
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