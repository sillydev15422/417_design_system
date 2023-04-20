const db = require('../../../models');

exports.welcome = async (req, resp, next) => {
    await db.Request.findAll({
        where: {
            status: "open"
        },
        include: db.Brands
    }).then(requests => {
        let data = requests.map(e => e.dataValues);
        resp.render("power/index", {
            requests: data
        });
    });
}