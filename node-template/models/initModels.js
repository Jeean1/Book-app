// Models
const { Book } = require("./book.model");
const { Reserve } = require("./reserve.model");
const { User } = require("./user.model");

const initModels = () => {
  //User relations
  // 1 user <---> M Reserves
  User.hasMany(Reserve, { foreignKey: "userId" });
  Reserve.belongsTo(User);

  //Books relations

  // 1 book <---> 1 reserve
  Book.hasOne(Reserve, { foreignKey: "bookId" });
  Reserve.belongsTo(Book);
};

module.exports = { initModels };
