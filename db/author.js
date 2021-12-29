module.exports = (sequelize, Sequelize) => {
  const Exam = sequelize.define("Author", {
    name: {
      type: Sequelize.STRING
    },
    tel_number: {
      type: Sequelize.STRING
    },
    sciense: {
      type: Sequelize.STRING
    }
  }, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  });

  return Exam;
};