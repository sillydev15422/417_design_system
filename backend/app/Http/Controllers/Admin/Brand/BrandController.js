const db = require('../../../../../models');

exports.index = async (req, resp, next) => {
  resp.render('power/brands');
  // await db.Brand.findAll()
  // .then((result) => {
  //     resp.render('dashboard/admin/role/index',{
  //         roleList: result,
  //         pageTitle: 'Brands'
  //     });
  // })
  // .catch(error => {
  //     throw new Error(error);
  // });
};

exports.create = (req, resp, next) => {
  resp.render('dashboard/admin/role/create', {
    pageTitle: 'Brands',
  });
};

exports.edit = async (req, resp, next) => {
  let requests = await db.Brand.findAll().then((brands) => {
    return brands;
  });
  await db.Brand.findByPk(req.params.id)
    .then((result) => {
      resp.render('dashboard/admin/role/edit', {
        request: result,
        requesteList: brands,
        pageTitle: 'Requests',
      });
    })
    .catch(() => {
      throw new Error(error);
    });
};

exports.store = (req, resp, next) => {
  db.Brand.create(req.body)
    .then(() => {
      req.flash('success', `New Role added ${req.body.name} successfully!`);
      resp.status(200).redirect('/roles');
    })
    .catch(() => {
      throw new Error(error);
    });
};

exports.update = (req, resp, next) => {
  db.Brand.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      req.flash('warning', `Role updated ${req.body.name} successfully!`);
      resp.status(200).redirect('/roles');
    })
    .catch((error) => {
      throw new Error(error);
    });
};

exports.delete = async (req, resp, next) => {
  await db.Brand.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      req.flash('warning', `Role deleted successfully!`);
      resp.status(200).redirect('/roles');
    })
    .catch((error) => {
      throw new Error(error);
    });
};
