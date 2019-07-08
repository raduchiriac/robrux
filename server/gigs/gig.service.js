const db = require("../_helpers/db");
const Gig = db.Gig;

const create = async gigParams => {
  const gig = new Gig(gigParams);

  // save gig
  const _gig = await gig.save();
  return _gig.id;
};

module.exports = {
  create
};
