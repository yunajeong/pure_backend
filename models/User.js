const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      // The following specification of the 'id' attribute could be omitted
      // since it is the default.
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "pure_table",
    }
  );
};
