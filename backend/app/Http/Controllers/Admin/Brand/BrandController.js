const db = require('../../../../../models');

exports.index = async (req, res, next) => {
    let brands = await db.Brands.findAll();
    res.render('power/brands', {
        brands: brands
    });
} 

exports.create = (req, resp, next) =>{
    resp.render('dashboard/admin/role/create',{
        pageTitle: 'Brands'
        
    });
}

exports.edit = async (req, resp, next) =>{
    await db.BrandsfindByPk(req.params.id)
    .then((result) => {
        resp.send(result);  
    })
    .catch((error) => {
        throw new Error(error);
    });
}

exports.store = async ({ body }, res, next) =>{
    try {
        let ok = await db.Brands.create(body);
        res.send("Successful Created");
    }
    catch(err) {
        console.log(err);
    }
    
    
}

exports.update = (req, resp, next) =>{
    db.Brands.update(req.body,{
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
    await db.Brands.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {              
        resp.status(200).send("");
    })
    .catch(error => {
        throw new Error(error);
    })
}